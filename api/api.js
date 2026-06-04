import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import "./websocket/ws-server.js";

import authRouter from "./router/authRouter.js";
import transactionRouter from "./router/transactionRouter.js";
import categoryRouter from "./router/categoryRouter.js";
import incomeRouter from "./router/incomeRouter.js";
import transfersRouter from "./router/transfersRouter.js";
import settingsRouter from "./router/settingsRouter.js";
import authMiddleware from "./middleware/authMiddleware.js";

const api = express();
const port = 3000;

api.use(bodyParser.json());
api.use(
    cors({
        origin: true,
        credentials: true,
    })
);

api.use("/auth", authRouter);
api.use("/transactions", authMiddleware, transactionRouter);
api.use("/categories", authMiddleware, categoryRouter);
api.use("/incomes", authMiddleware, incomeRouter);
api.use("/transfers", authMiddleware, transfersRouter);
api.use("/settings", authMiddleware, settingsRouter);

api.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
