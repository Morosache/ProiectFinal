import { Router } from "express";
import { Income } from "../database/entities/income.model.js";
import { sequelize } from "../database/db.js";

const router = Router();

//get incomes
router.get("/", async (req, res) => {
    try {
        const incomes = await Income.findAll();
        res.json(incomes);
    } catch (err) {
        res.status(500).json({ error: err.message })
    };
});

// create transaction
router.post("/", async (req, res) => {
    try {
        const income = await Income.create(req.body);
        res.status(201).json(income);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const income = await Income.findByPk(req.params.id);

        if (!income) return res.status(404).json({ error: "Doesn't exist" });

        await income.update(req.body);

        res.json(income);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
});


router.delete("/delete/:id", async (req, res) => {
    try {
        const income = await Income.findByPk(req.params.id);

        if (!income) return res.status(404).json({ error: "Doesn't exist" });

        await income.destroy();

        res.json({ message: "Income deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export default router