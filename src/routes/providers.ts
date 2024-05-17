import { Router, Request, Response } from "express"
import { Provider, ProviderTransactionHistory, Transaction } from "../../web/src/types"
import { calculateSpend, calculateStartEndDates, fetchProviderByDescription } from "../helpers/providerHelper"
import { readFilteredTransactionsFromDB } from "../helpers/transactionHelper"

const router = Router()

router.get("/transactions/:providerDescription", async (_req: Request, res: Response) => {
  try {
    const provider: Provider = await fetchProviderByDescription(_req.params.providerDescription)
    
    const matchingTransactions: Transaction[] = await readFilteredTransactionsFromDB(provider.transactionSearchQuery)

    const { totalSpend, averageSpend } = calculateSpend(matchingTransactions)

    const { startDate, endDate } = calculateStartEndDates(matchingTransactions)

    const transactionHistory: ProviderTransactionHistory = {
      provider: provider,
      transactions: matchingTransactions,
      totalSpend: totalSpend,
      averageSpend: averageSpend,
      startDate: startDate,
      endDate: endDate
    }

    res.json(transactionHistory)
  } catch (error) {
    console.error("Error fetching transaction history:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

export default router


