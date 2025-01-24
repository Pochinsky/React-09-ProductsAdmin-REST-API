import { Router } from "express";
import { body, param } from "express-validator";
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  updateAvailability,
} from "./handlers/product";
import { handleInputErrors } from "./middlewares";

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The product id
 *          example: 1
 *        name:
 *          type: string
 *          description: The product name
 *          example: Monitor 24'' 1920x1080 144hz
 *        price:
 *          type: number
 *          description: The product price
 *          example: 300
 *        availability:
 *          type: boolean
 *          description: The product availability
 *          example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list of products
 *    tags:
 *      - Products
 *    description: Return a list of products
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/:id:
 *  get:
 *    summary: Get a product by id
 *    tags:
 *      - Products
 *    description: Return a product based on its unique id
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - Invalid id
 *      404:
 *        description: Product not found
 */
router.get(
  "/:id",
  param("id").isInt().withMessage("El id no es válido"),
  handleInputErrors,
  getProductById
);

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Creates a new product
 *    tags:
 *      - Products
 *    description: Returns a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Monitor 24'' 1920x1080 144hz
 *              price:
 *                type: number
 *                example: 450
 *    responses:
 *      201:
 *        description: Product created succesfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - Invalid input data
 */
router.post(
  "/",
  body("name").notEmpty().withMessage("El nombre del producto es obligatorio"),
  body("price")
    .isNumeric()
    .withMessage("El valor no es válido")
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio")
    .custom((value) => value > 0)
    .withMessage("El valor no es válido"),
  handleInputErrors,
  createProduct
);

/**
 * @swagger
 * /api/products/:id:
 *  put:
 *    summary: Updates a product with user input
 *    tags:
 *      - Products
 *    description: Returns the updated product
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the product to update
 *      required: true
 *      schema:
 *        type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Monitor 24'' 1920x1080 144hz
 *              price:
 *                type: number
 *                example: 450
 *              availability:
 *                type: boolean
 *                example: true
 *    responses:
 *      200:
 *        description: Product updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - Invalid id or input data
 *      404:
 *        description:  Product not found
 */
router.put(
  "/:id",
  param("id").isInt().withMessage("El id no es válido"),
  body("name").notEmpty().withMessage("El nombre del producto es obligatorio"),
  body("price")
    .isNumeric()
    .withMessage("El valor no es válido")
    .notEmpty()
    .withMessage("El precio del producto es obligatorio")
    .custom((value) => value > 0)
    .withMessage("El valor no es válido"),
  body("availability")
    .isBoolean()
    .withMessage("El valor de la disponibilidad no es válido "),
  handleInputErrors,
  updateProduct
);

/**
 * @swagger
 * /api/products/:id:
 *  patch:
 *    summary: Updates product availability by id
 *    description: Returns the updated product
 *    tags:
 *      - Products
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the product to update its availability
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Product availability updated successfully
 *        content:
 *          application/json:
 *            $ref: '#/componentes/schemas/Product'
 *      400:
 *        description: Bad request - Invalid id
 *      404:
 *        description: Product not found
 */
router.patch(
  "/:id",
  param("id").isInt().withMessage("El id no es válido"),
  handleInputErrors,
  updateAvailability
);

/**
 * @swagger
 * /api/products/:id:
 *  delete:
 *    summary: Deletes a product by id
 *    description: Deletes a product by id and returns a successful message
 *    tags:
 *      - Products
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the product to update
 *      required: true
 *      schema:
 *        type: integer
 *  responses:
 *    200:
 *      description: Product deleted succesfully
 *    404:
 *      description: Product not found
 */
router.delete(
  "/:id",
  param("id").isInt().withMessage("El id no es válido"),
  handleInputErrors,
  deleteProduct
);

export default router;
