import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useTransactions } from "@/hooks/useTransactions";
import ApperIcon from "@/components/ApperIcon";
import TransactionModal from "@/components/organisms/TransactionModal";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import TransactionItem from "@/components/molecules/TransactionItem";

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
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [categoryFilter, setCategoryFilter] = useState('all');
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

const getUniqueCategories = () => {
    const categories = [...new Set(transactions.map(t => t.category))];
    return categories.sort();
  };

  const getFilteredTransactions = () => {
    return transactions.filter(transaction => {
      // Type filter
      if (filter !== 'all' && transaction.type !== filter) {
        return false;
      }

      // Search filter
      if (searchTerm && !transaction.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Date range filter
      const transactionDate = new Date(transaction.date);
      if (dateRange.start && transactionDate < new Date(dateRange.start)) {
        return false;
      }
      if (dateRange.end && transactionDate > new Date(dateRange.end + 'T23:59:59')) {
        return false;
      }

      // Category filter
      if (categoryFilter !== 'all' && transaction.category !== categoryFilter) {
        return false;
      }

      return true;
    });
  };

  const filteredTransactions = getFilteredTransactions()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const clearAllFilters = () => {
    setFilter('all');
    setSearchTerm('');
    setDateRange({ start: '', end: '' });
    setCategoryFilter('all');
  };

  const hasActiveFilters = filter !== 'all' || searchTerm || dateRange.start || dateRange.end || categoryFilter !== 'all';

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
<div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-800">Filter Transactions</h2>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-gray-600 hover:text-gray-800"
              >
                <ApperIcon name="X" size={16} />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search transactions by description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <ApperIcon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Type</label>
              <div className="flex flex-wrap gap-1">
                <Button
                  variant={filter === 'all' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('all')}
                  className="flex-1 min-w-0"
                >
                  All
                </Button>
                <Button
                  variant={filter === 'income' ? 'success' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('income')}
                  className="flex-1 min-w-0"
                >
                  <ApperIcon name="TrendingUp" size={14} />
                  Income
                </Button>
                <Button
                  variant={filter === 'expense' ? 'danger' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('expense')}
                  className="flex-1 min-w-0"
                >
                  <ApperIcon name="TrendingDown" size={14} />
                  Expenses
                </Button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <option value="all">All Categories</option>
                {getUniqueCategories().map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Start Date</label>
              <Input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">End Date</label>
              <Input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-full"
              />
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-4">
            <span>
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </span>
            {hasActiveFilters && (
              <span className="flex items-center gap-1">
                <ApperIcon name="Filter" size={14} />
                Filters applied
              </span>
            )}
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