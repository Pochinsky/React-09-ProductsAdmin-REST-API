import { Router } from "express";
import { body, param } from "express-validator";
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middlewares";

const router = Router();

router.get("/", getProducts);
router.get(
  "/:id",
  param("id").isInt().withMessage("El id no es válido"),
  handleInputErrors,
  getProductById
);
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
router.delete(
  "/:id",
  param("id").isInt().withMessage("El id no es válido"),
  handleInputErrors,
  deleteProduct
);

export default router;
