import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";
import http from "node:http";

vi.mock("../controller/authController.js", () => ({
    authController: vi.fn(),
    refreshController: vi.fn(),
}));

const { authController, refreshController } = await import("../controller/authController.js");
const { default: authRouter } = await import("./authRouter.js");

const app = express();
app.use(express.json());
app.use("/", authRouter);

const server = await new Promise((resolve) => {
    const s = http.createServer(app);
    s.listen(0, () => resolve(s));
});

const baseUrl = `http://localhost:${server.address().port}`;

describe("POST /login", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns success response on valid credentials", async () => {
        authController.mockResolvedValue({
            success: true,
            token: "acc-tok",
            refreshToken: "ref-tok",
        });

        const res = await fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: "admin", password: "admin123" }),
        });

        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.success).toBe(true);
        expect(body.token).toBe("acc-tok");
    });

    it("returns failure message on wrong credentials", async () => {
        authController.mockResolvedValue({ success: false, message: "Invalid credentials" });

        const res = await fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: "admin", password: "wrong" }),
        });

        const body = await res.json();
        expect(body.success).toBe(false);
        expect(body.message).toBe("Invalid credentials");
    });

    it("returns 500 when authController throws", async () => {
        authController.mockRejectedValue(new Error("DB error"));

        const res = await fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: "admin", password: "admin123" }),
        });

        expect(res.status).toBe(500);
    });
});

describe("POST /refresh", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns 200 with new tokens on valid refresh token", async () => {
        refreshController.mockResolvedValue({
            success: true,
            token: "new-tok",
            refreshToken: "new-ref",
        });

        const res = await fetch(`${baseUrl}/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: "valid-ref" }),
        });

        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.success).toBe(true);
    });

    it("returns 401 on invalid refresh token", async () => {
        refreshController.mockResolvedValue({ success: false, message: "Invalid refresh token" });

        const res = await fetch(`${baseUrl}/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: "bad-ref" }),
        });

        expect(res.status).toBe(401);
    });
});
