
const funcObj = require('../../utils/functions.js');
const sqlPackage = require('../../config/mysql.js');
const crypto = require('crypto');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const roleSchema = require('../../utils/schemas/roleSchemas.js')


dayjs.extend(utc);
dayjs.extend(timezone);

let roleControllerClass = {};

roleControllerClass.createRole = async (req, res) => {

  try {

    const { error, value } = roleSchema.createRoleSchema.validate(req.body);
                  
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { name, slug } = value;

    const newRole = {
      name,
      slug,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
    }

    const insertRes = await sqlPackage.insertData(newRole, "roles");
    
    return res.status(200).json({
        status: 200,
        message: "Role created successfully",
    })

  }
  catch(err) {
    return res.status(500).json({
      message: "internal Server Error",
      status: 500
    });
  }
}

roleControllerClass.updateRole = async (req, res) => {

  try {

    const { error, value } = roleSchema.updateRoleSchema.validate(req.body);
                  
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { name, slug, id } = value;

    const roleData = await funcObj.getUserData("id", id, "roles");
            
    if(!roleData) {
        return res.status(409).json({
            status: 409,
            message: `role does not exist`
        });
    }

    await sqlPackage.dbQuery.query(`UPDATE roles SET name = '${name}', slug = '${slug}' where id = ${id}`);
    
    return res.status(200).json({
        status: 200,
        message: "Role updated successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

roleControllerClass.updatePermission = async (req, res) => {

  try {

    const { error, value } = roleSchema.updateRoleSchema.validate(req.body);
                  
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { name, slug, id } = value;

    const roleData = await funcObj.getUserData("id", id, "roles");
            
    if(!roleData) {
        return res.status(409).json({
            status: 409,
            message: `permission does not exist`
        });
    }

    await sqlPackage.dbQuery.query(`UPDATE permissions SET name = '${name}', slug = '${slug}' where id = ${id}`);
    
    return res.status(200).json({
        status: 200,
        message: "Permission updated successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

roleControllerClass.createPermission = async (req, res) => {

  try {

    const { error, value } = roleSchema.createPermissionsSchema.validate(req.body);
                  
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { name, slug } = value;

    const newPermission = {
      name,
      slug,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
    }

    const insertRes = await sqlPackage.insertData(newPermission, "permissions");
    
    return res.status(200).json({
        status: 200,
        message: "Permission created successfully",
    })

  }
  catch(err) {
    return res.status(500).json({
      message: "internal Server Error",
      status: 500
    });
  }
}

roleControllerClass.getRoles = async (req, res) => {

  try {

    const roles = await sqlPackage.dbQuery.query("SELECT * FROM roles");
    return res.status(200).json({
      status: 200,
      message: "Fetch successful",
      data: roles
    });
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

roleControllerClass.getPermissions = async (req, res) => {

  try{

    const permissions = await sqlPackage.dbQuery.query("SELECT * FROM permissions");
    return res.status(200).json({
      status: 200,
      message: "Fetch successful",
      data: permissions
    });
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

module.exports = roleControllerClass;