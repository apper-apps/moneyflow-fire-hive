import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const FloatingActionButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-full shadow-lg z-50"
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <ApperIcon name="Plus" size={24} />
    </motion.button>
  );
};

export default FloatingActionButton;