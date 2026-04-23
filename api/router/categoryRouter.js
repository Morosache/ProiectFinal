import { Router } from "express";
import { Category } from "../database/index.js";

const router = Router();

// GET toate categoriile
router.get("/", async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router