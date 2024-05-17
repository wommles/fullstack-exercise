import { Router, Request, Response } from "express"
import {  Transaction } from "../../web/src/types"
import { readTransactionsFromDB } from "../helpers/transactionHelper"

const router = Router()

router.get("/", async (_req: Request, res: Response) => {
  try {
    const transactions: Transaction[] = await readTransactionsFromDB()
    res.json(transactions)
  } catch (error) {
    console.error("Error fetching transactions:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})




export default router
