import mongoose from "mongoose";

const { Schema } = mongoose;
const showsSchema = new Schema({
  startAt: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  theatreId: {
    type: Schema.Types.ObjectId,
    ref: 'Theatre',
    required: true,
  },
  
});

const Shows = mongoose.model('Shows', showsSchema);

export default Shows;
