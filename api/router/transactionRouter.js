import { Router } from "express";
import { Transaction, Category } from "../database/index.js";
import { sequelize } from "../database/db.js";

const router = Router();

//get transactions
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

// create transaction
router.post("/", async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);

        const transactionWithCategory = await Transaction.findByPk(transaction.id, {
            include: [Category],
        });

        res.status(201).json(transactionWithCategory);
    } catch (err) {
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

        res.json({ message: "Transaction deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export default router