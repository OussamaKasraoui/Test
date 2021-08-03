const Validator = require("validator");
const isEmpty = require("is-empty");
var m = new Date();

module.exports = validateRegisterInput = (data) => {
  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
  data.nom_complet = !isEmpty(data.nom_complet) ? data.nom_complet : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.date_inscription = m.getUTCFullYear() + "-" +("0" + (m.getUTCMonth()+1)).slice(-2) + "-" +("0" + m.getUTCDate()).slice(-2)

// Name checks
  if (Validator.isEmpty(data.nom_complet)) {
    errors.name = "Name field is required";
  }

// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};