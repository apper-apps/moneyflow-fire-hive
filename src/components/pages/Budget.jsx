import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BudgetCard from '@/components/molecules/BudgetCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { budgetService } from '@/services/api/budgetService';

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBudgets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await budgetService.getAll();
      setBudgets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBudgets();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Loading rows={3} />
        <Loading rows={3} />
        <Loading rows={3} />
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={loadBudgets} />;
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Budget</h1>
          <p className="text-gray-600">Monitor your spending limits and track progress</p>
        </div>
      </motion.div>

      {budgets.length === 0 ? (
        <Empty
          icon="PieChart"
          title="No budgets created"
          description="Create your first budget to start tracking your spending limits and financial goals."
          actionLabel="Create Budget"
          onAction={() => {}}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => (
            <BudgetCard key={budget.Id} budget={budget} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Budget;