import express from "express";

const app = express();

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Working ...");
});

app.listen(port, () => {
  `Server stated on ${port}`;
});
