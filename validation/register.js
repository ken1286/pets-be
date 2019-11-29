const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {
    // name: "error description",
    // status: false or true
  };

  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!validator.isLength(data.username, { min: 5, max: 30 })) {
    errors.message = 'Username must be between 5 and 30 characters';
  }

  if (validator.isEmpty(data.username)) {
    errors.message = 'Username field is required';
  }

  if (validator.isEmpty(data.password)) {
    errors.message = 'Password field is required';
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.message = 'Password must be between 6 and 30 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
