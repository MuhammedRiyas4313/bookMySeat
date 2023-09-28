import Movie from "../models/movies.js";


export const addMovies = async (req,res) => {
    try {
    const allValuesDefined = Object.values(req.body).every((value) => value !== undefined);

    if (!allValuesDefined) {
        return res.status(400).json({ error: "One or more values are undefined" });
    }
    const {title, image, language, genre, director, cast, description, duration, releaseDate} = req.body;
    const movieInstance = new Movie({
        title,
        language,
        genre,
        director,
        image,
        cast,
        description,
        duration,
        releaseDate
      });
      
      movieInstance.save((err) => {
        if (err) {
            throw new Error('Add Movie failed!');
        } else {
            res.status(201).json({ message: 'movie added successfully' });
        }
      });
    } catch (error) {
        res.status(500).json({ error:error.message });
    }
}

export const getMovies = async (req,res) => {
    try {
        const movies = await Movie.find({})
        res.status(200).json({ movies });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const searchMovies = async (req,res) => {
    try {
        const { movie } = req.query;

        const regexPattern = new RegExp(`^${movie}`, 'i');
    
        const movies = await Movie.find({ title: { $regex: regexPattern } });
    
        res.status(200).json({ movies });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}