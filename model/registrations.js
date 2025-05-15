import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  company: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  experience: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  address: {
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: false },
  },
  uuid: { type: String, required: true },
});

export const Registration = mongoose.model('Registration', registrationSchema);
