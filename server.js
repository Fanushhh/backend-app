const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const exercisesRouter = require("./routes/exercises");
const pendingUsersRouter = require("./routes/pending-users");
const authenticationRouter = require("./routes/authentication");
const exercisesGroupByDifficultyRouter = require("./routes/exercises-group-by-difficulty");
const exercisesGroupByCategoryRouter = require("./routes/exercises-group-by-category");
const resourcesRouter = require("./routes/resources");
const usersRouter = require("./routes/users");
const errorMiddleware = require("./middleware/error-middleware");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.set("strictQuery", false);
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () =>
  console.log("MongoDB database connection established successfully")
);

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/public/templates/login.html`);
});
app.get("/:file", function (req, res) {
  const file = req.params.file;
  res.sendFile(`${__dirname}/public/templates/${file}`);
});

app.use("/auth", authenticationRouter);
app.use("/api/users", usersRouter);
app.use("/api/exercises", exercisesRouter);
app.use("/api/pending-users", pendingUsersRouter);
app.use("/api/exercises-group-by-difficulty", exercisesGroupByDifficultyRouter);
app.use("/api/exercises-group-by-category", exercisesGroupByCategoryRouter);
// app.use('/resources', resourcesRouter);

const PORT = process.env.PORT || 5000;

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running successfully on port ${PORT}`);
});
