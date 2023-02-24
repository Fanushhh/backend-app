import exercisesGroupByDifficultyRouter from "./routes/api/exercises-group-by-difficulty.js";
import exercisesGroupByCategoryRouter from "./routes/api/exercises-group-by-category.js";
import usersRouter from "./routes/api/users.js";
import exerciseViewRoute from "./routes/views/exercise.js";

import { config } from "dotenv";
import { errorMiddleware } from "./middleware/error-middleware.js";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import exercisesRouter from "./routes/api/exercises.js";
import pendingUsersRouter from "./routes/api/pending-users.js";
import authenticationRouter from "./routes/auth/authentication.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const uri = process.env.ATLAS_URI;

mongoose.set("strictQuery", false);
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () =>
  console.log("MongoDB database connection established successfully")
);

app.use("/auth", authenticationRouter);
app.use("/api/users", usersRouter);
app.use("/api/exercises", exercisesRouter);
app.use("/api/pending-users", pendingUsersRouter);
app.use("/api/exercises-group-by-difficulty", exercisesGroupByDifficultyRouter);
app.use("/api/exercises-group-by-category", exercisesGroupByCategoryRouter);

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/public/templates/admin.html`);
});

app.get("/exercises/:id", exerciseViewRoute);

app.get("/:file", function (req, res) {
  const file = req.params.file;
  res.sendFile(`${__dirname}/public/templates/${file}.html`);
});

const PORT = process.env.PORT || 5001;

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running successfully on port ${PORT}`);
});
