import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";
import http from "node:http";

vi.mock("../database/entities/income.model.js", () => ({
    Income: {
        findAll: vi.fn(),
        findByPk: vi.fn(),
        create: vi.fn(),
    },
}));

vi.mock("../database/db.js", () => ({
    sequelize: {},
}));

const { Income } = await import("../database/entities/income.model.js");
const { default: incomeRouter } = await import("./incomeRouter.js");

const app = express();
app.use(express.json());
app.use("/", incomeRouter);

const server = await new Promise((resolve) => {
    const s = http.createServer(app);
    s.listen(0, () => resolve(s));
});

const baseUrl = `http://localhost:${server.address().port}`;

describe("GET /", () => {
    beforeEach(() => vi.clearAllMocks());

    it("returns all incomes with status 200", async () => {
        const mockIncomes = [{ id: 1, amount: 5000, source: "Salary", category: "Card" }];
        Income.findAll.mockResolvedValue(mockIncomes);

        const res = await fetch(`${baseUrl}/`);
        expect(res.status).toBe(200);
        expect(await res.json()).toEqual(mockIncomes);
    });

    it("returns 500 on database error", async () => {
        Income.findAll.mockRejectedValue(new Error("DB error"));

        const res = await fetch(`${baseUrl}/`);
        expect(res.status).toBe(500);
    });
});

describe("POST /", () => {
    beforeEach(() => vi.clearAllMocks());

    it("creates an income and returns 201", async () => {
        const newIncome = { id: 2, amount: 1000, source: "Gift", category: "Cash" };
        Income.create.mockResolvedValue(newIncome);

        const res = await fetch(`${baseUrl}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 1000, source: "Gift", category: "Cash" }),
        });

        expect(res.status).toBe(201);
        expect(await res.json()).toEqual(newIncome);
    });

    it("returns 400 on validation error", async () => {
        Income.create.mockRejectedValue(new Error("Validation error"));

        const res = await fetch(`${baseUrl}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });

        expect(res.status).toBe(400);
    });
});

describe("PUT /update/:id", () => {
    beforeEach(() => vi.clearAllMocks());

    it("updates an income and returns it", async () => {
        const mockIncome = { id: 1, amount: 5000, update: vi.fn().mockResolvedValue(true) };
        Income.findByPk.mockResolvedValue(mockIncome);

        const res = await fetch(`${baseUrl}/update/1`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 6000 }),
        });

        expect(res.status).toBe(200);
        expect(mockIncome.update).toHaveBeenCalledWith({ amount: 6000 });
    });

    it("returns 404 when income does not exist", async () => {
        Income.findByPk.mockResolvedValue(null);

        const res = await fetch(`${baseUrl}/update/99`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 100 }),
        });

        expect(res.status).toBe(404);
    });
});

describe("DELETE /delete/:id", () => {
    beforeEach(() => vi.clearAllMocks());

    it("deletes an income and returns success message", async () => {
        const mockIncome = { id: 1, destroy: vi.fn().mockResolvedValue(true) };
        Income.findByPk.mockResolvedValue(mockIncome);

        const res = await fetch(`${baseUrl}/delete/1`, { method: "DELETE" });

        expect(res.status).toBe(200);
        expect(mockIncome.destroy).toHaveBeenCalled();
    });

    it("returns 404 when income does not exist", async () => {
        Income.findByPk.mockResolvedValue(null);

        const res = await fetch(`${baseUrl}/delete/99`, { method: "DELETE" });

        expect(res.status).toBe(404);
    });
});
