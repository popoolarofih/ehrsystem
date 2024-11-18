'use client'

import React, { useState } from 'react'
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react'
import { HiMail, HiLockClosed } from 'react-icons/hi'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the login request to your backend
    console.log('Login submitted:', formData)
  }

  return (
    <div className="bg-green-50 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Log in to Your Account
        </h2>
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
            <Label htmlFor="rememberMe">
              Remember me
            </Label>
          </div>
          <Button type="submit" color="success">
            Log In
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
  )
}