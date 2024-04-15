// const express= require('express');
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/router.js";
import UserRoutes from "./Users/routes.js";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(morgan("dev"));
app.use(cors());

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    maxAge: 60000,
  };
}

app.use(express.json());
app.use(session(sessionOptions));

app.get("/", (_, res) => {
  res.send({ status: "ok" });
});

ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);
UserRoutes(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
