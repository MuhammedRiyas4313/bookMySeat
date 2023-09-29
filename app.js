
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

import * as dotenv from "dotenv";
dotenv.config();

import connectDB from "./database/mongoConnection.js";
connectDB();

import routes from "./routes/route.js";


//*  CONFIGURATION *//
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
//*  ROUTES   *//

app.use("/", routes);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});