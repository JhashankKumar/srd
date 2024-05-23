import React, { createContext, useContext, useState } from 'react';

// Create an AuthContext with default values
const AuthContext = createContext({
  isAuthenticated: false,
  userRole: '',
  login: () => {},
  logout: () => {}
});

// AuthProvider component to wrap around the application
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  const login = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook to access the AuthContext values
export const useAuth = () => useContext(AuthContext);
