import { Currency, Provider, Transaction } from "../../web/src/types"
import * as fs from "fs"
import path from "path"


//Returns transactions with descriptions matching string
export function fetchProviderByDescription(name : string): Promise<Provider> {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, "/../../data/providers.json")
    fs.readFile( filePath, "utf8", async (err, data) => {      if (err) {
        reject(err)
        return
      }
      try {
        const providers: Provider[] = JSON.parse(data)
        const filteredProviders = providers.filter(p =>  name.toLowerCase().includes(p.transactionSearchQuery.toLocaleLowerCase()))
        if(filteredProviders.length > 1){
          reject('Too many matches')
          return
        }
        if(filteredProviders.length === 0){
          reject('No match found')
          return
        }
        resolve(filteredProviders[0])
      } catch (error) {
        reject(error)
      }
    })
  })
}


//TODO REFACTOR THIS TO HANDLE MULTIPLE CURRENCIES
export function calculateSpend(transactions: Transaction[]): { totalSpend: Currency; averageSpend: Currency } {
  if (transactions.length === 0) {
      throw new Error("No transactions found.")
  }

  const currencyCode = transactions[0].amount.currencyCode // Assuming all transactions have the same currency

  let totalSpend: Currency
  let currencyTotal: number = 0

  transactions.forEach(transaction => {
      currencyTotal += Number(transaction.amount.value)
  })

  totalSpend = ({ currencyCode: currencyCode, value: Number(currencyTotal.toPrecision(2)) })
  const avgValue = Number((currencyTotal / transactions.length).toPrecision(2))
  const averageSpend: Currency = { currencyCode: currencyCode, value: avgValue }

  return { totalSpend, averageSpend }
}


  export function calculateStartEndDates(transactions: Transaction[]): { startDate: Date, endDate: Date } {
    if (transactions.length === 0) {
      throw new Error("No transactions found.")
    }
  
    let startDate: Date = transactions[0].bookedDateTime
    let endDate: Date = transactions[0].bookedDateTime
  
    transactions.forEach(transaction => {
      if (transaction.bookedDateTime < startDate) {
        startDate = transaction.bookedDateTime
      }
  
      if (transaction.bookedDateTime > endDate) {
        endDate = transaction.bookedDateTime
      }
    })
  
    return { startDate, endDate }
  }
  