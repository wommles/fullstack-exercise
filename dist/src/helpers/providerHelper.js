"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateStartEndDates = exports.calculateSpend = exports.fetchProviderByDescription = void 0;
const fs = __importStar(require("fs"));
//Returns transactions with descriptions matching string
function fetchProviderByDescription(name) {
    return new Promise((resolve, reject) => {
        fs.readFile("../../data/providers.json", "utf8", (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            try {
                const providers = JSON.parse(data);
                const filteredProviders = providers.filter(p => name.toLocaleLowerCase().includes(p.transactionSearchQuery.toLocaleLowerCase()));
                if (filteredProviders.length > 1) {
                    reject('Too many matches');
                    return;
                }
                if (filteredProviders.length === 0) {
                    reject('No match found');
                    return;
                }
                resolve(filteredProviders[0]);
            }
            catch (error) {
                reject(error);
            }
        });
    });
}
exports.fetchProviderByDescription = fetchProviderByDescription;
function calculateSpend(transactions) {
    if (transactions.length === 0) {
        throw new Error("No transactions found.");
    }
    let totalSpend = [];
    let currencyCounts = {};
    transactions.forEach(transaction => {
        const matchingCurrencyIndex = totalSpend.findIndex(ts => ts.currencyCode === transaction.amount.currencyCode);
        //no match found
        if (matchingCurrencyIndex === -1) {
            totalSpend.push(transaction.amount);
            currencyCounts[transaction.amount.currencyCode] = 1;
        }
        else {
            totalSpend[matchingCurrencyIndex].value += transaction.amount.value;
            currencyCounts[transaction.amount.currencyCode]++;
        }
    });
    let averageSpend = totalSpend.map(currency => ({
        currencyCode: currency.currencyCode,
        value: currency.value / (currencyCounts[currency.currencyCode] || 1)
    }));
    return { totalSpend, averageSpend };
}
exports.calculateSpend = calculateSpend;
function calculateStartEndDates(transactions) {
    if (transactions.length === 0) {
        throw new Error("No transactions found.");
    }
    let startDate = transactions[0].dates[0];
    let endDate = transactions[0].dates[0];
    transactions.forEach(transaction => {
        if (transaction.dates[0] < startDate) {
            startDate = transaction.dates[0];
        }
        if (transaction.dates[0] > endDate) {
            endDate = transaction.dates[0];
        }
    });
    return { startDate, endDate };
}
exports.calculateStartEndDates = calculateStartEndDates;
