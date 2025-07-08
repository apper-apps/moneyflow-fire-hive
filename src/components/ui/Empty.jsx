import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  icon = "FileText",
  title = "No data found", 
  description = "Get started by adding your first item",
  actionLabel = "Add Item",
  onAction,
  className 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-center py-12 ${className}`}
    >
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-full">
            <ApperIcon name={icon} size={40} className="text-white" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
        {onAction && (
          <Button onClick={onAction}>
            <ApperIcon name="Plus" size={16} />
            {actionLabel}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;