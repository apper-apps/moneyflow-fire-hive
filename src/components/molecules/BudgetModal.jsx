import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import FormField from '@/components/molecules/FormField';
import ApperIcon from '@/components/ApperIcon';

const BudgetModal = ({ isOpen, onClose, onSubmit, budget, title }) => {
  const [formData, setFormData] = useState({
    category: '',
    limit: '',
    period: 'monthly'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (budget) {
      setFormData({
        category: budget.category || '',
        limit: budget.limit?.toString() || '',
        period: budget.period || 'monthly'
      });
    } else {
      setFormData({
        category: '',
        limit: '',
        period: 'monthly'
      });
    }
    setErrors({});
  }, [budget, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category name is required';
    }
    
    if (!formData.limit || parseFloat(formData.limit) <= 0) {
      newErrors.limit = 'Budget limit must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit({
        category: formData.category.trim().toLowerCase(),
        limit: parseFloat(formData.limit),
        period: formData.period
      });
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ApperIcon name="X" size={20} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                label="Category Name"
                id="category"
                type="input"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                placeholder="e.g., Food, Transportation, Entertainment"
                error={errors.category}
                required
              />

              <FormField
                label="Monthly Limit"
                id="limit"
                type="input"
                inputType="number"
                min="0"
                step="0.01"
                value={formData.limit}
                onChange={(e) => handleChange('limit', e.target.value)}
                placeholder="0.00"
                error={errors.limit}
                required
              />

              <FormField
                label="Period"
                id="period"
                type="select"
                value={formData.period}
                onChange={(e) => handleChange('period', e.target.value)}
                error={errors.period}
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="yearly">Yearly</option>
              </FormField>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {budget ? 'Updating...' : 'Creating...'}
                    </div>
                  ) : (
                    budget ? 'Update Budget' : 'Create Budget'
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BudgetModal;