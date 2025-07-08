import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import FormField from '@/components/molecules/FormField';
import ApperIcon from '@/components/ApperIcon';
import { transactionService } from '@/services/api/transactionService';

const TransactionModal = ({ isOpen, onClose, onTransactionAdded, editTransaction = null }) => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense',
    category: 'Food'
  });
const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = editTransaction !== null;

  const categories = [
    'Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Income'
  ];

  // Reset form when modal opens/closes or when editTransaction changes
  React.useEffect(() => {
    if (isOpen && editTransaction) {
      setFormData({
        amount: editTransaction.amount.toString(),
        description: editTransaction.description,
        date: new Date(editTransaction.date).toISOString().split('T')[0],
        type: editTransaction.type,
        category: editTransaction.category
      });
    } else if (isOpen && !editTransaction) {
      setFormData({
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        type: 'expense',
        category: 'Food'
      });
    }
  }, [isOpen, editTransaction]);

const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const transactionData = {
        ...formData,
        amount: parseFloat(formData.amount),
        date: new Date(formData.date).toISOString(),
      };

      if (isEditMode) {
        await transactionService.update(editTransaction.Id, transactionData);
        toast.success('Transaction updated successfully!');
      } else {
        await transactionService.create(transactionData);
        toast.success('Transaction added successfully!');
      }
      
      onTransactionAdded();
      onClose();
      
      if (!isEditMode) {
        setFormData({
          amount: '',
          description: '',
          date: new Date().toISOString().split('T')[0],
          type: 'expense',
          category: 'Food'
        });
      }
    } catch (error) {
      toast.error(isEditMode ? 'Failed to update transaction' : 'Failed to add transaction');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
          >
<div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {isEditMode ? 'Edit Transaction' : 'Add Transaction'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                label="Amount"
                type="input"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="0.00"
                inputMode="decimal"
                required
              />

              <FormField
                label="Description"
                type="input"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                required
              />

              <FormField
                label="Date"
                type="input"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                inputType="date"
                required
              />

              <FormField
                label="Type"
                type="select"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </FormField>

              <FormField
                label="Category"
                type="select"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
{categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </FormField>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
<Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting 
                    ? (isEditMode ? 'Updating...' : 'Adding...') 
                    : (isEditMode ? 'Update Transaction' : 'Add Transaction')
                  }
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TransactionModal;