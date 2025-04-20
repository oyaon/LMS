import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { Navbar, ProtectedRoute } from './components';
import Home from './pages/Dashboard';
import Login from './pages/Login';
import BookSearch from './pages/BookSearch';
import AddBook from './pages/AddBook';
import Register from './pages/Registration';
import Profile from './pages/Profile';
import BorrowingHistory from './pages/BorrowingHistory';
import UserManagement from './pages/UserManagement';
import BookManagement from './pages/BookManagement';
import './App.css';
import './App.css';

function App() {
  const [role, setRole] = useState<'admin' | 'member' | 'guest'>('guest');

  const handleLogout = () => {
    setRole('guest');
  };

  return (
    <Router>
      <Navbar role={role} onLogout={handleLogout} />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={setRole} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book-search" element={<BookSearch />} />
          <Route path="/add-book" element={<AddBook />} />
          {role === 'member' && (
            <>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isAuthenticated={role !== 'guest'}
                    allowedRoles={['member']}
                    userRole={role}
                  >
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/borrowing-history"
                element={
                  <ProtectedRoute
                    isAuthenticated={role !== 'guest'}
                    allowedRoles={['member']}
                    userRole={role}
                  >
                    <BorrowingHistory />
                  </ProtectedRoute>
                }
              />
            </>
          )}
          {role === 'admin' && (
            <>
              <Route
                path="/user-management"
                element={
                  <ProtectedRoute
                    isAuthenticated={role !== 'guest'}
                    allowedRoles={['admin']}
                    userRole={role}
                  >
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/book-management"
                element={
                  <ProtectedRoute
                    isAuthenticated={role !== 'guest'}
                    allowedRoles={['admin']}
                    userRole={role}
                  >
                    <BookManagement />
                  </ProtectedRoute>
                }
              />
            </>
          )}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
