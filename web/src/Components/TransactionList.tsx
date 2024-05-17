import { useEffect, useState } from "react";
import { Currency, ProviderTransactionHistory, Transaction } from "../types";
import axios from "axios";
import "./TransactionList.css";

const TRANSACTIONS_PER_PAGE = 40;

export const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTransaction, setActiveTransaction] = useState<string>("");
  const [startTransactionIndex, setStartTransactionIndex] = useState(0);

  useEffect(() => {
    const onLoad = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/transactions`);
        const t: Transaction[] = res.data;
        setTransactions(t);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    onLoad();
  }, []);

  const leftPaginationClick = () => {
    if (startTransactionIndex >= TRANSACTIONS_PER_PAGE) {
      setStartTransactionIndex(startTransactionIndex - TRANSACTIONS_PER_PAGE);
    }
  };
  const rightPaginationClick = () => {
    if (startTransactionIndex < transactions.length) {
      setStartTransactionIndex(startTransactionIndex + TRANSACTIONS_PER_PAGE);
    }
  };

  return (
    <div className="transaction-list">
      <h2> Your recent transactions</h2>
      <Pagination
        onLeftClick={leftPaginationClick}
        onRightClick={rightPaginationClick}
        startTransactionIndex={startTransactionIndex}
        totalCount={transactions.length}
      />
      {transactions.length > 0 ? (
        <>
          {transactions
            .slice(
              startTransactionIndex,
              startTransactionIndex + TRANSACTIONS_PER_PAGE
            )
            .map((t) => (
              <TransactionRow
                key={t.id}
                transaction={t}
                isActive={activeTransaction === t.id}
                onClick={() => setActiveTransaction(t.id)}
              />
            ))}
        </>
      ) : (
        <p>Transactions loading...</p>
      )}
    </div>
  );
};

const TransactionRow = ({
  transaction,
  isActive,
  onClick,
}: {
  transaction: Transaction;
  isActive: boolean;
  onClick: () => void;
}) => {
  const [providerHistory, setProviderHistory] =
    useState<ProviderTransactionHistory | null>(null);

  const getTransactionsForProvider = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/providers/transactions/${transaction.provider?.name}`
      );
      setProviderHistory(res.data);
    } catch (error) {
      console.error("Error fetching provider history:", error);
    }
  };

  return (
    <div
      className={`transaction-row ${isActive ? "active" : ""}`}
      onClick={() => {
        getTransactionsForProvider();
        onClick();
      }}
    >
      <div className="transaction-overview">
        {transaction.provider && (
          <>
            <img
              className="provider-img"
              src={transaction.provider.logo}
              alt={transaction.provider.name}
            />
            <h3>{transaction.provider?.name}</h3>
          </>
        )}
        <MultipleCurrencyDisplay currencies={[transaction.amount]} />
        <DateDisplay d={new Date(transaction.bookedDateTime)} />
      </div>
      {isActive && providerHistory && (
        <ProviderHistoryDisplay providerHistory={providerHistory} />
      )}
    </div>
  );
};

const ProviderHistoryDisplay = ({
  providerHistory,
}: {
  providerHistory: ProviderTransactionHistory;
}) => {
  return (
    <div className="transaction-detail">
      <div>
        You have {providerHistory.transactions.length} transactions
        {/* 
        TODO Truncate when too many transactions are listed
        {providerHistory.transactions.map((t) => (
          <div key={t.id}>
            <MultipleCurrencyDisplay currencies={[t.amount]} />
          </div>
        ))} */}
      </div>
      <div>
        Total spend: {"  "}
        <MultipleCurrencyDisplay currencies={[providerHistory.totalSpend]} />
      </div>
      <div>
        You usually spend: {"  "}
        <MultipleCurrencyDisplay currencies={[providerHistory.averageSpend]} />
      </div>
      <div>
        You've transacted between: {"  "}
        <DateDisplay d={new Date(providerHistory.startDate)} /> {"    "}&{"  "}
        <DateDisplay d={new Date(providerHistory.endDate)} />
      </div>
    </div>
  );
};

const Pagination = ({
  onLeftClick,
  onRightClick,
  startTransactionIndex,
  totalCount,
}: {
  onLeftClick: () => void;
  onRightClick: () => void;
  startTransactionIndex: number;
  totalCount: number;
}) => {
  return (
    <div className="pagination">
      <div className="arrow" onClick={onLeftClick}>
        {"<<<"}
      </div>
      <p>
        {" "}
        Showing {startTransactionIndex + 1}-
        {startTransactionIndex + TRANSACTIONS_PER_PAGE} of {totalCount}
      </p>
      <div className="arrow" onClick={onRightClick}>
        {">>>"}
      </div>
    </div>
  );
};

const MultipleCurrencyDisplay = ({
  currencies,
}: {
  currencies: Currency[];
}) => {
  return (
    <>
      {currencies.map(
        (currencyType) =>
          currencyType.value > 0 && (
            <div className="currency-display" key={currencyType.currencyCode}>
              {currencyType.value} - {currencyType.currencyCode}
            </div>
          )
      )}
    </>
  );
};

const DateDisplay = ({ d }: { d: Date }) => {
  return (
    <div>
      {d.getDate()}/{d.getMonth() + 1}/{d.getFullYear()}
    </div>
  );
};
