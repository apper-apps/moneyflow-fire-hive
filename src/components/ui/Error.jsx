import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ message = "Something went wrong", onRetry, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-center py-8 ${className}`}
    >
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8 border border-red-200">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-error to-red-600 p-3 rounded-full">
            <ApperIcon name="AlertCircle" size={32} className="text-white" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        {onRetry && (
          <Button variant="danger" onClick={onRetry}>
            <ApperIcon name="RefreshCw" size={16} />
            Try Again
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Error;