import express, { Request, Response } from "express";
import transactionRoutes from "./routes/transactions";
import providerRoutes from "./routes/providers";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello, welcome to the Nous spending report!");
});

app.use(express.json());
app.use("/transactions", transactionRoutes);
app.use("/providers", providerRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
