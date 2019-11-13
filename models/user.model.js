const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

//simple schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  return_to: {
    type: String,
    default: 'https://multipass-demo.myshopify.com/products/multiple-passes',
    enums: ['https://multipass-demo.myshopify.com/products/multiple-passes']
  },
  //give different access rights if admin or not 
  isAdmin: Boolean
}, {
  timestamps: { createdAt: 'created_at' }
});


//custom method to generate authToken - token expiry set to 10 mins
UserSchema.methods.generateAuthToken = function() { 
  // local
  // const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('myprivatekey'), { expiresIn: '10m' }); //get the private key from the config file -> environment variable
  // production
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.MY_PRIVATE_KEY, { expiresIn: '10m' });
  return token;
}

const User = mongoose.model('User', UserSchema);

//function to validate user 
function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required()
  };

  return Joi.validate(user, schema);
}

//function to find user by credentials
async function findByCredentials(email, password) {

  // Search for a user by email and password.
  const user = await User.findOne({ email} )
  if (!user) {
      throw new Error('Invalid login credentials')
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
      throw new Error({ error: 'Invalid login credentials' })
  }
  return user
}

exports.User = User; 
exports.validate = validateUser;
exports.findByCredentials = findByCredentials;