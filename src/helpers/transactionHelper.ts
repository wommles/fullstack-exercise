import {  Provider, Transaction } from "../../web/src/types"
import * as fs from "fs"
import path from "path"

export function readTransactionsFromDB(): Promise<Transaction[]> {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, "/../../data/transactions.json")
        fs.readFile( filePath, "utf8", async (err, data) => {
            if (err) {
          reject(err)
          return
        }
        try {
          let transactions: Transaction[] = JSON.parse(data)
          transactions = await linkTransactionsToProvider(transactions)
          resolve(transactions)
        } catch (error) {
          reject(error)
        }
      })
    })
  }
  
  //Returns transactions with descriptions matching provider's search query
  export function readFilteredTransactionsFromDB(providerSearchQuery : string): Promise<Transaction[]> {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, "/../../data/transactions.json")
      fs.readFile( filePath, "utf8", (err, data) => {
        if (err) {
          reject(err)
          return
        }
        try {
          const transactions: Transaction[] = JSON.parse(data)
          const filteredTransactions = transactions.filter(t => t.description.toLocaleLowerCase().includes(providerSearchQuery.toLocaleLowerCase()))
          resolve(filteredTransactions)
        } catch (error) {
          reject(error)
        }
      })
    })
  }


  
  export function linkTransactionsToProvider(transactions: Transaction[]): Promise<Transaction[]> {
      return new Promise((resolve, reject) => {
          const providersFilePath = path.join(__dirname, "/../../data/providers.json")
          fs.readFile(providersFilePath, "utf8", (err, providersData) => {
              if (err) {
                  reject(err)
                  return
              }
              try {
                  const providers: Provider[] = JSON.parse(providersData)
                  const updatedTransactions: Transaction[] = []
  
                  transactions.forEach(transaction => {
                      const matchingProviders: Provider[] = providers.filter(provider =>
                          transaction.description.toLowerCase().includes(provider.transactionSearchQuery.toLowerCase())
                      )
                      if (matchingProviders.length === 1) {
                          const updatedTransaction: Transaction = { ...transaction, provider: matchingProviders[0] }
                          updatedTransactions.push(updatedTransaction)
                      }
                  })
  
                  resolve(updatedTransactions)
              } catch (error) {
                  reject(error)
              }
          })
      })
  }
  
  