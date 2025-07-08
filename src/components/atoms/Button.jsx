import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const buttonVariants = {
  default: 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl',
  secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300',
  success: 'bg-gradient-to-r from-success to-emerald-600 text-white shadow-lg hover:shadow-xl',
  danger: 'bg-gradient-to-r from-error to-red-600 text-white shadow-lg hover:shadow-xl',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
};

const sizeVariants = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

const Button = React.forwardRef(({ 
  className, 
  variant = 'default', 
  size = 'md', 
  disabled, 
  children, 
  ...props 
}, ref) => {
  return (
    <motion.button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        buttonVariants[variant],
        sizeVariants[size],
        className
      )}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;