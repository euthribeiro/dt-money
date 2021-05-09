import { createContext, ReactChild, useContext, useEffect, useState } from 'react'
import { api } from '../services';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;
//type TransactionInput = Pick<Transaction, 'amount' | 'type' | 'category' | 'title'>;

interface TransactionProviderProps {
    children: ReactChild;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transaction')
            .then((response) => setTransactions(response.data.transactions));
    }, []);

    async function createTransaction(request: TransactionInput) {

        const response = await api.post('transaction', request);

        const { transactions: transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction
        ]);
    }


    return (
        <TransactionsContext.Provider value={{
            createTransaction,
            transactions
        }}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}