"use client";
import React, { useState } from 'react';
import { Card, Button, Label, TextInput, Textarea } from 'flowbite-react';
import { push, ref } from 'firebase/database';
import { auth, db } from '../../lib/firebase';
import { useNavigate } from 'react-router-dom';

export default function CreateAppointmentPage() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    doctorName: '',
    reason: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const patientId = auth.currentUser ? auth.currentUser.uid : null;
      const appointmentData = {
        ...formData,
        patientId,
        createdAt: new Date().toISOString(),
      };

      // Push a new appointment into the "appointments" node in the Realtime Database
      await push(ref(db, 'appointments'), appointmentData);
      setSuccess('Appointment created successfully! Redirecting...');
      setTimeout(() => {
        navigate('/appointments');
      }, 2000);
    } catch (err) {
      console.error('Error creating appointment:', err);
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-green-50 min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Create Appointment
        </h2>
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
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="date">Date</Label>
            <TextInput
              id="date"
              name="date"
              type="date"
              required
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <TextInput
              id="time"
              name="time"
              type="time"
              required
              value={formData.time}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="doctorName">Doctor</Label>
            <TextInput
              id="doctorName"
              name="doctorName"
              type="text"
              placeholder="Enter doctor's name"
              required
              value={formData.doctorName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="reason">Reason for Appointment</Label>
            <Textarea
              id="reason"
              name="reason"
              placeholder="Enter the reason for your appointment..."
              required
              value={formData.reason}
              onChange={handleInputChange}
            />
          </div>
          <Button type="submit" color="success" disabled={loading}>
            {loading ? 'Creating...' : 'Create Appointment'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
