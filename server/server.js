const express = require("express");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT || 5000; // Default to port 5000 if PORT is not set in .env
const app = express();
app.use(express.json());
app.use(cors());

app.get("/tell", (req, res) => {
  res.send("Yea Tell");
});

app.get("/search", async (req, res) => {
  const bookTitle = req.query.title;
  if (!bookTitle) {
    return res.status(400).json({ error: "Title query parameter is required" });
  }
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${bookTitle}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching data from Open Library API" });
  }
});

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
