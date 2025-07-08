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

export const getProgressColor = (percentage) => {
  if (percentage >= 100) return 'from-error to-red-600';
  if (percentage >= 80) return 'from-warning to-amber-600';
  if (percentage >= 60) return 'from-warning to-orange-500';
  return 'from-primary to-secondary';
};

export const getProgressTextColor = (percentage) => {
  if (percentage >= 100) return 'text-error';
  if (percentage >= 80) return 'text-warning';
  return 'text-gray-800';
};