import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";
import http from "node:http";

vi.mock("../database/entities/transfer.model.js", () => ({
    Transfer: {
        findAll: vi.fn(),
        findByPk: vi.fn(),
        create: vi.fn(),
    },
}));

const { Transfer } = await import("../database/entities/transfer.model.js");
const { default: transfersRouter } = await import("./transfersRouter.js");

const app = express();
app.use(express.json());
app.use("/", transfersRouter);

const server = await new Promise((resolve) => {
    const s = http.createServer(app);
    s.listen(0, () => resolve(s));
});

const baseUrl = `http://localhost:${server.address().port}`;

describe("GET /", () => {
    beforeEach(() => vi.clearAllMocks());

    it("returns all transfers with status 200", async () => {
        const mockTransfers = [{ id: 1, amount: 500, source: "Cash", destination: "Card" }];
        Transfer.findAll.mockResolvedValue(mockTransfers);

        const res = await fetch(`${baseUrl}/`);
        expect(res.status).toBe(200);
        expect(await res.json()).toEqual(mockTransfers);
    });

    it("returns 500 on database error", async () => {
        Transfer.findAll.mockRejectedValue(new Error("DB error"));

        const res = await fetch(`${baseUrl}/`);
        expect(res.status).toBe(500);
    });
});

describe("POST /", () => {
    beforeEach(() => vi.clearAllMocks());

    it("creates a transfer and returns 201", async () => {
        const newTransfer = { id: 2, amount: 200, source: "Card", destination: "Economies" };
        Transfer.create.mockResolvedValue(newTransfer);

        const res = await fetch(`${baseUrl}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 200, source: "Card", destination: "Economies" }),
        });

        expect(res.status).toBe(201);
        expect(await res.json()).toEqual(newTransfer);
    });

    it("returns 400 on validation error", async () => {
        Transfer.create.mockRejectedValue(new Error("Validation error"));

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

    it("updates a transfer and returns it", async () => {
        const mockTransfer = { id: 1, amount: 500, update: vi.fn().mockResolvedValue(true) };
        Transfer.findByPk.mockResolvedValue(mockTransfer);

        const res = await fetch(`${baseUrl}/update/1`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 1000 }),
        });

        expect(res.status).toBe(200);
        expect(mockTransfer.update).toHaveBeenCalledWith({ amount: 1000 });
    });

    it("returns 404 when transfer does not exist", async () => {
        Transfer.findByPk.mockResolvedValue(null);

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

    it("deletes a transfer and returns success message", async () => {
        const mockTransfer = { id: 1, destroy: vi.fn().mockResolvedValue(true) };
        Transfer.findByPk.mockResolvedValue(mockTransfer);

        const res = await fetch(`${baseUrl}/delete/1`, { method: "DELETE" });

        expect(res.status).toBe(200);
        expect(mockTransfer.destroy).toHaveBeenCalled();
    });

    it("returns 404 when transfer does not exist", async () => {
        Transfer.findByPk.mockResolvedValue(null);

        const res = await fetch(`${baseUrl}/delete/99`, { method: "DELETE" });

        expect(res.status).toBe(404);
    });
});
