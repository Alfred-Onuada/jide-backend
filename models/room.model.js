import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  participants: {
    type: [mongoose.Schema.Types.ObjectId],
    required: [true, 'Participants must be specified']
  },
}, {timestamps: true});

const roomModel = mongoose.model('room', roomSchema);

export default roomModel;