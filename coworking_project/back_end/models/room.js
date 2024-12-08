import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["Meeting room", "Private office", "Coworking space"],
  },
  capacity: {
    type: Number,
    required: true,
  },
  bookings: [
    {
      date: String,
      startTime: String,
      endTime: String,
    },
  ],
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
