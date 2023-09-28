import mongoose from "mongoose";

const { Schema } = mongoose;

const theatreSchema = new Schema({
  name: {
    type: String,
  },
  location: {
    street: String,
    city: String,
    state: String,
    pincode: Number,
    geolocation: [Number],
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  screens: [
    {
      type: Number,
      capacity: Number,
      rows: Number,
    },
  ],
  image: {
    type: String,
  },
});

const Theatre = mongoose.model("Theatre", theatreSchema);

export default Theatre;
