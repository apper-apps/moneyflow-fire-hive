import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatCard from '@/components/molecules/StatCard';
import TransactionItem from '@/components/molecules/TransactionItem';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { transactionService } from '@/services/api/transactionService';
import { formatCurrency } from '@/utils/formatters';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const calculateBalance = () => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === 'income' 
        ? total + transaction.amount 
        : total - transaction.amount;
    }, 0);
  };

  const calculateIncome = () => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((total, t) => total + t.amount, 0);
  };

  const calculateExpenses = () => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((total, t) => total + t.amount, 0);
  };

  const getRecentTransactions = () => {
    return transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Loading rows={2} />
          <Loading rows={2} />
          <Loading rows={2} />
        </div>
        <Loading rows={4} />
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={loadTransactions} />;
  }

  const balance = calculateBalance();
  const income = calculateIncome();
  const expenses = calculateExpenses();
  const recentTransactions = getRecentTransactions();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Overview of your financial health</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Current Balance"
          value={formatCurrency(balance)}
          icon="Wallet"
          color={balance >= 0 ? 'success' : 'error'}
        />
        <StatCard
          title="Total Income"
          value={formatCurrency(income)}
          icon="TrendingUp"
          color="success"
        />
        <StatCard
          title="Total Expenses"
          value={formatCurrency(expenses)}
          icon="TrendingDown"
          color="error"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
          <span className="text-sm text-gray-500">Last 5 transactions</span>
        </div>

        {recentTransactions.length === 0 ? (
          <Empty
            icon="Receipt"
            title="No transactions yet"
            description="Start tracking your finances by adding your first transaction"
            actionLabel="Add Transaction"
            onAction={() => {}}
          />
        ) : (
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <TransactionItem key={transaction.Id} transaction={transaction} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;