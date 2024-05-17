"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactions_1 = __importDefault(require("./routes/transactions"));
const providers_1 = __importDefault(require("./routes/providers"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get("/", (_req, res) => {
    res.send("Hello, welcome to the Nous spending report!");
});
app.use(express_1.default.json());
app.use("/transactions", transactions_1.default);
app.use("/providers", providers_1.default);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
