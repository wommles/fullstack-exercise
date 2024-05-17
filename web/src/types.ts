

export type Transaction = {
    id: string
    dates : TransactionDate
    types: TransacitonType[]
    amount: Currency
    status: string //'BOOKED' | 
    accountId : string
    description: string
    bookedDateTime : Date
    merchantInformation : unknown
    provider? : Provider
}


export type Currency = {
    value: number
    currencyCode: string
}

export type TransacitonType = {
    type : string
}

export type ProviderTransactionHistory = { 
    provider  : Provider
    transactions : Transaction[]
    totalSpend : Currency
    averageSpend : Currency
    startDate : Date
    endDate : Date
}

export type Provider = {
    name : string
    logo : string
    transactionSearchQuery : string
}

export type TransactionDate = {
    value: Date
    booked: Date
}