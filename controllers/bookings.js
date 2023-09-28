import Booking from "../models/booking.js";
import { generateQR } from "../utils/generateQRcode.js";
import { sendEmail } from "../utils/nodeMailer.js";

export const bookTicket = async (req,res) => {
    try {
        const allValuesDefined = Object.values(req.body).every((value) => value !== undefined);
    
        if (!allValuesDefined) {
            return res.status(400).json({ error: "One or more values are undefined" });
        }
        const { userId, date, startAt, seats, ticketPrice, total, movieId, theatreId, userName, email } = req.body;
        const bookingInstance = new Booking({
            date, 
            startAt, 
            seats, 
            ticketPrice, 
            total, 
            userId,
            movieId, 
            theatreId, 
            userName, 
            email
          });

          const uniqueText = `${userId}-${movieId}`;
          const QRcode = await generateQR(uniqueText);
          const sendMail = await sendEmail(email,QRcode);
          
          bookingInstance.save((err, data) => {
            if (err) {
                throw new Error('booking failed!');
            } else {
                res.status(200).json({ message: 'ticket booked successfully',...data,QRcode});
            }
          });
    
      } catch (error) {
        res.status(500).json({ error:error.message });
      }
}

