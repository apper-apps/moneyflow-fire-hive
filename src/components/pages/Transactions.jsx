import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import TransactionItem from '@/components/molecules/TransactionItem';
import TransactionModal from '@/components/organisms/TransactionModal';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { useTransactions } from '@/hooks/useTransactions';

const Transactions = () => {
  const { 
    transactions, 
    loading, 
    error, 
    loadTransactions, 
    updateTransaction, 
    deleteTransaction 
  } = useTransactions();
  
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };
  
  const handleDeleteTransaction = async (transactionId) => {
    await deleteTransaction(transactionId);
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };
  
  const handleTransactionUpdated = () => {
    loadTransactions();
  };

  const getFilteredTransactions = () => {
    if (filter === 'all') return transactions;
    return transactions.filter(t => t.type === filter);
  };

  const filteredTransactions = getFilteredTransactions()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (loading) {
    return <Loading rows={6} />;
  }

  if (error) {
    return <Error message={error} onRetry={loadTransactions} />;
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
          <p className="text-gray-600">Track all your financial activities</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
      >
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Filter Transactions</h2>
          <div className="flex flex-wrap gap-2 sm:gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'income' ? 'success' : 'ghost'}
              size="sm"
              onClick={() => setFilter('income')}
            >
              <ApperIcon name="TrendingUp" size={16} />
              Income
            </Button>
            <Button
              variant={filter === 'expense' ? 'danger' : 'ghost'}
              size="sm"
              onClick={() => setFilter('expense')}
            >
              <ApperIcon name="TrendingDown" size={16} />
              Expenses
            </Button>
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <Empty
            icon="Receipt"
            title="No transactions found"
            description="No transactions match your current filter. Try changing the filter or add a new transaction."
            actionLabel="Add Transaction"
            onAction={() => {}}
          />
) : (
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.Id} className="group">
                <TransactionItem 
                  transaction={transaction} 
                  onEdit={handleEditTransaction}
                  onDelete={handleDeleteTransaction}
                />
              </div>
            ))}
          </div>
        )}
</motion.div>
      
      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onTransactionAdded={handleTransactionUpdated}
        editTransaction={editingTransaction}
      />
    </div>
  );
};

export default Transactions;