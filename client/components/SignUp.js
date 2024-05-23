import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const response = await signUp(email, password);
    if (response.success) {
      navigate.push('/login');
    } else {
      alert('Sign-up failed');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default SignUp;
