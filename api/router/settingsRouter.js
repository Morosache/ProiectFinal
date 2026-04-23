import { Router } from "express";
import { Settings } from "../database/index.js";

const router = Router();

router.get("/:userId", async (req, res) => {
    try {
        const settings = await Settings.findOne({
            where: { userId: req.params.userId }
        });
        if (!settings) return res.status(404).json({ error: "Settings negasite" });
        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const settings = await Settings.create(req.body);
        res.status(201).json(settings);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put("/update/:userId", async (req, res) => {
    try {
        const settings = await Settings.findOne({
            where: { userId: req.params.userId }
        });
        if (!settings) return res.status(404).json({ error: "Settings negasite" });
        await settings.update(req.body);
        res.json(settings);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/delete/:userId", async (req, res) => {
    try {
        const settings = await Settings.findOne({
            where: { userId: req.params.userId }
        });
        if (!settings) return res.status(404).json({ error: "Settings negasite" });
        await settings.destroy();
        res.json({ message: "Settings sterse" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;