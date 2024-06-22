import PostModel from "../models/Post.js";
import { validationResult } from "express-validator";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("author").exec();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось вернуть список постов",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findByIdAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      { returnDocument: "after" }
    ).exec();

    if (!post) {
      return res.status(404).json({
        message: "Пост не найден",
      });
    }

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить пост",
    });
  }
};

export const create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      author: req.userId,
    });

    const post = await doc.save();

    res.json({
      message: "Новый пост успешно создан",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать пост",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({
        message: "Такого поста не существует",
      });
    }

    res.json({
      message: "Пост был успешно удален",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось удалить пост",
    });
  }
};

export const update = async (req, res) => {
  const postId = req.param.id;

  const post = await PostModel.findByIdAndUpdate(postId, {
    title: req.body.title,
    text: req.body.text,
    tags: req.body.tags,
    imageUrl: req.body.imageUrl,
    author: req.userId,
  });
};
