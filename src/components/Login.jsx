"use client";
import React, { useState } from 'react';
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import { HiMail, HiLockClosed } from 'react-icons/hi';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { get, ref } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      
      // Retrieve additional user data from Realtime Database
      const userRef = ref(db, 'users/' + user.uid);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log('Login success, user data:', userData);

        // RBAC: Redirect based on user role
        switch (userData.role) {
          case 'admin':
            navigate('/dashboard');
            break;
          case 'doctor':
            navigate('/dashboard');
            break;
          case 'nurse':
            navigate('/nurse-dashboard');
            break;
          case 'patient':
            navigate('/patientdashboard');
            break;
          default:
            navigate('/dashboard');
            break;
        }
      } else {
        setError('User data not found.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-green-50 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Log in to Your Account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <TextInput
              id="email"
              name="email"
              type="email"
              icon={HiMail}
              placeholder="name@example.com"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <TextInput
              id="password"
              name="password"
              type="password"
              icon={HiLockClosed}
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
            />
            <Label htmlFor="rememberMe">Remember me</Label>
          </div>
          <Button type="submit" color="success" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-green-600 hover:underline">
            Forgot your password?
          </a>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-green-600 hover:underline">
            Sign up
          </a>
        </p>
      </Card>
    </div>
  );
}
