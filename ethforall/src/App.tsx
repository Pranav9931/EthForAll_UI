import React from 'react';
import './App.css';

import { Routes, Route } from "react-router-dom"
import { Dashboard, EmployeePage, MilestonePage, ProfilePage, TransactionFailed, TransactionsPage, TransactionSuccess } from './pages';
import { NavigationBar, Sidebar } from './components';

const App = () => {
  return (
    <div className="App">
      <Sidebar />
      <div style={{ flex: 1 }}>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/transactions/success" element={<TransactionSuccess />} />
          <Route path="/transactions/failed" element={<TransactionFailed />} />
          <Route path="/milestones" element={<MilestonePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
