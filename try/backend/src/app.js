import express from "express";
import cors from "cors";
import TARoute from "./routes/taRoute.js";
import StatRoute from "./routes/statRoute.js";


const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());

// use routes
app.use('/tas', TARoute);
app.use('/stats', StatRoute);

export default app;
