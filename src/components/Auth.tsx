// src/components/Auth.tsx
import React, { useState } from 'react';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const navigate = useNavigate();

  const toggleAuthMode = () => setIsRegister(!isRegister);

  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== confirmEmail) {
      setError('Emails do not match');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Social logins
  const handleGoogleLogin = async () => {
    await signInWithGoogle();
    navigate('/dashboard');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <h1>{isRegister ? 'Register' : 'Login'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Toggle between login and register */}
      <form onSubmit={isRegister ? handleRegister : handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {isRegister && (
          <input
            type="email"
            placeholder="Confirm Email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            required
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>

      {!isRegister && (
        <p>
          Forgot Password? <a href="/forgot-password">Reset here</a>
        </p>
      )}

      <p>OR</p>
      <button onClick={handleGoogleLogin}>Login with Google</button>

      <p>
        {isRegister
          ? 'Already have an account? '
          : "Don't have an account? "}
        <button onClick={toggleAuthMode}>
          {isRegister ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default Auth;
