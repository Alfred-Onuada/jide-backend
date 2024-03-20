import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'senderId is required']
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'recipientId is required']
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'roomId is required']
  },
  text: {
    type: String,
    required: [true, 'Text is required']
  }
}, {timestamps: true});

const messageModel = mongoose.model('message', messageSchema);

export default messageModel;