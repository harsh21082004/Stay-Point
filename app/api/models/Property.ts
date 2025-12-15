import mongoose from "mongoose";
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  landlordId: { type: Schema.Types.ObjectId, ref: 'Landlord', required: true }, // Reference to the landlord
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['Room', 'Flat', 'PG'], required: true },
  price: { type: Number, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  amenities: { type: [String] },
  availableFrom: { type: Date, required: true },
  photos: { type: [String] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Export the property model
module.exports = mongoose.model('Property', propertySchema);
