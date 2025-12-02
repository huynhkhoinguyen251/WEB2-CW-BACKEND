const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: 'Username cannot be blank',
      unique: true
    },
    password: {
      type: String,
      required: 'Password cannot be blank'
    }
  },
  { collection: 'users' }
);

module.exports = mongoose.model('User', UserSchema);