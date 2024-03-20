import mongoose from "mongoose";

const aiMessageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: [true, 'senderId is required']
  },
  recipientId: {
    type: String,
    required: [true, 'recipientId is required']
  },
  text: {
    type: String,
    required: [true, 'Text is required']
  }
}, {timestamps: true});

const aiMessageModel = mongoose.model('ai-message', aiMessageSchema);

export default aiMessageModel;