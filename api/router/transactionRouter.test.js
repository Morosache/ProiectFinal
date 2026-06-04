import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";
import http from "node:http";

vi.mock("../database/index.js", () => ({
    Transaction: {
        findAll: vi.fn(),
        findByPk: vi.fn(),
        create: vi.fn(),
    },
    Category: {},
}));

vi.mock("../database/db.js", () => ({
    sequelize: {
        transaction: vi.fn(),
    },
}));

vi.mock("../websocket/ws-server.js", () => ({
    broadcast: vi.fn(),
}));

const { Transaction } = await import("../database/index.js");
const { sequelize } = await import("../database/db.js");
const { broadcast } = await import("../websocket/ws-server.js");
const { default: transactionRouter } = await import("./transactionRouter.js");

const app = express();
app.use(express.json());
app.use("/", transactionRouter);

const server = await new Promise((resolve) => {
    const s = http.createServer(app);
    s.listen(0, () => resolve(s));
});

const baseUrl = `http://localhost:${server.address().port}`;

describe("GET /", () => {
    beforeEach(() => vi.clearAllMocks());

    it("returns all transactions with status 200", async () => {
        const mockTransactions = [
            { id: 1, name: "Food", price: 50, Category: { name: "Food" } },
        ];
        Transaction.findAll.mockResolvedValue(mockTransactions);

        const res = await fetch(`${baseUrl}/`);
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body).toEqual(mockTransactions);
    });

    it("returns 500 on database error", async () => {
        Transaction.findAll.mockRejectedValue(new Error("DB error"));

        const res = await fetch(`${baseUrl}/`);
        expect(res.status).toBe(500);
    });
});

describe("POST /", () => {
    beforeEach(() => vi.clearAllMocks());

    it("creates a transaction and returns 201", async () => {
        const mockT = { commit: vi.fn(), rollback: vi.fn() };
        sequelize.transaction.mockResolvedValue(mockT);

        const created = { id: 1, name: "Food", price: 50 };
        Transaction.create.mockResolvedValue(created);

        const withCategory = { ...created, Category: { name: "Food" } };
        Transaction.findByPk.mockResolvedValue(withCategory);

        const res = await fetch(`${baseUrl}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Food", price: 50, date: "2024-01-01", isNeed: "Need", paymentMethod: "Cash", categoryId: 1 }),
        });

        expect(res.status).toBe(201);
        expect(broadcast).toHaveBeenCalledWith({ type: "transaction:created", data: withCategory });
    });

    it("returns 400 on creation error", async () => {
        const mockT = { commit: vi.fn(), rollback: vi.fn() };
        sequelize.transaction.mockResolvedValue(mockT);
        Transaction.create.mockRejectedValue(new Error("Validation error"));

        const res = await fetch(`${baseUrl}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });

        expect(res.status).toBe(400);
        expect(mockT.rollback).toHaveBeenCalled();
    });
});

describe("PUT /update/:id", () => {
    beforeEach(() => vi.clearAllMocks());

    it("updates a transaction and returns it", async () => {
        const mockTransaction = { id: 1, name: "Old", update: vi.fn() };
        Transaction.findByPk
            .mockResolvedValueOnce(mockTransaction)
            .mockResolvedValueOnce({ id: 1, name: "Updated", Category: {} });

        const res = await fetch(`${baseUrl}/update/1`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Updated" }),
        });

        expect(res.status).toBe(200);
        expect(mockTransaction.update).toHaveBeenCalledWith({ name: "Updated" });
    });

    it("returns 404 when transaction does not exist", async () => {
        Transaction.findByPk.mockResolvedValue(null);

        const res = await fetch(`${baseUrl}/update/99`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "X" }),
        });

        expect(res.status).toBe(404);
    });
});

describe("DELETE /delete/:id", () => {
    beforeEach(() => vi.clearAllMocks());

    it("deletes a transaction and broadcasts the event", async () => {
        const mockTransaction = { id: 1, destroy: vi.fn() };
        Transaction.findByPk.mockResolvedValue(mockTransaction);

        const res = await fetch(`${baseUrl}/delete/1`, { method: "DELETE" });

        expect(res.status).toBe(200);
        expect(mockTransaction.destroy).toHaveBeenCalled();
        expect(broadcast).toHaveBeenCalledWith({ type: "transaction:deleted", data: { id: 1 } });
    });

    it("returns 404 when transaction does not exist", async () => {
        Transaction.findByPk.mockResolvedValue(null);

        const res = await fetch(`${baseUrl}/delete/99`, { method: "DELETE" });

        expect(res.status).toBe(404);
    });
});
