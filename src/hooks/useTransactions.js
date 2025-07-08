import { useState, useEffect } from 'react';
import { transactionService } from '@/services/api/transactionService';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transactionData) => {
    try {
      const newTransaction = await transactionService.create(transactionData);
      setTransactions(prev => [...prev, newTransaction]);
      return newTransaction;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const updateTransaction = async (id, updateData) => {
    try {
      const updatedTransaction = await transactionService.update(id, updateData);
      setTransactions(prev => 
        prev.map(t => t.Id === parseInt(id) ? updatedTransaction : t)
      );
      return updatedTransaction;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await transactionService.delete(id);
      setTransactions(prev => prev.filter(t => t.Id !== parseInt(id)));
    } catch (err) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
    loadTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction
  };
};