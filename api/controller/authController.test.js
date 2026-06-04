import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../database/entities/user.model.js", () => ({
    User: {
        findOne: vi.fn(),
        findByPk: vi.fn(),
    },
}));

vi.mock("bcryptjs", () => ({
    default: {
        compare: vi.fn(),
        hash: vi.fn(),
    },
}));

vi.mock("jsonwebtoken", () => ({
    default: {
        sign: vi.fn().mockReturnValue("mock-token"),
        verify: vi.fn(),
    },
}));

const { User } = await import("../database/entities/user.model.js");
const bcrypt = (await import("bcryptjs")).default;
const jwt = (await import("jsonwebtoken")).default;
const { authController, refreshController } = await import("./authController.js");

describe("authController", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        jwt.sign.mockReturnValue("mock-token");
    });

    it("returns error when username is missing", async () => {
        const result = await authController("", "password");
        expect(result).toEqual({ success: false, message: "Username and password are required" });
    });

    it("returns error when password is missing", async () => {
        const result = await authController("admin", "");
        expect(result).toEqual({ success: false, message: "Username and password are required" });
    });

    it("returns error when user is not found", async () => {
        User.findOne.mockResolvedValue(null);
        const result = await authController("unknown", "pass");
        expect(result).toEqual({ success: false, message: "Invalid credentials" });
    });

    it("returns error when password is wrong", async () => {
        User.findOne.mockResolvedValue({ dataValues: { id: 1, username: "admin", password: "hashed" } });
        bcrypt.compare.mockResolvedValue(false);

        const result = await authController("admin", "wrongpass");
        expect(result).toEqual({ success: false, message: "Invalid credentials" });
    });

    it("returns token and refreshToken on valid credentials", async () => {
        User.findOne.mockResolvedValue({ dataValues: { id: 1, username: "admin", password: "hashed" } });
        bcrypt.compare.mockResolvedValue(true);

        const result = await authController("admin", "admin123");

        expect(result.success).toBe(true);
        expect(result.token).toBe("mock-token");
        expect(result.refreshToken).toBe("mock-token");
    });
});

describe("refreshController", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        jwt.sign.mockReturnValue("new-mock-token");
    });

    it("returns error when refreshToken is missing", async () => {
        const result = await refreshController(null);
        expect(result).toEqual({ success: false, message: "Refresh token is required" });
    });

    it("returns error when token type is not refresh", async () => {
        jwt.verify.mockReturnValue({ id: 1, type: "access" });
        const result = await refreshController("bad-token");
        expect(result).toEqual({ success: false, message: "Invalid refresh token" });
    });

    it("returns error when user is not found", async () => {
        jwt.verify.mockReturnValue({ id: 99, type: "refresh" });
        User.findByPk.mockResolvedValue(null);

        const result = await refreshController("valid-token");
        expect(result).toEqual({ success: false, message: "Invalid refresh token" });
    });

    it("returns new tokens on valid refresh token", async () => {
        jwt.verify.mockReturnValue({ id: 1, type: "refresh" });
        User.findByPk.mockResolvedValue({ dataValues: { id: 1, username: "admin" } });

        const result = await refreshController("valid-refresh-token");

        expect(result.success).toBe(true);
        expect(result.token).toBe("new-mock-token");
        expect(result.refreshToken).toBe("new-mock-token");
    });

    it("returns error when jwt.verify throws", async () => {
        jwt.verify.mockImplementation(() => { throw new Error("expired"); });
        const result = await refreshController("expired-token");
        expect(result).toEqual({ success: false, message: "Invalid refresh token" });
    });
});
