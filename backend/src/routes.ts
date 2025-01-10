import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListbyCategoryController } from "./controllers/product/ListbyCategoryController";

import { CreateOrderController } from "./controllers/order/CreateOrderContoller";
import { removeOrderController } from "./controllers/order/RemoveOrderController";

import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from "./config/multer";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

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

router.get("/category", (req, res, next) => {
  isAuthenticated;
  new ListCategoryController().handle(req, res);
});

//ROTAS PRODUCT

router.post("/product", upload.single("file"), (req, res, next) => {
  isAuthenticated;
  new CreateProductController().handle(req, res);
});

router.get("/category/product", (req, res, next) => {
  isAuthenticated;
  new ListbyCategoryController().handle(req, res);
});

//ROTAS ORDER
router.post("/order", (req, res, next) => {
  isAuthenticated;
  new CreateOrderController().handle(req, res);
});

router.delete("/order", (req, res, next) => {
  isAuthenticated;
  new removeOrderController().handle(req, res);
});

//ROTAS ORDER ITEM
router.post("/order/add", (req, res, next) => {
  isAuthenticated;
  new AddItemController().handle(req, res);
});

router.delete("/order/remove", (req, res, next) => {
  isAuthenticated;
  new RemoveItemController().handle(req, res);
});

router.put("/order/send", (req, res, next) => {
  isAuthenticated;
  new SendOrderController().handle(req, res);
});

router.get("/orders", (req, res, next) => {
  isAuthenticated;
  new ListOrdersController().handle(req, res);
});

router.get("/order/detail", (req, res, next) => {
  isAuthenticated;
  new DetailOrderController().handle(req, res);
});

export { router };
