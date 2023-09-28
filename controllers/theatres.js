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
      capacity,
      screens: [...screens],
      image: image,
      ticketPrice,
    });

    theaterInstance.save((err) => {
      if (err) {
        throw new Error("Add theatre failed!");
      } else {
        res.status(201).json({ message: "Theater added successfully" });
      }
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
    const { latitude, longitude } = req.query;

    const parsedLatitude = parseFloat(latitude);
    const parsedLongitude = parseFloat(longitude);

    const maxDistance = 10000;

    const theatres = await Theatre.find({
      "location.geolocation": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parsedLongitude, parsedLatitude],
          },
          $maxDistance: maxDistance,
        },
      },
    });

    res.status(200).json({ theatres });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
