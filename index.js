import express from "express";
import { router } from "./api/router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Working ...");
});

app.use("/api", router);

app.listen(port, () => {
  `Server stated on ${port}`;
});
