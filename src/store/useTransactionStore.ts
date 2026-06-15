import { create } from 'zustand';
import { Category } from '../components/CategorySelector';

export interface Transaction {
    id: string;
    title: string;
    amount: number;
    type: 'income' | 'expense';
    date: string;
    time: string;
    icon: string;
    category: Category | null;
}

interface TransactionStore {
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, 'id' | 'time'>) => void;
    updateTransaction: (id: string, updates: Partial<Transaction>) => void;
    deleteTransaction: (id: string) => void;
    getTotalBalance: () => number;
    getTotalIncome: () => number;
    getTotalExpense: () => number;
    getTransactionsByType: (type: 'all' | 'income' | 'expense') => Transaction[];
    getGroupedTransactions: () => Record<string, Transaction[]>;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
    transactions: [
        {
            id: '1',
            title: 'Upwork',
            amount: 850.00,
            type: 'income',
            date: new Date().toDateString(),
            time: '10:30 AM',
            icon: '💼',
            category: { id: '1', name: 'Freelance', icon: '💼', color: '#FF6B6B' },
        },
        {
            id: '2',
            title: 'Transfer',
            amount: 85.00,
            type: 'expense',
            date: new Date(Date.now() - 1 * 86400000).toDateString(),
            time: '2:15 PM',
            icon: '🔄',
            category: { id: '3', name: 'Transport', icon: '🚗', color: '#45B7D1' },
        },
        {
            id: '3',
            title: 'Paypal',
            amount: 1406.00,
            type: 'income',
            date: new Date(Date.now() - 2 * 86400000).toDateString(),
            time: '9:00 AM',
            icon: '💰',
            category: { id: '2', name: 'Shopping', icon: '🛒', color: '#4ECDC4' },
        },
        {
            id: '4',
            title: 'Youtube',
            amount: 11.99,
            type: 'expense',
            date: new Date(Date.now() - 3 * 86400000).toDateString(),
            time: '5:45 PM',
            icon: '▶️',
            category: { id: '4', name: 'Entertainment', icon: '🎬', color: '#96CEB4' },
        },
    ],

    addTransaction: (transaction) => {
        const now = new Date();
        const newTransaction: Transaction = {
            ...transaction,
            id: Date.now().toString(),
            time: now.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            }),
        };
        set((state) => ({
            transactions: [newTransaction, ...state.transactions],
        }));
    },

    updateTransaction: (id, updates) => { // 👈 Add this
        set((state) => ({
            transactions: state.transactions.map((t) =>
                t.id === id ? { ...t, ...updates } : t
            ),
        }));
    },

    deleteTransaction: (id) => {
        set((state) => ({
            transactions: state.transactions.filter((t) => t.id !== id),
        }));
    },

    getTotalBalance: () => {
        const { transactions } = get();
        const income = transactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        return income - expense;
    },

    getTotalIncome: () => {
        return get()
            .transactions.filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
    },

    getTotalExpense: () => {
        return get()
            .transactions.filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
    },

    getTransactionsByType: (type) => {
        const { transactions } = get();
        if (type === 'all') return transactions;
        return transactions.filter((t) => t.type === type);
    },

    getGroupedTransactions: () => {
        const { transactions } = get();
        return transactions.reduce((groups: Record<string, Transaction[]>, transaction) => {
            const date = transaction.date;
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(transaction);
            return groups;
        }, {});
    },
}));