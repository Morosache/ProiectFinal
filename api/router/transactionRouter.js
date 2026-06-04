import { Router } from "express";
import { Transaction, Category } from "../database/index.js";
import { sequelize } from "../database/db.js";
import { broadcast } from "../websocket/ws-server.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            include: [Category],
            order: [["date", "DESC"]]
        });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message })
    };
});

router.post("/", async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const transaction = await Transaction.create(req.body, { transaction: t });
        await t.commit();

        const transactionWithCategory = await Transaction.findByPk(transaction.id, {
            include: [Category],
        });

        broadcast({ type: "transaction:created", data: transactionWithCategory });

        res.status(201).json(transactionWithCategory);
    } catch (err) {
        await t.rollback();
        res.status(400).json({ error: err.message });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);

        if (!transaction) return res.status(404).json({ error: "Doesn't exist" });

        await transaction.update(req.body);

        const transactionWithCategory = await Transaction.findByPk(req.params.id, {
            include: [Category]
        });

        res.json(transactionWithCategory);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
});


router.delete("/delete/:id", async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);

        if (!transaction) return res.status(404).json({ error: "Doesn't exist" });

        await transaction.destroy();

        broadcast({ type: "transaction:deleted", data: { id: transaction.id } });

        res.json({ message: "Transaction deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export default router