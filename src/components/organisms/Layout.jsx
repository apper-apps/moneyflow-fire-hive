import React, { useState } from 'react';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar isOpen={isMobileMenuOpen} onClose={handleMobileMenuClose} />
        
        <div className="flex-1 flex flex-col min-h-screen">
          <Header
            isMobileMenuOpen={isMobileMenuOpen}
            onMobileMenuToggle={handleMobileMenuToggle}
          />
          
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;