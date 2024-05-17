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
exports.readFilteredTransactionsFromDB = exports.readTransactionsFromDB = void 0;
const fs = __importStar(require("fs"));
function readTransactionsFromDB() {
    return new Promise((resolve, reject) => {
        fs.readFile("../../data/transactions.json", "utf8", (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            try {
                const transactions = JSON.parse(data);
                resolve(transactions);
            }
            catch (error) {
                reject(error);
            }
        });
    });
}
exports.readTransactionsFromDB = readTransactionsFromDB;
//Returns transactions with descriptions matching provider's search query
function readFilteredTransactionsFromDB(providerSearchQuery) {
    return new Promise((resolve, reject) => {
        fs.readFile("../../data/transactions.json", "utf8", (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            try {
                const transactions = JSON.parse(data);
                const filteredTransactions = transactions.filter(t => t.description.toLocaleLowerCase().includes(providerSearchQuery.toLocaleLowerCase()));
                resolve(filteredTransactions);
            }
            catch (error) {
                reject(error);
            }
        });
    });
}
exports.readFilteredTransactionsFromDB = readFilteredTransactionsFromDB;
