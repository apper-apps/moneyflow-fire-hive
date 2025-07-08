import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import BudgetCard from '@/components/molecules/BudgetCard';
import BudgetModal from '@/components/molecules/BudgetModal';
import FloatingActionButton from '@/components/molecules/FloatingActionButton';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import Button from '@/components/atoms/Button';
import { budgetService } from '@/services/api/budgetService';
const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
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

  const handleCreateBudget = async (budgetData) => {
    try {
      await budgetService.create(budgetData);
      await loadBudgets();
      setIsModalOpen(false);
      toast.success('Budget category created successfully');
    } catch (err) {
      toast.error('Failed to create budget category');
    }
  };

  const handleUpdateBudget = async (id, budgetData) => {
    try {
      await budgetService.update(id, budgetData);
      await loadBudgets();
      setEditingBudget(null);
      setIsModalOpen(false);
      toast.success('Budget category updated successfully');
    } catch (err) {
      toast.error('Failed to update budget category');
    }
  };

  const handleDeleteBudget = async (id) => {
    if (window.confirm('Are you sure you want to delete this budget category?')) {
      try {
        await budgetService.delete(id);
        await loadBudgets();
        toast.success('Budget category deleted successfully');
      } catch (err) {
        toast.error('Failed to delete budget category');
      }
    }
  };

  const handleEditBudget = (budget) => {
    setEditingBudget(budget);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBudget(null);
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
        <Button
          onClick={() => setIsModalOpen(true)}
          className="hidden sm:flex"
        >
          Create Budget Category
        </Button>
      </motion.div>
{budgets.length === 0 ? (
        <Empty
          icon="PieChart"
          title="No budgets created"
          description="Create your first budget to start tracking your spending limits and financial goals."
          actionLabel="Create Budget"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => (
            <BudgetCard 
              key={budget.Id} 
              budget={budget}
              onEdit={handleEditBudget}
              onDelete={handleDeleteBudget}
            />
          ))}
        </div>
)}

      <FloatingActionButton />

      <BudgetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={editingBudget ? (data) => handleUpdateBudget(editingBudget.Id, data) : handleCreateBudget}
        budget={editingBudget}
        title={editingBudget ? 'Edit Budget Category' : 'Create Budget Category'}
      />
    </div>
  );
};

export default Budget;