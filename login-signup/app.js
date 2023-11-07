const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {
  // Your code for handling GET requests here
});

app.post("/", async (req, res) => {
  const { name, email, password, dob } = req.body;

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/signup", async (req, res) => {
  const { name, email, password, dob } = req.body;

  const data = {
    name: name,
    email: email,
    password: password, // Added a missing comma here
    dob: dob, // Added a missing comma here
  };

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("fail");
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
