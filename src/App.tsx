import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import { GlobalStyles } from './styles/GlobalStyles';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <Dashboard />
      </div>
    </>
  );
};

export default App;


