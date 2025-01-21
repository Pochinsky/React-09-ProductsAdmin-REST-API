import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json({ data: products });
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ data: product });
  } catch (error) {
    console.error(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    return res.json({ data: product });
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).json({ error: "Producto no encontrado" });
    await product.update(req.body);
    await product.save();
    res.json({ data: product });
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).json({ error: "Producto no encontrado" });
    await product.destroy();
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error(error);
  }
};
