import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginPage from './pages/LoginPage';

// Import all admin pages
import AdminDashboard from './components/Admin/pages/Dashboard';
import Users from './components/Admin/pages/Users';
import Transactions from './components/Admin/pages/Transactions';
import Settings from './components/Admin/pages/Settings';
import Sidebar from './components/Admin/components/AdminSidebar';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route, can be used to redirect to login page */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Login page route */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Dashboard page route */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin Portal routes - Wrapped with sidebar */}
        <Route
          path='/admin/*'
          element = {
            <div className='flex'>
              <Sidebar/>
              <div className='flex-1 p-6'>
                <Routes>
                  <Route path='/dashboard' element={<AdminDashboard />}/>
                  <Route path='/users' element={<Users />}/>
                  <Route path='/transactions' element={<Transactions />}/>
                  <Route path='/settings' element={<Settings />}/>
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
