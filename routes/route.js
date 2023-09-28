import express from "express";
import { login, registerUser, verifyOTP } from "../controllers/user.js";
import { addTheatre, getTheatres, searchTheatre } from "../controllers/theatres.js";
import { addShows } from "../controllers/shows.js";
import { addMovies, getMovies, searchMovies } from "../controllers/movies.js";
import { bookTicket } from "../controllers/bookings.js";
import { verifyAdmin, verifyUser } from "../middlewares/auth.js";


const router = express.Router();

router.get('/signup', registerUser);
router.post('/verifyotp', verifyOTP);
router.post('/login', login);
router.post('/theatre', verifyAdmin, addTheatre);
router.get('/theatres', getTheatres);
router.get('/theatre', searchTheatre);
router.post('/movie', verifyAdmin, addMovies);
router.get('/movies', getMovies);
router.get('/movie', searchMovies);
router.post('/bookshow', verifyUser, bookTicket)
router.post('/show', verifyAdmin, addShows);





export default router;