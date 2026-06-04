import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";
import http from "node:http";

vi.mock("../database/index.js", () => ({
    Category: {
        findAll: vi.fn(),
        findByPk: vi.fn(),
        create: vi.fn(),
    },
    Transaction: {},
    User: {},
    Settings: {},
}));

const { Category } = await import("../database/index.js");
const { default: categoryRouter } = await import("./categoryRouter.js");

const app = express();
app.use(express.json());
app.use("/", categoryRouter);

const server = await new Promise((resolve) => {
    const s = http.createServer(app);
    s.listen(0, () => resolve(s));
});

const baseUrl = `http://localhost:${server.address().port}`;

describe("GET /", () => {
    beforeEach(() => vi.clearAllMocks());

    it("returns all categories with status 200", async () => {
        const mockCategories = [{ id: 1, name: "Food" }, { id: 2, name: "Transport" }];
        Category.findAll.mockResolvedValue(mockCategories);

        const res = await fetch(`${baseUrl}/`);
        expect(res.status).toBe(200);
        expect(await res.json()).toEqual(mockCategories);
    });

    it("returns 500 on database error", async () => {
        Category.findAll.mockRejectedValue(new Error("DB error"));

        const res = await fetch(`${baseUrl}/`);
        expect(res.status).toBe(500);
    });
});

describe("POST /", () => {
    beforeEach(() => vi.clearAllMocks());

    it("creates a category and returns 201", async () => {
        const newCategory = { id: 3, name: "Health" };
        Category.create.mockResolvedValue(newCategory);

        const res = await fetch(`${baseUrl}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Health" }),
        });

        expect(res.status).toBe(201);
        expect(await res.json()).toEqual(newCategory);
    });

    it("returns 400 on validation error", async () => {
        Category.create.mockRejectedValue(new Error("Validation error"));

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

    it("updates a category and returns it", async () => {
        const mockCategory = { id: 1, name: "Food", update: vi.fn().mockResolvedValue(true) };
        Category.findByPk.mockResolvedValue(mockCategory);

        const res = await fetch(`${baseUrl}/update/1`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Groceries" }),
        });

        expect(res.status).toBe(200);
        expect(mockCategory.update).toHaveBeenCalledWith({ name: "Groceries" });
    });

    it("returns 404 when category does not exist", async () => {
        Category.findByPk.mockResolvedValue(null);

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

    it("deletes a category and returns success message", async () => {
        const mockCategory = { id: 1, destroy: vi.fn().mockResolvedValue(true) };
        Category.findByPk.mockResolvedValue(mockCategory);

        const res = await fetch(`${baseUrl}/delete/1`, { method: "DELETE" });

        expect(res.status).toBe(200);
        expect(mockCategory.destroy).toHaveBeenCalled();
    });

    it("returns 404 when category does not exist", async () => {
        Category.findByPk.mockResolvedValue(null);

        const res = await fetch(`${baseUrl}/delete/99`, { method: "DELETE" });

        expect(res.status).toBe(404);
    });
});
