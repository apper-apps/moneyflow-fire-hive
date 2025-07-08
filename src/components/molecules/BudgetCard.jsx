import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { formatCurrency, calculatePercentage } from '@/utils/formatters';

const BudgetCard = ({ budget }) => {
  const percentage = calculatePercentage(budget.spent, budget.limit);
  const isOverBudget = percentage >= 100;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${
            isOverBudget 
              ? 'bg-gradient-to-r from-error to-red-600' 
              : 'bg-gradient-to-r from-primary to-secondary'
          }`}>
            <ApperIcon name="PieChart" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 capitalize">{budget.category}</h3>
            <p className="text-sm text-gray-500">{budget.period}</p>
          </div>
        </div>
        {isOverBudget && (
          <div className="text-error">
            <ApperIcon name="AlertTriangle" size={20} />
          </div>
        )}
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Spent</span>
          <span className={`font-medium ${isOverBudget ? 'text-error' : 'text-gray-800'}`}>
            {formatCurrency(budget.spent)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Limit</span>
          <span className="font-medium text-gray-800">{formatCurrency(budget.limit)}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className={`font-medium ${isOverBudget ? 'text-error' : 'text-gray-800'}`}>
            {percentage.toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentage, 100)}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-2 rounded-full ${
              isOverBudget 
                ? 'bg-gradient-to-r from-error to-red-600' 
                : 'bg-gradient-to-r from-primary to-secondary'
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BudgetCard;