"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const providerHelper_1 = require("../helpers/providerHelper");
const transactionHelper_1 = require("../helpers/transactionHelper");
const router = (0, express_1.Router)();
router.get("/provider/:prvoiderDescription", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provider = yield (0, providerHelper_1.fetchProviderByDescription)(_req.params.prvoiderDescription);
        const matchingTransactions = yield (0, transactionHelper_1.readFilteredTransactionsFromDB)(provider.transactionSearchQuery);
        const { totalSpend, averageSpend } = (0, providerHelper_1.calculateSpend)(matchingTransactions);
        const { startDate, endDate } = (0, providerHelper_1.calculateStartEndDates)(matchingTransactions);
        const transactionHistory = {
            provider: provider,
            transactions: matchingTransactions,
            totalSpend: totalSpend,
            averageSpend: averageSpend,
            startDate: startDate,
            endDate: endDate
        };
        res.json(transactionHistory);
    }
    catch (error) {
        console.error("Error fetching transaction history:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.default = router;
