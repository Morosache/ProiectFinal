import { Router } from "express";
import { authController, refreshController } from "../controller/authController.js";

const router = Router();

router.post("/login", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const result = await authController(username, password);
        res.send(result);
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
});

router.post("/refresh", async (req, res) => {
    const result = await refreshController(req.body.refreshToken);
    res.status(result.success ? 200 : 401).send(result);
});

export default router;
