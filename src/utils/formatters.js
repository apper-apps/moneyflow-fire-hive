import { format } from 'date-fns';

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (date) => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatDateShort = (date) => {
  return format(new Date(date), 'MMM dd');
};

export const formatPercentage = (value) => {
  return `${value.toFixed(0)}%`;
};

export const calculatePercentage = (spent, limit) => {
  if (limit === 0) return 0;
  return Math.min((spent / limit) * 100, 100);
};