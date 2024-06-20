import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум из 5 символов").isLength({
    min: 5,
  }),
  body("fullName", "Имя должно содержать минимум 3 символа").isLength({
    min: 3,
  }),
  body("avatarUrl", "Неверная ссылка на аватар").optional().isURL(),
];
