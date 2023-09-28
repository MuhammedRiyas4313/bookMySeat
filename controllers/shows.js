import Shows from "../models/shows.js";

export const addShows = async (req, res) => {
    try {
        const allValuesDefined = Object.values(req.body).every((value) => value !== undefined);

    if (!allValuesDefined) {
        return res.status(400).json({ error: "One or more values are undefined" });
    }
    const { startAt, startDate, endDate, movieId, theatreId } = req.body;
    const showInstance = new Shows({
        startAt,
        startDate,
        endDate,
        movieId,
        theatreId
      });
      
      showInstance.save((err) => {
        if (err) {
            throw new Error('Add show failed!');
        } else {
            res.status(201).json({ message: 'Sho added successfully' });
        }
      });


    } catch (error) {
        res.status(500).json({ error:error.message });
    }
}