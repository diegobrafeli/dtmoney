import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { api } from '../services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

// interface TransactionInput{
//     title: string;
//     amount: number;
//     type: string;
//     category: string;
// }

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;

//interface para qualquer arquivo aceito pelo react
interface TransactionProviderProps{
    children: ReactNode;
}

interface TransactionsContextData{
    transactions: Transaction[];
    //retorna promise pois a função é assincrona
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData //arrumadinho pra tirar o erro quando usar objeto vazio
);
//children é o conteudo dentro da função TransactionsProveider que vai ser
//repassado para TransactionContext.Provider
export function TransactionsProvider({children}: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(()=>{
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions));
    },[]);

    //toda função assincrona retorna uma promise
    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions',{
            ...transactionInput,
            createdAt: new Date(),
        });
        const {transaction} = response.data;

        setTransactions([
            ...transactions,
            transaction,
        ]);
    }

    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

//só para ficar mais arrumado o codigo
export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}