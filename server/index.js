import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import courseRouter from "./src/api/routes/courseRouter.js";
import authRouter from "./src/api/routes/authRouter.js";
import userRouter from "./src/api/routes/userRouter.js";
import errorHandler from "./src/api/middlewares/errorMiddleware.js";
import connectDB from "./src/api/config/db.js";
import mongoose from "mongoose";
import passport from "passport";
const app = express();

connectDB();
// const corsOptions = {
//   origin: "http://localhost:5173",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: "true",
//   optionsSuccessStatus: 204,
// };zz
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(passport.initialize());

app.use("/", errorHandler);

app.get("/", (req, res) => {
  res.send("Hello WOrld");
});
app.use("/auth", authRouter);

app.get("/api", (req, res) => {
  res.send("API");
});

 
app.use("/api", courseRouter);
app.use("/api", userRouter);

mongoose.connection.once("open", () => {
  console.log(`Connected to MongoDB`);
  app.listen(27017, () => {
    console.log("Database is running at 27017");
  });
});

mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection erro ${err}`);
});

app.listen(3000, () => console.log("Server is Running at 3000"));
