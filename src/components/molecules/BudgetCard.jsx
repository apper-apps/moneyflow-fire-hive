import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { formatCurrency, calculatePercentage, getProgressColor, getProgressTextColor } from '@/utils/formatters';
const BudgetCard = ({ budget, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const percentage = calculatePercentage(budget.spent, budget.limit);
  const isOverBudget = percentage >= 100;
  const progressColor = getProgressColor(percentage);
  const textColor = getProgressTextColor(percentage);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
    >
<div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full bg-gradient-to-r ${progressColor}`}>
            <ApperIcon name="PieChart" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 capitalize">{budget.category}</h3>
            <p className="text-sm text-gray-500">{budget.period}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isOverBudget && (
            <div className="text-error">
              <ApperIcon name="AlertTriangle" size={20} />
            </div>
          )}
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ApperIcon name="MoreVertical" size={16} className="text-gray-500" />
            </button>
            {showActions && (
              <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32">
                <button
                  onClick={() => {
                    onEdit(budget);
                    setShowActions(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <ApperIcon name="Edit2" size={14} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(budget.Id);
                    setShowActions(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-error hover:bg-red-50 flex items-center gap-2"
                >
                  <ApperIcon name="Trash2" size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
<div className="flex justify-between text-sm">
          <span className="text-gray-600">Spent</span>
          <span className={`font-medium ${textColor}`}>
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
          <span className={`font-medium ${textColor}`}>
            {percentage.toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentage, 100)}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-2 rounded-full bg-gradient-to-r ${progressColor}`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BudgetCard;