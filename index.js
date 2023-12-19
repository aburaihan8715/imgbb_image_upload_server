// FIXME: it works with multer
import express from "express";
import createError from "http-errors";
import cors from "cors";

const app = express();
import { connectDb } from "./src/config/db.js";
import { User } from "./src/models/user.js";
import { errorResponse, successResponse } from "./src/utils/response.js";
import { serverPort } from "./src/config/secret.js";

const port = serverPort || 5001;

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// home route
app.get("/", (req, res) => {
  res.send("Hello from home route!");
});

// create user
app.post("/api/users/create", async (req, res) => {
  const { name, email, image } = req.body;
  const newUser = {
    name,
    email,
    image,
  };

  try {
    await User.create(newUser);
    return successResponse(res, { statusCode: 201, message: "User created" });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

// get all user
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    return successResponse(res, { statusCode: 200, message: "Users returned!", data: { users } });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

// get specific user
app.get("/api/users/:id", async (req, res) => {
  try {
    res.status(200).json({ message: "User returned!" });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

// update specific user
app.patch("/api/users/:id", async (req, res) => {
  try {
    res.status(201).json({ message: "User updated!" });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

// delete specific user
app.delete("/api/users/:id", async (req, res) => {
  try {
    res.status(201).json({ message: "User deleted!" });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

// client error route
app.all("*", (req, res, next) => {
  next(createError(404, "Route not found!"));
});

// server error route
app.use((err, req, res, next) => {
  return errorResponse(res, { statusCode: err.status, message: err.message });
});

// server running
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  connectDb();
});

// ==========end=========
