const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [String], // On peut en ajouter plusieurs
    responsibilities: [String], // On peut en ajouter plusieurs
    salaryMin: Number,
    salaryMax: Number,
    location: String,
    jobType: {
      type: String,
      enum: ["full-time", "half-time", "internship", "permanent contract", "fixed-term contract", "freelance"],
      required: true
    },
    workMode: {
      type: String,
      enum: ["on-site", "remote", "hybrid"],
      default: "on-site"
    },
    experienceLevel: {
      type: String,
      enum: [
        "no-experience",
        "beginner",
        "junior",
        "intermediate",
        "experienced",
        "senior",
        "expert"
        ],
    },
    status: {
      type: String,
      enum: ["open", "closed", "draft"],
      default: "open"
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  }, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);