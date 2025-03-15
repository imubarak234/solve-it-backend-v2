// import sqlPackage from "../../common/config/mysql";
const dotenv = require('dotenv')
dotenv.config();
let dbMethods = require('../config/mysql');
const funcObj = require('../utils/functions');

let testController = {}; 

testController.testGetRequest = async (req, res) => {
  try {

    // console.log(dbMethods);
    // let result = await dbMethods.fetchData('users');
    let result = await dbMethods.fetchData('testInsert');

    return res.status(200).json({
      result,
    });
  }
  catch (err) {
    return res.status(500).json({
      statusCode: 500,
      error: String(err)
    })
  }
}

testController.testInsert = async (req, res) => {

  try {

    let response = await dbMethods.insertData({ name: "Tester", email: "email@email.com", phone: "08091902743" }, "testInsert");
    console.log(response);

    return res.status(201).json({
      message: response
    });
  }
  catch(err) {
    return res.status(500).json({
      statusCode: 500,
      error: String(err)
    })
  }
}

testController.emailTest = async (req, res) => {

  try {

    const response = await funcObj.SendGridEmail();

    return res.status(200).json({
      status: 200,
      message: "Email sent"
    });
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    })
  }
};

module.exports = testController;