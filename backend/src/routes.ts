import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

//ROTAS USER
router.post("/users", (req, res, next) => {
  new CreateUserController().handle(req, res);
});

router.post("/session", (req, res, next) => {
  new AuthUserController().handle(req, res);
});

router.get("/me", (req, res, next) => {
  isAuthenticated;
  new DetailUserController().handle(req, res);
});

//ROTAS CATEGORY
router.post("/category", (req, res, next) => {
  isAuthenticated;
  new CreateCategoryController().handle(req, res);
});

export { router };
