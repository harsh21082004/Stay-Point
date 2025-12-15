import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  title: { type: String, required: true }, // Name of the property
  description: { type: String }, // Description of the property
  type: { type: String, enum: ['Room', 'Flat', 'PG'], required: true }, // Property type
  price: { type: Number, required: true }, // Rent price
  street: { type: String, required: true }, // Address details
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  latitude: { type: Number, required: true }, // Latitude from map selection
  longitude: { type: Number, required: true }, // Longitude from map selection
  amenities: { type: [String] }, // List of amenities (WiFi, parking, etc.)
  availableFrom: { type: Date, required: true }, // Date property is available
  photos: { type: [String] }, // Array of image URLs
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const landlordSchema = new Schema({
  role: { type: String, default: 'Landlord' }, 
  name: { type: String, required: true }, // Landlord's name
  email: { type: String, required: true, unique: true }, // Unique email for login
  password: { type: String, required: true }, // Password for authentication (hashed)
  phoneNumber: { type: String, required: true, unique: true }, // Phone number for contact
  address: { // Updated address field as a nested object
    state: { type: String, required: true },
    district: { type: String, required: true },
    street: { type: String, required: true },
    pincode: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  picture: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' }, // Profile picture URL
  properties: [propertySchema], // List of properties the landlord owns
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Exporting the model
const Landlord = mongoose.models.Landlord || mongoose.model('Landlord', landlordSchema);

export default Landlord;