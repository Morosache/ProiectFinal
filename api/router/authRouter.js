import { Router } from "express";

import { authController } from "../controller/authController.js";
const router = Router();

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const result = authController(email, password);
  res.send(result);
});

export default router;