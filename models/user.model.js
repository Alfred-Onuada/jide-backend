import mongoose from "mongoose";
import { hashSync } from "bcrypt";

const userSchema = new mongoose.Schema({
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: 'Gender should be male or female'
    },
    lowercase: true
  },
  // this will be used to project away certain fields on the profile based on if they are a doctor or patient
  role: {
    type: String,
    enum: {
      values: ['doctor', 'patient'],
      message: 'Role must be either doctor or patient'
    },
    lowercase: true
  },
  matricNo: {
    type: String,
    required: [true, 'Matric Number is required'],
  },
  cardNo: {
    type: String,
    required: [true, 'Card Number is required'],
  },
  fullname: {
    type: String,
    required: [true, 'Fullname is required'],
  },
  schoolName: {
    type: String,
    required: [true, 'School Name is required'],
  }
}, {timestamps: true});

userSchema.pre('save', function (next) {
  this.password = hashSync(this.password, 10);

  next()
})

const userModel = mongoose.model('user', userSchema);

export default userModel;