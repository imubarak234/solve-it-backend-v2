const { uuid } = require('uuidv4');
const funcObj = require('./server/utils/functions')
const bcrypt = require('bcryptjs');
const moment = require('moment');

// console.log(funcObj.hashPassword("6lud7k8avu8202570214"));

let salt = bcrypt.genSaltSync(10);
// console.log(bcrypt.hashSync("First hash", salt));
console.log(moment().format("YYYY-MM-DD HH:mm:ss"))

const passwordValidation = (str) => {

  let isEightCharacters = str.length >= 8 ? true : false;
  let regexCheck = /[^A-Za-z0-9_ ]/g;
  let isUpperCase = false;
  let isLowerCase = false;
  let isNumber = false;
  let isSpecialNumber = regexCheck.test(str);

  let strArray = str.split('');
  let nums = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ]

  for(let x = 0; x < strArray.length; x++){

    if(strArray[x] === strArray[x].toUpperCase())
    isUpperCase = true;

    if(strArray[x] === strArray[x].toLowerCase())
    isLowerCase = true;

    if(nums.indexOf(strArray[x]) >= 0)
    isNumber = true;
  }

  let errors = `${!isEightCharacters ? "The characters should be atleast 8 characters long," : ""} ${!isUpperCase ? "The password needs one uppercase," : ""} ${!isLowerCase ? "The password should have at least one lowercase," : ""} ${!isNumber ? "The password should have at least one number," : ""} ${!isSpecialNumber ? "The password should contain at least one special character" : ""}`

  return {
    status: Boolean(isEightCharacters && isUpperCase && isLowerCase && isNumber && isSpecialNumber) ? "Valid" : "Invalid",
    errorMessage: errors
  }
}
  
  passwordValidation("consonant");