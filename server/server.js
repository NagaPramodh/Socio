const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const router = require("./routes/auth.routes.js");

// (app);

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
// const router = require("./routes/auth.routes.js");

console.log(
  "%%%%%%%%%%%%%%%%%%%%%%%%%",
  process.env.username,
  process.env.password
);
db.mongoose
  .connect(
    `mongodb+srv://socio:${process.env.password}@cluster0.zkkaw8v.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.use("/api/auth", router);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to socio application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
