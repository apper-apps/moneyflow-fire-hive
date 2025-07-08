import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ className, rows = 3 }) => {
  return (
    <div className={className}>
      <div className="space-y-4">
        {[...Array(rows)].map((_, index) => (
          <motion.div
            key={index}
            className="animate-pulse"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1 }}
          >
            <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-4 rounded-lg mb-2"></div>
            <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-4 rounded-lg w-3/4"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;