import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";
import http from "node:http";

vi.mock("../database/index.js", () => ({
    Settings: {
        findOne: vi.fn(),
        create: vi.fn(),
    },
    Category: {},
    Transaction: {},
    User: {},
}));

const { Settings } = await import("../database/index.js");
const { default: settingsRouter } = await import("./settingsRouter.js");

const app = express();
app.use(express.json());
app.use("/", settingsRouter);

const server = await new Promise((resolve) => {
    const s = http.createServer(app);
    s.listen(0, () => resolve(s));
});

const baseUrl = `http://localhost:${server.address().port}`;

describe("GET /:userId", () => {
    beforeEach(() => vi.clearAllMocks());

    it("returns settings for a user", async () => {
        const mockSettings = { id: 1, userId: 1, theme: "Light", language: "en" };
        Settings.findOne.mockResolvedValue(mockSettings);

        const res = await fetch(`${baseUrl}/1`);
        expect(res.status).toBe(200);
        expect(await res.json()).toEqual(mockSettings);
    });

    it("returns 404 when settings are not found", async () => {
        Settings.findOne.mockResolvedValue(null);

        const res = await fetch(`${baseUrl}/99`);
        expect(res.status).toBe(404);
    });

    it("returns 500 on database error", async () => {
        Settings.findOne.mockRejectedValue(new Error("DB error"));

        const res = await fetch(`${baseUrl}/1`);
        expect(res.status).toBe(500);
    });
});

describe("POST /", () => {
    beforeEach(() => vi.clearAllMocks());

    it("creates settings and returns 201", async () => {
        const newSettings = { id: 1, userId: 1, theme: "Dark" };
        Settings.create.mockResolvedValue(newSettings);

        const res = await fetch(`${baseUrl}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: 1, theme: "Dark" }),
        });

        expect(res.status).toBe(201);
        expect(await res.json()).toEqual(newSettings);
    });

    it("returns 400 on validation error", async () => {
        Settings.create.mockRejectedValue(new Error("Validation error"));

        const res = await fetch(`${baseUrl}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });

        expect(res.status).toBe(400);
    });
});

describe("PUT /update/:userId", () => {
    beforeEach(() => vi.clearAllMocks());

    it("updates settings and returns them", async () => {
        const mockSettings = { id: 1, userId: 1, theme: "Light", update: vi.fn().mockResolvedValue(true) };
        Settings.findOne.mockResolvedValue(mockSettings);

        const res = await fetch(`${baseUrl}/update/1`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ theme: "Dark" }),
        });

        expect(res.status).toBe(200);
        expect(mockSettings.update).toHaveBeenCalledWith({ theme: "Dark" });
    });

    it("returns 404 when settings not found", async () => {
        Settings.findOne.mockResolvedValue(null);

        const res = await fetch(`${baseUrl}/update/99`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ theme: "Dark" }),
        });

        expect(res.status).toBe(404);
    });
});

describe("DELETE /delete/:userId", () => {
    beforeEach(() => vi.clearAllMocks());

    it("deletes settings and returns success message", async () => {
        const mockSettings = { id: 1, destroy: vi.fn().mockResolvedValue(true) };
        Settings.findOne.mockResolvedValue(mockSettings);

        const res = await fetch(`${baseUrl}/delete/1`, { method: "DELETE" });

        expect(res.status).toBe(200);
        expect(mockSettings.destroy).toHaveBeenCalled();
    });

    it("returns 404 when settings not found", async () => {
        Settings.findOne.mockResolvedValue(null);

        const res = await fetch(`${baseUrl}/delete/99`, { method: "DELETE" });

        expect(res.status).toBe(404);
    });
});
