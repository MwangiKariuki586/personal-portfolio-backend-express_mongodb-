import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import contactRoutes from "./routes/contactmeRoutes.js";
import backend_experience_Routes from "./routes/backendexperienceRoutes.js";
import database_experience_Routes from "./routes/databaseexperienceRoutes.js";
import frontend_experience_Routes from "./routes/frontendexpreienceRoutes.js";
import { mongoConect } from "./dbconnect.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
mongoConect();
const app = express();
app.use(express.json());
//allow api acess to other endpoints
app.use(cors());
const corsOptions = {
  origin: ["http://localhost:5173/", "http://anotherdomain.com"],
  optionsSuccessStatus: 200,
};
//allow images/pdf loading
app.use("/uploads", express.static("uploads"));
//parse incoming json requests
// app.use(bodyParser.json());
app.use("/projects", projectRoutes);
app.use("/about", aboutRoutes);
app.use("/contact", contactRoutes);
app.use("/backend_experience", backend_experience_Routes);
app.use("/database_experience", database_experience_Routes);
app.use("/frontend_experience", frontend_experience_Routes);
mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
  app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
  });
});
