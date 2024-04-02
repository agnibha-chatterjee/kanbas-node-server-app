// const express= require('express');
import express from "express";
import morgan from "morgan";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/router.js";
import cors from "cors";
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send({ status: "ok" });
});

ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
