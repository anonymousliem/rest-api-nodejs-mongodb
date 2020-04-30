const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = 
new Schema({
  name : {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true
  },
  role : {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;