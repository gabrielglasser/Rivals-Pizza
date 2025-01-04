import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

//ROTAS USER
router.post("/users", (req, res, next) => {
    new CreateUserController().handle(req, res);
  });

router.post("/session", (req, res, next) => {
    new AuthUserController().handle(req, res);
  });

  router.get("/me", isAuthenticated, (req, res, next) => { 
    new DetailUserController().handle(req, res);
  });

export { router };