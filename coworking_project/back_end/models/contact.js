import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: false,
  },
});  // Enable timestamps to add createdAt and updatedAt fields automatically

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
