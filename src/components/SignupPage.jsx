"use client";
import React, { useState } from 'react';
import { Button, Card, Checkbox, Label, TextInput, Select } from 'flowbite-react';
import {
  HiMail,
  HiLockClosed,
  HiUser,
  HiOfficeBuilding,
  HiPhone,
  HiOutlineArrowRight,
  HiEye,
  HiEyeOff,
} from 'react-icons/hi';
import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    organization: '',
    phone: '',
    agreeToTerms: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  // States to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Handle input changes (supports checkboxes)
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Submit the form: create user in Firebase Auth and store extra data in Realtime Database
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validations
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms and Conditions.');
      return;
    }

    setLoading(true);
    try {
      // Create the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Prepare additional user data
      const userData = {
        uid: user.uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: formData.role,
        organization: formData.organization,
        phone: formData.phone,
        createdAt: new Date().toISOString(),
      };

      // Store the user data in Realtime Database under "users/{uid}"
      await set(ref(db, 'users/' + user.uid), userData);

      console.log('User signed up and data stored:', userData);
      setSuccess('Account created successfully! Redirecting to login...');
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Error during sign up:', err);
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-green-100 h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Join Our EHR System</h2>
          <p className="text-gray-600 mt-2">Create your account to get started</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
            {success}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1 block">
                First Name
              </Label>
              <TextInput
                id="firstName"
                name="firstName"
                type="text"
                icon={HiUser}
                placeholder="John"
                required
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1 block">
                Last Name
              </Label>
              <TextInput
                id="lastName"
                name="lastName"
                type="text"
                icon={HiUser}
                placeholder="Doe"
                required
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
              Email
            </Label>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password Field with Toggle */}
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1 block">
                Password
              </Label>
              <div className="relative">
                <TextInput
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  icon={HiLockClosed}
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  tabIndex={-1}
                >
                  {showPassword ? <HiEyeOff className="h-5 w-5 text-gray-600" /> : <HiEye className="h-5 w-5 text-gray-600" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field with Toggle */}
            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-1 block">
                Confirm Password
              </Label>
              <div className="relative">
                <TextInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  icon={HiLockClosed}
                  placeholder="••••••••"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <HiEyeOff className="h-5 w-5 text-gray-600" /> : <HiEye className="h-5 w-5 text-gray-600" />}
                </button>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="role" className="text-sm font-medium text-gray-700 mb-1 block">
              Role
            </Label>
            <Select
              id="role"
              name="role"
              required
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="">Select a role</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="admin">Administrator</option>
              <option value="patient">Patient</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="organization" className="text-sm font-medium text-gray-700 mb-1 block">
              Organization
            </Label>
            <TextInput
              id="organization"
              name="organization"
              type="text"
              icon={HiOfficeBuilding}
              placeholder="Hospital or Clinic Name"
              required
              value={formData.organization}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 block">
              Phone Number
            </Label>
            <TextInput
              id="phone"
              name="phone"
              type="tel"
              icon={HiPhone}
              placeholder="(123) 456-7890"
              required
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
            />
            <Label htmlFor="agreeToTerms" className="text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="text-green-600 hover:text-green-800 transition-colors duration-200">
                Terms and Conditions
              </a>
            </Label>
          </div>

          <Button type="submit" color="success" className="w-full" disabled={loading}>
            <span className="mr-2">Create Account</span>
            <HiOutlineArrowRight className="h-5 w-5" />
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-green-600 hover:text-green-800 transition-colors duration-200">
              Log in
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}
