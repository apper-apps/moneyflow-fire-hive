import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  color = 'primary',
  className 
}) => {
  const colorClasses = {
    primary: 'from-primary to-secondary',
    success: 'from-success to-emerald-600',
    error: 'from-error to-red-600',
    warning: 'from-warning to-amber-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full bg-gradient-to-r ${colorClasses[color]}`}>
          <ApperIcon name={icon} size={24} className="text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${
            trend === 'up' ? 'text-success' : 'text-error'
          }`}>
            <ApperIcon name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
        <p className="text-gray-600 text-sm">{title}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;