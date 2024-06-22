import express from "express";
import mongoose from "mongoose";

import { registerValidation } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

mongoose
  .connect(
    "mongodb+srv://granddadpo:wwwwww@grandpas-blog.0w9mebw.mongodb.net/blog?retryWrites=true&w=majority&appName=grandpas-blog"
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidation, UserController.register);
app.post("/auth/login", UserController.login);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
