// src/components/ForgotPassword.tsx
import React, { useState } from 'react';
import { auth } from '../../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h1>Forgot Password</h1>
      {message && <p className="auth-success">{message}</p>}
      {error && <p className="auth-error">{error}</p>}
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Email</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
