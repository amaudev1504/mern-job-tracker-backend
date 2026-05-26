const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator').default;

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["candidate", "recruiter", "admin"],
      default: "candidate"
    },
    avatar: String,
    phone: String,
    location: String,
    bio: String,
    skills: [String],
    resume: String,
  }, { timestamps: true });

  userSchema.plugin(uniqueValidator);

  module.exports = mongoose.model('User', userSchema);