import { Router } from "express";
import { Transfer } from "../database/entities/transfer.model.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const transfers = await Transfer.findAll();
        res.json(transfers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const transfer = await Transfer.create(req.body);
        res.status(201).json(transfer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const transfer = await Transfer.findByPk(req.params.id);
        if (!transfer) return res.status(404).json({ error: "Nu există" });
        await transfer.update(req.body);
        res.json(transfer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const transfer = await Transfer.findByPk(req.params.id);
        if (!transfer) return res.status(404).json({ error: "Nu există" });
        await transfer.destroy();
        res.json({ message: "Transfer șters" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;