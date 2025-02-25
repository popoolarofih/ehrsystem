import React from "react";
import { Card, Badge, Button } from "flowbite-react";

export default function PatientDashboard() {
  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 rounded shadow">
        <div className="flex items-center space-x-4">
          <img src="/ehr-logo.png" alt="EHR Logo" className="h-10" />
          <h1 className="text-xl font-semibold">Patient Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-gray-500">Welcome back, <span className="font-semibold">John Doe</span></p>
          <img
            src="/profile-pic.jpg"
            alt="Profile"
            className="h-10 w-10 rounded-full border"
          />
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="flex-1 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {/* Upcoming Appointments */}
        <Card className="shadow">
          <h2 className="text-lg font-bold">Upcoming Appointments</h2>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            <li>10:00 AM - Consultation with Dr. Smith</li>
            <li>11:30 AM - Lab tests</li>
            <li>2:00 PM - Follow-up appointment</li>
          </ul>
          <Button color="blue" size="sm" className="mt-4">
            View All Appointments
          </Button>
        </Card>

        {/* Recent Lab Results */}
        <Card className="shadow">
          <h2 className="text-lg font-bold">Recent Lab Results</h2>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            <li>Blood Sugar: 120 mg/dL</li>
            <li>Cholesterol: 190 mg/dL</li>
            <li>Blood Pressure: 130/85 mmHg</li>
          </ul>
          <Button color="green" size="sm" className="mt-4">
            View Full Lab Reports
          </Button>
        </Card>

        {/* Health Alerts */}
        <Card className="shadow">
          <h2 className="text-lg font-bold">Health Alerts</h2>
          <div className="flex flex-col gap-2 mt-2">
            <Badge color="warning">Overdue: Medication refill</Badge>
            <Badge color="failure">Critical: High blood pressure</Badge>
          </div>
          <Button color="red" size="sm" className="mt-4">
            View Details
          </Button>
        </Card>

        {/* Quick Links */}
        <Card className="shadow">
          <h2 className="text-lg font-bold">Quick Links</h2>
          <ul className="mt-2 list-disc list-inside text-blue-600">
            <li><a href="/medicalhistory">Medical History</a></li>
            <li><a href="/medications">Medications</a></li>
            <li><a href="/allergies">Allergies</a></li>
          </ul>
          <Button color="purple" size="sm" className="mt-4">
            Go to Medical Records
          </Button>
        </Card>
      </main>
    </div>
  );
}
