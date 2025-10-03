const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type:String, required:true },
  description: { type:String },
  image: { type:String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
