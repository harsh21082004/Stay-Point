import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the schema
const savedPropertySchema = new Schema({
  propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required: true }, 
  savedAt: { type: Date, default: Date.now },
});

const customerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Customer'},
  picture: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' },
  savedProperties: [savedPropertySchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Check if the model already exists to avoid overwriting it
const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

export default Customer;
