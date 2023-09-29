import Theatre from "../models/theatre.js";

export const addTheatre = async (req, res) => {
  try {
    const allValuesDefined = Object.values(req.body).every(
      (value) => value !== undefined
    );

    if (!allValuesDefined) {
      return res
        .status(400)
        .json({ error: "One or more values are undefined" });
    }
    const { name, location, screens, ticketPrice, image } = req.body;
    const theaterInstance = new Theatre({
      name,
      location,
      screens: [...screens],
      image,
      ticketPrice,
    });

    theaterInstance.save().then((data) => {
      res.status(201).json({ message: "Theater added successfully" });
    }).catch((err)=>{
      console.log(err)
      throw new Error("Add theatre failed!");
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTheatres = async (req, res) => {
  try {
    const theatre = await Theatre.find({});
    res.status(200).json({ theatre });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchTheatre = async (req, res) => {
  try {
    const { search } = req.query;

    const regexPattern = new RegExp(`^${search}`, 'i');

    const theatres = await Theatre.find({ "location.city": { $regex: regexPattern } });
    
    res.status(200).json({ theatres });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
