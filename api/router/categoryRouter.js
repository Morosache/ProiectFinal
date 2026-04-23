import { Router } from "express";
import { Category } from "../database/index.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post("/", async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ error: "Categorie negasita" });
        await category.update(req.body);
        res.json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ error: "Categorie negasita" });
        await category.destroy();
        res.json({ message: "Categorie stearsa" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router