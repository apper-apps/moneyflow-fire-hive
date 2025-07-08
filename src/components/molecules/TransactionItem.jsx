import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { formatCurrency, formatDate } from '@/utils/formatters';
const getCategoryIcon = (category) => {
  const iconMap = {
    'Food': 'Utensils',
    'Transport': 'Car',
    'Entertainment': 'Film',
    'Bills': 'Receipt',
    'Shopping': 'ShoppingBag',
    'Income': 'TrendingUp',
    'general': 'DollarSign'
  };
  return iconMap[category] || 'DollarSign';
};

const TransactionItem = ({ transaction }) => {
  const isIncome = transaction.type === 'income';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${
          isIncome ? 'bg-gradient-to-r from-success to-emerald-600' : 'bg-gradient-to-r from-error to-red-600'
        }`}>
          <ApperIcon 
            name={isIncome ? 'TrendingUp' : 'TrendingDown'} 
            size={16} 
            className="text-white"
          />
        </div>
<div>
          <p className="font-medium text-gray-800">{transaction.description}</p>
          <div className="flex items-center gap-2 mt-1">
            <ApperIcon 
              name={getCategoryIcon(transaction.category)} 
              size={14} 
              className="text-gray-400"
            />
            <p className="text-sm text-gray-500">{transaction.category}</p>
            <span className="text-gray-300">•</span>
            <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-semibold ${
          isIncome ? 'text-success' : 'text-error'
        }`}>
          {isIncome ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
        </p>
      </div>
    </motion.div>
  );
};

export default TransactionItem;