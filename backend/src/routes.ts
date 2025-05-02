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
import { FinishOrderController } from "./controllers/order/FinishOrderController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from "./config/multer";

const router = Router();

const upload = multer(uploadConfig.upload());

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operações relacionadas a usuários
 *   - name: Categories
 *     description: Operações relacionadas a categorias
 *   - name: Products
 *     description: Operações relacionadas a produtos
 *   - name: Orders
 *     description: Operações relacionadas a pedidos
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Criar um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post("/users", new CreateUserController().handle);

/**
 * @swagger
 * /session:
 *   post:
 *     tags: [Users]
 *     summary: Autenticar usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 */
router.post("/session", new AuthUserController().handle);

/**
 * @swagger
 * /me:
 *   get:
 *     tags: [Users]
 *     summary: Obter detalhes do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Detalhes do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get("/me", isAuthenticated, new DetailUserController().handle);

/**
 * @swagger
 * /category:
 *   post:
 *     tags: [Categories]
 *     summary: Criar uma nova categoria
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */
router.post("/category", isAuthenticated, new CreateCategoryController().handle);

/**
 * @swagger
 * /category:
 *   get:
 *     tags: [Categories]
 *     summary: Listar todas as categorias
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/category", isAuthenticated, new ListCategoryController().handle);

/**
 * @swagger
 * /product:
 *   post:
 *     tags: [Products]
 *     summary: Criar um novo produto
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: string
 *               description:
 *                 type: string
 *               category_id:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post("/product", isAuthenticated, upload.single("file"), new CreateProductController().handle);

/**
 * @swagger
 * /category/product:
 *   get:
 *     tags: [Products]
 *     summary: Listar produtos por categoria
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/category/product", isAuthenticated, new ListbyCategoryController().handle);

/**
 * @swagger
 * /order:
 *   post:
 *     tags: [Orders]
 *     summary: Criar um novo pedido
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               table:
 *                 type: number
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.post("/order", isAuthenticated, new CreateOrderController().handle);

/**
 * @swagger
 * /order:
 *   delete:
 *     tags: [Orders]
 *     summary: Remover um pedido
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido removido com sucesso
 */
router.delete("/order", isAuthenticated, new removeOrderController().handle);

/**
 * @swagger
 * /order/add:
 *   post:
 *     tags: [Orders]
 *     summary: Adicionar item ao pedido
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: string
 *               product_id:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 */
router.post("/order/add", isAuthenticated, new AddItemController().handle);

/**
 * @swagger
 * /order/remove:
 *   delete:
 *     tags: [Orders]
 *     summary: Remover item do pedido
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: item_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do item
 *     responses:
 *       200:
 *         description: Item removido com sucesso
 */
router.delete("/order/remove", isAuthenticated, new RemoveItemController().handle);

/**
 * @swagger
 * /order/send:
 *   put:
 *     tags: [Orders]
 *     summary: Enviar pedido para produção
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido enviado com sucesso
 */
router.put("/order/send", isAuthenticated, new SendOrderController().handle);

/**
 * @swagger
 * /orders:
 *   get:
 *     tags: [Orders]
 *     summary: Listar todos os pedidos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get("/orders", isAuthenticated, new ListOrdersController().handle);

/**
 * @swagger
 * /order/detail:
 *   get:
 *     tags: [Orders]
 *     summary: Obter detalhes do pedido
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Detalhes do pedido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.get("/order/detail", isAuthenticated, new DetailOrderController().handle);

/**
 * @swagger
 * /order/finish:
 *   put:
 *     tags: [Orders]
 *     summary: Finalizar pedido
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido finalizado com sucesso
 */
router.put("/order/finish", isAuthenticated, new FinishOrderController().handle);

export { router };
