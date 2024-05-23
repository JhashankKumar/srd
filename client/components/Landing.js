import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';
const Landing = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="landing">
      <h2>Welcome to Student Result Dashboard</h2>
      <div className="landing-buttons">
        <button onClick={handleLogin} className="button">Login</button>
        <button onClick={handleSignup} className="button" >Sign Up</button>
      </div>
    </div>
  );
};


export default Landing;
