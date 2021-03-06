const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isDeactivated: Boolean
});

// uniqueValidator is a plugin tht provides an extra hook to check ur data b4 saving to db
userSchema.plugin(uniqueValidator);

//model name and schema u want to use for it
module.exports = mongoose.model('User', userSchema);
