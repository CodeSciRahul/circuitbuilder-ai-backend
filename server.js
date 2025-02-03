import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import { properties } from "./src/config/properties.js";
import {connectDB} from "./src/config/dbConnection.js"

const app = express();

connectDB(properties?.MONGO_URI).catch((err) => console.log("MongooDb connection error\n",err));

const corsOption = {
    origin: (origin, callback) => {
        const allowedOrigins = [
          "http://localhost:5173",
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
}

//middleware
app.use(cors(corsOption))
app.use(bodyParser.json());
app.options("*", cors(corsOption))

const PORT = properties?.PORT;

app.get("*", async(req, res) =>{
    return res.send(`Server is running on port ${PORT}`)
})

app.listen(PORT, () => {
    console.log(`Backend start on port ${PORT}`)
})