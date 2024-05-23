// src/App.js

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import Login from './components/Login';
import Signup from './components/SignUp';
import Landing from './components/Landing'; // Import the new Landing page
import { useAuth } from './components/auth';

function PrivateRoute({ children, role }) {
  const { isAuthenticated, userRole } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (role !== userRole) {
    return <Navigate to="/" />;
  }
  return children;
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} /> {/* Landing page */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher"
          element={
            <PrivateRoute role="teacher">
              <TeacherDashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;


