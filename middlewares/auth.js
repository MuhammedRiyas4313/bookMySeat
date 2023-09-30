import jwt from 'jsonwebtoken';

import * as dotenv from "dotenv";
dotenv.config();

export const verifyAdmin = async (req, res, next) => {
    try {
      let token = req.headers["authorization"]

      if (!token ) {
        return res.status(403).send("Access Denied");
      }
  
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
      }

      const verified = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    
      req.user = verified;

      if(!verified.isAdmin){
        return res.status(403).send("Access Denied not admin");
      }
  
      if (verified.role == process.env.ADMIN_JWT_ROLE) {
        next();
      } else {
        return res.status(403).send("Access Denied not admin");
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: err.message });
    }
  };
  
  export const verifyUser = async (req, res, next) => {
    try {
      let token = req.headers["authorization"];
      if (!token) {
        return res.status(403).send("Access Denied");
      }
  
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
      }
      const verified = jwt.verify(token, process.env.USER_JWT_SECRET);
      req.user = verified;
      if (verified.role == process.env.USER_JWT_ROLE) {
        next();
      } else {
        return res.status(403).send("Access Denied");
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: err.message });
    }
  };