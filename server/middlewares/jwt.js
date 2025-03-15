const jwt = require('jsonwebtoken');
const env = require('../env');
const funcObj = require('../utils/functions');

let auth = {};

auth.verifyToken = async (req, res, next) => {
    //getting the authorization token and user email from request object
    const { authorization } = req.headers;
    
    //if token is not provided
    if (!authorization) {
        return res.status(400).json({
            statusCode: 400,
            statusMessage: 'Token not provided'
        });
    }
    try {
        //token decoder - using .env secret key to decode the token
        const decoded =  jwt.verify(authorization, env.jwt_secret);
        const username = decoded.username;

        const adminData = await funcObj.getAdminDetails(username);
        
        if(!adminData || adminData.del_status){
            return res.status(409).json({
                statusCode: 409,
                statusMessage: `Authentication Failed`
            });
        }
        //creating a user object - this object can be accessed by any async function that uses verifyToken as its middleware
        req.user = {
            username
        };

        next();
        
        // //if user mail is the decoded one
        // if(username == decoded.username) {
        //     //carry jump to the next function after this one immediately while along with the data
        //     next();
        // } else {
        //     return res.status(400).json({
        //         statusCode: 401,
        //         statusMessage: 'Authentication Failed'
        //     });
        // }
    } catch (error) {
        return res.status(400).json({
            statusCode: 401,
            statusMessage: String(error)
        });
    }
};

auth.verifyTokenApp = async (req, res, next) => {
    //getting the authorization token and user email from request object
    const { authorization } = req.headers;
    
    //if token is not provided
    if (!authorization) {
        return res.status(400).json({
            statusCode: 400,
            statusMessage: 'Token not provided'
        });
    }
    try {
        //token decoder - using .env secret key to decode the token
        const decoded =  jwt.verify(authorization, env.jwt_secret);
        const app_id = decoded.username;
        // console.log(decoded)

        const appData = await funcObj.getAppDetails(app_id);
        
        if(!appData || appData.del_status){
            return res.status(409).json({
                statusCode: 409,
                statusMessage: `Authentication Failed`
            });
        }
        //creating a user object - this object can be accessed by any async function that uses verifyToken as its middleware
        req.user = {
            app_id,
            inst_code: appData.inst_code,
            appData
        };

        next();
        
        // //if user mail is the decoded one
        // if(username == decoded.username) {
        //     //carry jump to the next function after this one immediately while along with the data
        //     next();
        // } else {
        //     return res.status(400).json({
        //         statusCode: 401,
        //         statusMessage: 'Authentication Failed'
        //     });
        // }
    } catch (error) {
        return res.status(400).json({
            statusCode: 401,
            statusMessage: String(error)
        });
    }
};

auth.generateToken = ({ username }) => {
    const token = jwt.sign({
        username
    },
    env.jwt_secret, { expiresIn: env.jwt_expiry });
    return token;
};

module.exports = auth;