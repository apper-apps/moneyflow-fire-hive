import React from 'react';
import { cn } from '@/utils/cn';

const Select = React.forwardRef(({ 
  className, 
  error,
  children,
  ...props 
}, ref) => {
  return (
    <select
      className={cn(
        'flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm',
        'ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-all duration-200',
        error && 'border-error focus:ring-error',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';

export default Select;