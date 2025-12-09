import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();
const pm = new ProductManager(`${__dirname}/../data/products.json`);

router.get("/", async (req, res) => {
  const products = await pm.getProducts();
  res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await pm.getProducts();
  res.render("realTimeProducts", { products });
});

export default router;
