import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { formatCurrency, formatDate } from "@/utils/formatters";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

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

const TransactionItem = ({ transaction, onEdit = () => {}, onDelete = () => {} }) => {
  const isIncome = transaction.type === 'income';
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  
  const minSwipeDistance = 50;
  
  const onTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      setShowDeleteConfirm(true);
    }
  };
  
const handleEdit = (e) => {
    e.stopPropagation();
    if (typeof onEdit === 'function') {
      onEdit(transaction);
    } else {
      console.warn('onEdit prop is not a function');
    }
  };

const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      if (typeof onDelete === 'function') {
        await onDelete(transaction.id);
        toast.success('Transaction deleted successfully');
      } else {
        console.warn('onDelete prop is not a function');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast.error('Failed to delete transaction');
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="relative overflow-hidden"
    >
      <div
        onClick={handleEdit}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
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
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className={`font-semibold ${
              isIncome ? 'text-success' : 'text-error'
            }`}>
              {isIncome ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
            </p>
          </div>
          
          {/* Desktop delete button - visible on hover */}
          <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirm(true);
              }}
              className="text-error hover:text-error hover:bg-red-50"
            >
              <ApperIcon name="Trash2" size={16} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Delete confirmation overlay */}
      {showDeleteConfirm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between p-4 z-10"
        >
          <div className="flex items-center gap-2">
            <ApperIcon name="AlertTriangle" size={16} className="text-error" />
            <span className="text-sm font-medium text-gray-700">Delete this transaction?</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirm(false);
              }}
              className="text-gray-600"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TransactionItem;