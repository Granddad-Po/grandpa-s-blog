import { body } from "express-validator";

export const newPostValidation = [
  body("title", "Слишком короткий заголовок").isLength({ min: 3 }).isString(),
  body("text", "Слишком короткое содержание")
    .isLength({
      min: 10,
    })
    .isString(),
  body("tags", "Имя должно содержать минимум 3 символа").optional().isArray(),
  body("imageUrl", "Неверная ссылка на аватар").optional().isURL(),
];
