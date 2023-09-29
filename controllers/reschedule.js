import Booking from "../models/booking.js";
import { generateQR } from "../utils/generateQRcode.js";
import { sendEmail } from "../utils/nodeMailer.js";

export const rescheduleBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const allValuesDefined = Object.values(req.body).every((value) => value !== undefined);

    if (!allValuesDefined && !bookingId) {
      return res.status(400).json({ error: "One or more values are undefined" })
    }

    const { date, showId, seats, ticketPrice, total, movieId, theatreId, userName, email, userId } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        date,
        showId,
        seats,
        ticketPrice,
        total,
        userId,
        movieId,
        theatreId,
        userName,
        email,
      },
      { new: true });

      const uniqueText = `${userId}-${movieId}`;
      const QRcode = await generateQR(uniqueText);
      const sendMail = await sendEmail(email,QRcode);

      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.status(200).json({ message: 'Booking updated successfully',...booking, QRcode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
