import * as dotenv from "dotenv";
dotenv.config();

import twilio from 'twilio';

const accountSID = process.env.TWILIO_ACCOUNT_SID;
const accountAuthToken = process.env.TWILIO_AUTH_TOKEN;
const serviceid = process.env.TWILIO_SERVICE_ID;

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOTP = async (mobile) => {
  try {
    const verification = await client
      .verify.v2
      .services(process.env.TWILIO_SERVICE_ID)
      .verifications.create({
        to: `+91${mobile}`,
        channel: "sms",
      })
    return verification;
  } catch (error) {
    throw new Error("Failed to send OTP");
  }
}

export const otpVerification = async (mobile,OTP) => {
    try {
      await client.verify.v2
        .services(process.env.TWILIO_SERVICE_ID)
        .verificationChecks.create({
          to: `+91${mobile}`,
          code: OTP,
        })
        .then((verification_check) => {
          if (verification_check.status == "approved") {
            return verification_check.status;
          } else {
            return verification_check.status;
          }
        })
    
    } catch (error) {
        throw new Error("Twilio OTP verification failed");
    }
}


