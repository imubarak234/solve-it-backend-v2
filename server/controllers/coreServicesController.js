

const funcObj = require('../utils/functions.js');
const sqlPackage = require('../config/mysql.js');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const crypto = require('crypto');
const coreServiceSchemas = require('../utils/schemas/coreServicesSchema.js')


let coreServicesControllerClass = {};

dayjs.extend(utc);
dayjs.extend(timezone);


coreServicesControllerClass.createCoreService = async (req, res) => {

  try {

    const { error, value } = coreServiceSchemas.createCoreServicesSchema.validate(req.body);
                      
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { school_id, provider_id, core_service_category_id, title, description, price, images, availability, code } = value;

    code = Boolean(code) ? code : Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newCoreServices = { 
      school_id,
      provider_id, 
      core_service_category_id, 
      title, 
      description, 
      price, 
      images, 
      availability,
      code,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
    }

    await sqlPackage.insertData(newCoreServices, "core_services");
    
    return res.status(201).json({
        status: 201,
        message: "Core Services created successfully",
    });
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

coreServicesControllerClass.updateCoreService = async (req, res) => {

  try {

    const { error, value } = coreServiceSchemas.updateCoreServicesSchema.validate(req.body);
                      
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { id, title, description, price, images, availability } = value;

    const coreServiceData = await funcObj.getUserData("id", id, "core_services");
                
    if(!coreServiceData) {
        return res.status(409).json({
            status: 409,
            message: `Core Service does not exist`
        });
    }


    await sqlPackage.dbQuery.query(`UPDATE core_services SET title = '${title}', description = '${description}', images = '${images}', price = '${price}', availability = '${availability}', updated_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'  where id = ${id}`);
        
    return res.status(200).json({
        status: 200,
        message: "Core Service updated successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}


coreServicesControllerClass.getCoreService = async (req, res) => {

  try {

    const [coreServices] = await sqlPackage.dbQuery.query(`SELECT * FROM core_services WHERE deleted_at IS NULL`);
    
    return res.status(200).json({
      status: 200,
      message: "Core Services retrieved successfully",
      data: coreServices
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

coreServicesControllerClass.createCoreServiceRating = async (req, res) => {

  try {

    const { error, value } = coreServiceSchemas.createCoreServicesRatingSchema.validate(req.body);
                      
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { school_id, provider_id, core_service_id, core_service_booking_id, user_id, rating, body, code } = value;

    code = Boolean(code) ? code : Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newCoreServicesRating = { 
      school_id,
      provider_id, 
      core_service_id, 
      core_service_booking_id, 
      user_id,
      rating,
      body,
      code,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
    }

    await sqlPackage.insertData(newCoreServicesRating, "core_service_ratings");
    
    return res.status(201).json({
        status: 201,
        message: "Core Services Rating created successfully",
    });

  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}


coreServicesControllerClass.updateCoreServiceRating = async (req, res) => {

  try {

    const { error, value } = coreServiceSchemas.updateCoreServicesRatingSchema.validate(req.body);
                      
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { id, rating, body } = value;

    const coreServiceData = await funcObj.getUserData("id", id, "core_service_ratings");
                
    if(!coreServiceData) {
        return res.status(409).json({
            status: 409,
            message: `Core Service Rating does not exist`
        });
    }


    await sqlPackage.dbQuery.query(`UPDATE core_service_ratings SET rating = '${rating}', body = '${body}', updated_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'  where id = ${id}`);
        
    return res.status(200).json({
        status: 200,
        message: "Core Service Rating updated successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

coreServicesControllerClass.getCoreServiceRating = async (req, res) => {

  try {

    const [coreServicesRating] = await sqlPackage.dbQuery.query(`SELECT * FROM core_service_ratings WHERE deleted_at IS NULL`);
    
    return res.status(200).json({
      status: 200,
      message: "Core Services Rating retrieved successfully",
      data: coreServicesRating
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

coreServicesControllerClass.createCoreServicePayment = async (req, res) => {

  try {

    const { error, value } = coreServiceSchemas.createCoreServicePaymentSchema.validate(req.body);
                      
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { school_id, provider_id, core_service_id, core_service_booking_id, core_service_escrow_id, amount, reference, user_id, status, code } = value;

    code = Boolean(code) ? code : Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newCoreServicesPayment = { 
      school_id,
      provider_id, 
      core_service_id, 
      core_service_booking_id,
      core_service_escrow_id,
      user_id,
      amount,
      reference,
      status,
      code,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
    }

    await sqlPackage.insertData(newCoreServicesPayment, "core_service_payments");
    
    return res.status(201).json({
        status: 201,
        message: "Core Services Payment created successfully",
    });
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}


coreServicesControllerClass.updateCoreServicePayment = async (req, res) => {

  try {

    const { error, value } = coreServiceSchemas.updateCoreServicesPaymentSchema.validate(req.body);
                      
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { id, amount, reference } = value;

    const coreServiceData = await funcObj.getUserData("id", id, "core_service_payments");
                
    if(!coreServiceData) {
        return res.status(409).json({
            status: 409,
            message: `Core Service Payment does not exist`
        });
    }


    await sqlPackage.dbQuery.query(`UPDATE core_service_payments SET amount = '${amount}', reference = '${reference}', updated_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'  where id = ${id}`);
        
    return res.status(200).json({
        status: 200,
        message: "Core Service Payment updated successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}


coreServicesControllerClass.coreServicePaymentStatusUpdate = async (req, res) => {

  try {

    const { error, value } = coreServiceSchemas.servicesPaymentStatusUpdateSchema.validate(req.body);
                      
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { id, status } = value;

    const coreServiceData = await funcObj.getUserData("id", id, "core_service_payments");
                
    if(!coreServiceData) {
        return res.status(409).json({
            status: 409,
            message: `Core Service Payment does not exist`
        });
    }


    await sqlPackage.dbQuery.query(`UPDATE core_service_payments SET status = '${status}', updated_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'  where id = ${id}`);
        
    return res.status(200).json({
        status: 200,
        message: "Core Service Payment status updated successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

coreServicesControllerClass.getCoreServicePayment = async (req, res) => {

  try {

    const [coreServicesPayment] = await sqlPackage.dbQuery.query(`SELECT * FROM core_service_payments WHERE deleted_at IS NULL`);
    
    return res.status(200).json({
      status: 200,
      message: "Core Services Payment retrieved successfully",
      data: coreServicesPayment
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}


coreServicesControllerClass.createServicesEscrows = async (req, res) => {

  try {

    const { error, value } = coreServiceSchemas.createServicesEscrowsSchema.validate(req.body);
                      
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { school_id, provider_id, core_service_id, core_service_booking_id, core_service_payment_id, amount, user_id, status, code } = value;

    code = Boolean(code) ? code : Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newCoreServicesEscrows = { 
      school_id,
      provider_id, 
      core_service_id, 
      core_service_booking_id,
      core_service_payment_id,
      user_id,
      amount,
      status,
      code,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
    }

    await sqlPackage.insertData(newCoreServicesEscrows, "core_service_escrows");
    
    return res.status(201).json({
        status: 201,
        message: "Core Services Escrows created successfully",
    });
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}


coreServicesControllerClass.updateServicesEscrows = async (req, res) => {

  try {

    const { error, value } = coreServiceSchemas.updateCoreServicesEscrowsSchema.validate(req.body);
                      
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { id, amount } = value;

    const coreServiceData = await funcObj.getUserData("id", id, "core_service_escrows");
                
    if(!coreServiceData) {
        return res.status(409).json({
            status: 409,
            message: `Core Service Escrows does not exist`
        });
    }


    await sqlPackage.dbQuery.query(`UPDATE core_service_escrows SET amount = '${amount}', updated_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'  where id = ${id}`);
        
    return res.status(200).json({
        status: 200,
        message: "Core Service Escrows updated successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}


coreServicesControllerClass.servicesEscrowsStatusUpdate = async (req, res) => {

  try {

    const { error, value } = coreServiceSchemas.servicesEscrowsStatusUpdateSchema.validate(req.body);
                      
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { id, status } = value;

    const coreServiceData = await funcObj.getUserData("id", id, "core_service_escrows");
                
    if(!coreServiceData) {
        return res.status(409).json({
            status: 409,
            message: `Core Service Escrows does not exist`
        });
    }

    let statusUpdateString = status == "Completed" ? `completed = true, completed_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'` : `completed = false, completed_at = null`;


    await sqlPackage.dbQuery.query(`UPDATE core_service_escrows SET status = '${status}', ${statusUpdateString}, updated_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'  where id = ${id}`);
        
    return res.status(200).json({
        status: 200,
        message: "Core Service Escrows status updated successfully",
    })
  }
  catch(err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}

coreServicesControllerClass.getCoreServiceEscrows = async (req, res) => {

  try {

    const [coreServicesEscrows] = await sqlPackage.dbQuery.query(`SELECT * FROM core_service_escrows WHERE deleted_at IS NULL`);
    return res.status(200).json({
      status: 200,
      message: "Core Services Escrows retrieved successfully",
      data: coreServicesEscrows
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}


coreServicesControllerClass.createCoreServicesCategory = async (req, res) => {

  try {

    const { error, value } = coreServiceSchemas.createCoreServicesCategorySchema.validate(req.body);
                      
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { name, code } = value;

    code = Boolean(code) ? code : Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newCoreServicesCategory = { 
      name,
      code,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
    }

    await sqlPackage.insertData(newCoreServicesCategory, "core_service_categories");
    
    return res.status(201).json({
        status: 201,
        message: "Core Services Category created successfully",
    });
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}


coreServicesControllerClass.updateCoreServicesCategory = async (req, res) => {

  try {

    const { error, value } = coreServiceSchemas.updateCoreServicesCategorySchema.validate(req.body);
                      
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { id, name } = value;

    const coreServiceData = await funcObj.getUserData("id", id, "core_service_categories");
                
    if(!coreServiceData) {
        return res.status(409).json({
            status: 409,
            message: `Core Service Category does not exist`
        });
    }


    await sqlPackage.dbQuery.query(`UPDATE core_service_categories SET name = '${name}', updated_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'  where id = ${id}`);
        
    return res.status(200).json({
        status: 200,
        message: "Core Service Category updated successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}


coreServicesControllerClass.getCoreServiceCategory = async (req, res) => {

  try {

    const [coreServicesCategory] = await sqlPackage.dbQuery.query(`SELECT * FROM core_service_categories WHERE deleted_at IS NULL`);
    
    return res.status(200).json({
      status: 200,
      message: "Core Services Category retrieved successfully",
      data: coreServicesCategory
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}


coreServicesControllerClass.createCoreServicesBooking = async (req, res) => {

  try {

    const { error, value } = coreServiceSchemas.createCoreServicesBookingSchema.validate(req.body);
                      
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { school_id, provider_id, core_service_id, core_service_escrow_id, core_service_payment_id, amount, user_id, status, code } = value;

    code = Boolean(code) ? code : Math.random().toString(16).slice(-11) + crypto.getRandomValues(new Uint32Array(24))[0];

    const newCoreServicesBooking = { 
      school_id,
      provider_id, 
      core_service_id, 
      core_service_escrow_id,
      core_service_payment_id,
      user_id,
      amount,
      status,
      code,
      created_at: dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss'),
    }

    await sqlPackage.insertData(newCoreServicesBooking, "core_service_bookings");
    
    return res.status(201).json({
        status: 201,
        message: "Core Services Booking created successfully",
    });
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}


coreServicesControllerClass.updateCoreServicesBooking = async (req, res) => {

  try {

    const { error, value } = coreServiceSchemas.updateCoreServicesBookingSchema.validate(req.body);
                      
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { id, amount } = value;

    const coreServiceData = await funcObj.getUserData("id", id, "core_service_bookings");
                
    if(!coreServiceData) {
        return res.status(409).json({
            status: 409,
            message: `Core Service Booking does not exist`
        });
    }


    await sqlPackage.dbQuery.query(`UPDATE core_service_bookings SET amount = '${amount}', updated_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'  where id = ${id}`);
        
    return res.status(200).json({
        status: 200,
        message: "Core Service Booking updated successfully",
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}



coreServicesControllerClass.BookingStatusUpdate = async (req, res) => {

  try {

    const { error, value } = coreServiceSchemas.servicesEscrowsStatusUpdateSchema.validate(req.body);
                      
    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details
        });
    }

    let { id, status } = value;

    const coreServiceData = await funcObj.getUserData("id", id, "core_service_bookings");
                
    if(!coreServiceData) {
        return res.status(409).json({
            status: 409,
            message: `Core Service Booking does not exist`
        });
    }

    let statusUpdateString = "";

    if(status == "Completed"){
      statusUpdateString = `completed = true, completed_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}',`;
    }
    else if(status == "Cancelled"){
      statusUpdateString = `cancelled = true, cancelled_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}',`
    }
    else if(status == "Delivered"){
      statusUpdateString = `delivered = true, delivered_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}',`
    }


    await sqlPackage.dbQuery.query(`UPDATE core_service_bookings SET status = '${status}', ${statusUpdateString} updated_at = '${dayjs().tz('Africa/Lagos').format('YYYY-MM-DD HH:mm:ss')}'  where id = ${id}`);
        
    return res.status(200).json({
        status: 200,
        message: "Core Service Booking status updated successfully",
    })
  }
  catch(err){
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}


coreServicesControllerClass.getCoreServicesBooking = async (req, res) => {

  try {

    const [coreServicesBooking] = await sqlPackage.dbQuery.query(`SELECT * FROM core_service_bookings WHERE deleted_at IS NULL`);
    
    return res.status(200).json({
      status: 200,
      message: "Core Services Booking retrieved successfully",
      data: coreServicesBooking
    })
  }
  catch (err) {
    return res.status(500).json({
      status: 500,
      message: String(err)
    });
  }
}


module.exports = coreServicesControllerClass;


