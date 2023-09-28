import mongoose from "mongoose";

const { Schema } = mongoose;
const movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  language: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  cast: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  }
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;