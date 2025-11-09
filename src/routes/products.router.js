import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const manager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
  const products = await manager.getProducts();
  res.json(products);
});

router.get("/:pid", async (req, res) => {
  const product = await manager.getProductById(parseInt(req.params.pid));
  product ? res.json(product) : res.status(404).send("Not found");
});

router.post("/", async (req, res) => {
  try {
    const newProduct = await manager.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const updated = await manager.updateProduct(parseInt(req.params.pid), req.body);
    res.json(updated);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  await manager.deleteProduct(parseInt(req.params.pid));
  res.send("Producto eliminado");
});

export default router;