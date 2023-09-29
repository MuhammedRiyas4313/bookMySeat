import mongoose, { Mongoose } from "mongoose";

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
      type: mongoose.Schema.Types.Mixed,
      capacity: mongoose.Schema.Types.Mixed,
      rows: mongoose.Schema.Types.Mixed,
    },
  ],
  image: {
    type: String,
  },
});

const Theatre = mongoose.model("Theatre", theatreSchema);

export default Theatre;
