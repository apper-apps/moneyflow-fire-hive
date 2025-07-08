import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import Dashboard from '@/components/pages/Dashboard';
import Transactions from '@/components/pages/Transactions';
import Budget from '@/components/pages/Budget';
import TransactionModal from '@/components/organisms/TransactionModal';
import FloatingActionButton from '@/components/molecules/FloatingActionButton';

function App() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const handleTransactionAdded = () => {
    // This will trigger a re-render of components that use the transaction data
    window.location.reload();
  };

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budget" element={<Budget />} />
        </Routes>
        
        <FloatingActionButton 
          onClick={() => setIsTransactionModalOpen(true)}
        />
        
        <TransactionModal
          isOpen={isTransactionModalOpen}
          onClose={() => setIsTransactionModalOpen(false)}
          onTransactionAdded={handleTransactionAdded}
        />
      </Layout>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;