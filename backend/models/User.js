const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type:String, required:true, unique:true },
  password: { type:String, required:true },
  pfp: { type: String },
}, { timestamps: true });

// hash password before save
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// method to compare
UserSchema.methods.matchPassword = function(entered) {
  return bcrypt.compare(entered, this.password);
}

module.exports = mongoose.model('User', UserSchema);
