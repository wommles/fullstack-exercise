import express, { Request, Response } from "express";
import transactionRoutes from "./routes/transactions";
import providerRoutes from "./routes/providers";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello, welcome to the Nous spending report!");
});

app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use("/transactions", transactionRoutes);
app.use("/providers", providerRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


var cors = require('cors')

app.use(cors())