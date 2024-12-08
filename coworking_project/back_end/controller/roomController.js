import Room from "../models/room.js";

// Check availability
export const checkAvailability = async (req, res, next) => {
  try {
    const { date, startTime, endTime, type } = req.body;

    const rooms = await Room.find({ type });

    const availableRooms = rooms.filter((room) =>
      room.bookings.every(
        (booking) =>
          booking.date !== date ||
          (endTime <= booking.startTime || startTime >= booking.endTime)
      )
    );

    if (availableRooms.length > 0) {
      return res.status(200).json({ available: true, rooms: availableRooms });
    } else {
      return res.status(200).json({ available: false });
    }
  } catch (err) {
    next(err);
  }
};

// Book a room
export const bookRoom = async (req, res, next) => {
  try {
    const { roomId, date, startTime, endTime } = req.body;

    const room = await Room.findById(roomId);
    room.bookings.push({ date, startTime, endTime });
    await room.save();

    res.status(200).json({ message: "Room booked successfully", room });
  } catch (err) {
    next(err);
  }
};
export const createRoom = async (req, res, next) => {
    const newRoom = new Room(req.body); // Create a new room with the request body
  
    try {
      // Save the new room to the database
      const savedRoom = await newRoom.save();
      res.status(201).json(savedRoom); // Respond with the saved room data
    } catch (err) {
      next(err); // Handle errors
    }
  };
  export const updateRoom = async (req, res, next) => {
    try {
      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id, // ID of the room to update
        { $set: req.body }, // Update with the provided fields
        { new: true } // Return the updated document
      );
      res.status(200).json(updatedRoom); // Respond with the updated room data
    } catch (err) {
      next(err); // Handle errors
    }
  };
  export const deleteRoom = async (req, res, next) => {
    try {
      await Room.findByIdAndDelete(req.params.id); // Find and delete the room by ID
      res.status(200).json("Room has been deleted."); // Respond with success message
    } catch (err) {
      next(err); // Handle errors
    }
  };
  export const getRoom = async (req, res, next) => {
    try {
      const room = await Room.findById(req.params.id); // Find the room by ID
      if (!room) {
        return res.status(404).json("Room not found."); // Handle case where room is not found
      }
      res.status(200).json(room); // Respond with the room data
    } catch (err) {
      next(err); // Handle errors
    }
  };
  export const getAllRooms = async (req, res, next) => {
    try {
      const rooms = await Room.find(); // Fetch all rooms
      res.status(200).json(rooms); // Respond with the list of rooms
    } catch (err) {
      next(err); // Handle errors
    }
  };
          
