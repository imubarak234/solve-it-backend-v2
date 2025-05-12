const funcObj = require('../utils/functions.js');

const sqlPackage = require('../config/mysql.js');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const crypto = require('crypto');   

const walletSchema = require('../utils/schemas/walletSchema.js')

let walletControllerClass = {};

dayjs.extend(utc);
dayjs.extend(timezone);

walletControllerClass.createBankAccount = async (req, res) => {

  try {

    const { error, value } = walletSchema.createBankAccountSchema.validate(req.body);
            
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { bank, number, user_id, name } = value;

    code = Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newBankAccount = {
      bank,
      number,
      user_id,
      name,
      code,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
    };

    const insertRes = await sqlPackage.insertData(newBankAccount, "bank_accounts");
    
    return res.status(201).json({
        status: 201,
        message: "Bank Account created successfully",
    })
    
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

walletControllerClass.updateBankAccount = async (req, res) => {

  try {

    const { error, value } = walletSchema.updateBankAccountSchema.validate(req.body);

    if(error) {
      return res.status(400).json({
          status: 400,
          message: error.details
      });
    }

    let { id, bank, number, name } = value;

    const bankAccountData = await funcObj.getUserData("id", id, "bank_accounts");
                    
    if(!bankAccountData) {
        return res.status(409).json({
            status: 409,
            message: `Bank account does not exist`
        });
    }

    await sqlPackage.dbQuery.query(`UPDATE bank_accounts SET bank = '${bank}', number = '${number}', name = '${name}', updated_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'  where id = ${id}`);
            
    return res.status(200).json({
        status: 200,
        message: "Bank Account updated successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

walletControllerClass.getBankAccounts = async (req, res) => {

  try {

    const filters = Object.entries(req.query).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});


    let query = 'SELECT * FROM bank_accounts';
    const values = [];
    const conditions = [];

    Object.entries(filters).forEach(([key, value], index) => {
      conditions.push(`${key} = ?`);
      values.push(value);
    });

    if (conditions.length) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    if(query.includes("AND")){
      query += ' AND deleted_at IS NULL';
    }
    else if(query.includes("WHERE")){
      query += ' AND deleted_at IS NULL';
    }
    else {
      query += ' WHERE deleted_at IS NULL';
    }

    const [bankAccounts] = await sqlPackage.dbQuery.query(query, values);
        
    return res.status(200).json({
      status: 200,
      message: "Bank Account retrieved successfully",
      data: bankAccounts,
      count: bankAccounts?.length
    })
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

walletControllerClass.deleteBankAccount = async (req, res) => {

  try {

    const { id } = req.params;

    const bankAccountData = await funcObj.getUserData("id", id, "bank_accounts");

    if(!bankAccountData) {
        return res.status(409).json({
            status: 409,
            message: `Bank account does not exist`
        });
    }

    await sqlPackage.dbQuery.query(`UPDATE bank_accounts SET deleted_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}' where id = ${id}`);

    return res.status(200).json({
        status: 200,
        message: "Bank Account deleted successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

const updateWalletBalance = async (userId, amount, transactionType) => {

  const connection = await sqlPackage.dbQuery.getConnection();
    
  try {
    await connection.beginTransaction();

    // 1. Lock the wallet row for this user
    let [wallet] = await connection.query(
      `SELECT * FROM wallets WHERE user_id = ? FOR UPDATE`, 
      [userId]
    );

    if (wallet.length === 0) {
      throw new Error('Wallet not found');
    }

    wallet = wallet[0]; // Get the first row

    if (!wallet) {
      throw new Error('Wallet not found');
    }

    // 2. Calculate new balance
    let newBalance;
    if (transactionType === 'Credit') {
      newBalance = parseFloat(wallet.balance) + parseFloat(amount);
    } else if (transactionType === 'Debit') {
      if (parseFloat(wallet.balance) < parseFloat(amount)) {
        throw new Error('Insufficient funds');
      }
      newBalance = parseFloat(wallet.balance) - parseFloat(amount);
    }

    // 3. Update the wallet
    await connection.query(
      `UPDATE wallets 
       SET balance = ?
       WHERE user_id = ?`,
      [newBalance, userId]
    );

    await connection.commit();
    return { success: true, newBalance };

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

walletControllerClass.updateWalletBalance = async(req, res) => {

  try {

    const { error, value} = walletSchema.updateWalletSchema.validate(req.body);

    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { user_id, amount, transaction_type, school_id } = value;

    const result = await updateWalletBalance(user_id, amount, transaction_type);

    if(!result.success) {
      return res.status(500).json({
        status: 500,
        message: "Failed to update wallet balance"
      });
    }

    // 4. Log the transaction
    if(result.success) {

      const code = Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

      const transaction = {
        user_id,
        amount,
        school_id,
        details: `Wallet ${transaction_type} of ${amount}`, 
        created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
        color: transaction_type,
        code,
      };

      await sqlPackage.insertData(transaction, "user_wallet_transactions");
    }

    return res.json({
      status: 200,
      message: "Wallet balance updated successfully",
      data: result
    });
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

walletControllerClass.getWallets = async (req, res) => {

  try {

    const filters = Object.entries(req.query).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});


    let query = 'SELECT * FROM wallets';
    const values = [];
    const conditions = [];

    Object.entries(filters).forEach(([key, value], index) => {
      conditions.push(`${key} = ?`);
      values.push(value);
    });

    if (conditions.length) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    // if(query.includes("AND")){
    //   query += ' AND deleted_at IS NULL';
    // }
    // else if(query.includes("WHERE")){
    //   query += ' AND deleted_at IS NULL';
    // }
    // else {
    //   query += ' WHERE deleted_at IS NULL';
    // }

    const [wallets] = await sqlPackage.dbQuery.query(query, values);
        
    return res.status(200).json({
      status: 200,
      message: "Wallet retrieved successfully",
      data: wallets,
      count: wallets?.length
    })
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

walletControllerClass.createWallet = async (req, res) => {

  try {

    const { error, value } = walletSchema.createWalletSchema.validate(req.body);
            
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { user_id, balance, school_id, bank_account_id } = value;

    const newWallet = {
      user_id,
      balance,
      school_id,
      bank_account_id,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
    };

    const insertRes = await sqlPackage.insertData(newWallet, "wallets");
    
    return res.status(201).json({
        status: 201,
        message: "Wallet created successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }

  
}

module.exports = walletControllerClass;