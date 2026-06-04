import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";
import http from "node:http";

vi.mock("jsonwebtoken", () => ({
    default: {
        verify: vi.fn(),
    },
}));

const jwt = (await import("jsonwebtoken")).default;
const { default: authMiddleware } = await import("./authMiddleware.js");

const app = express();
app.use(authMiddleware);
app.get("/protected", (req, res) => res.json({ success: true, user: req.user }));

const server = await new Promise((resolve) => {
    const s = http.createServer(app);
    s.listen(0, () => resolve(s));
});

const baseUrl = `http://localhost:${server.address().port}`;

describe("authMiddleware", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns 401 when no Authorization header is provided", async () => {
        const res = await fetch(`${baseUrl}/protected`);
        expect(res.status).toBe(401);
        const body = await res.json();
        expect(body.success).toBe(false);
    });

    it("returns 401 when Authorization header does not start with Bearer", async () => {
        const res = await fetch(`${baseUrl}/protected`, {
            headers: { Authorization: "Basic sometoken" },
        });
        expect(res.status).toBe(401);
    });

    it("returns 401 when token is invalid", async () => {
        jwt.verify.mockImplementation(() => { throw new Error("invalid"); });

        const res = await fetch(`${baseUrl}/protected`, {
            headers: { Authorization: "Bearer bad-token" },
        });
        expect(res.status).toBe(401);
    });

    it("calls next and sets req.user when token is valid", async () => {
        jwt.verify.mockReturnValue({ id: 1, username: "admin" });

        const res = await fetch(`${baseUrl}/protected`, {
            headers: { Authorization: "Bearer valid-token" },
        });
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.user).toEqual({ id: 1, username: "admin" });
    });
});
