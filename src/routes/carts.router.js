import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const manager = new CartManager("./src/data/carts.json");

router.post("/", async (req, res) => {
  const newCart = await manager.createCart();
  res.status(201).json(newCart);
});

router.get("/:cid", async (req, res) => {
  const cart = await manager.getCartById(parseInt(req.params.cid));
  cart ? res.json(cart.products) : res.status(404).send("Not found");
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cart = await manager.addProductToCart(
      parseInt(req.params.cid),
      parseInt(req.params.pid)
    );
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;