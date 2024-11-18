'use client'

import React, { useState } from 'react'
import { Button, Card, Checkbox, Label, TextInput, Select } from 'flowbite-react'
import { HiMail, HiLockClosed, HiUser, HiOfficeBuilding, HiPhone, HiOutlineArrowRight } from 'react-icons/hi'

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
    agreeToTerms: false
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
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
  }

  return (
    <div className="bg-green-100 min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">       
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Join Our EHR System
          </h2>
          <p className="text-gray-600 mt-2">Create your account to get started</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1 block">First Name</Label>
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
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1 block">Last Name</Label>
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
            <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">Email</Label>
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
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1 block">Password</Label>
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
            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-1 block">Confirm Password</Label>
              <TextInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                icon={HiLockClosed}
                placeholder="••••••••"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="role" className="text-sm font-medium text-gray-700 mb-1 block">Role</Label>
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
              <option value="Patient">Patient</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="organization" className="text-sm font-medium text-gray-700 mb-1 block">Organization</Label>
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
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 block">Phone Number</Label>
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
              I agree to the <a href="#" className="text-green-600 hover:text-green-800 transition-colors duration-200">Terms and Conditions</a>
            </Label>
          </div>
          <Button type="submit" color="success" className="w-full">
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
  )
}