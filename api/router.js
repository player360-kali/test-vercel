import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
const path = "db/users.json";

router.get("/users", (req, res) => {
  fs.readFile(path, function (err, data) {
    if (err) throw err;

    const books = JSON.parse(data);
    res.send(books);
  });
});

router.post("/register", (req, res) => {
  const { name, surname } = req.body;

  if (!name || !surname) {
    return res.status(400).send("Please fill your name and surname");
  }

  const newUser = {
    id: uuidv4(),
    name,
    surname,
  };

  fs.readFile(path, "utf8", (readErr, data) => {
    let users = [];

    if (readErr && readErr.code !== "ENOENT") {
      console.error("Failed to read file:", readErr);
      return res.status(500).send("Error reading user data.");
    }

    if (data) {
      try {
        users = JSON.parse(data);
      } catch (parseErr) {
        console.error("Invalid JSON format:", parseErr);
        return res.status(500).send("User data is corrupted.");
      }
    }

    const existingUser = users.find(
      (user) => user.name === name && user.surname === surname,
    );

    if (existingUser) {
      return res.status(409).send("User already exists.");
    }

    users.push(newUser);

    fs.writeFile(path, JSON.stringify(users, null, 2), "utf8", (writeErr) => {
      if (writeErr) {
        console.error("Failed to write file:", writeErr);
        return res.status(500).send("Error saving user.");
      }

      res.status(201).send(newUser);
    });
  });
});

export { router };
