"use client";
import React, { useState, useEffect } from "react";
import { Card, Badge, Button } from "flowbite-react";
import { get, ref } from "firebase/database";
import { auth, db } from "../lib/firebase";

export default function PatientDashboard() {
  const [patientInfo, setPatientInfo] = useState(null);

  // Dummy data for demonstration
  const dummyAppointments = [
    "10:00 AM - Consultation with Dr. Smith",
    "11:30 AM - Lab tests",
    "2:00 PM - Follow-up appointment",
  ];
  const dummyLabResults = [
    "Blood Sugar: 120 mg/dL",
    "Cholesterol: 190 mg/dL",
    "Blood Pressure: 130/85 mmHg",
  ];
  const dummyHealthAlerts = [
    { message: "Overdue: Medication refill", color: "warning" },
    { message: "Critical: High blood pressure", color: "failure" },
  ];
  const quickLinks = [
    { label: "Medical History", href: "/medicalhistory" },
    { label: "Medications", href: "/medications" },
    { label: "Allergies", href: "/allergies" },
  ];

  useEffect(() => {
    const fetchPatientInfo = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const patientRef = ref(db, "users/" + user.uid);
          const snapshot = await get(patientRef);
          if (snapshot.exists()) {
            setPatientInfo(snapshot.val());
          } else {
            console.log("No patient info found.");
          }
        } catch (error) {
          console.error("Error fetching patient info:", error);
        }
      }
    };
    fetchPatientInfo();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 rounded shadow">
        <div className="flex items-center space-x-4">
          <img src="/ehr-logo.png" alt="EHR Logo" className="h-10" />
          <h1 className="text-xl font-semibold">Patient Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          {patientInfo ? (
            <>
              <p className="text-gray-500">
                Welcome back,{" "}
                <span className="font-semibold">
                  {patientInfo.firstName} {patientInfo.lastName}
                </span>
              </p>
              <img
                src={patientInfo.avatarURL || "/default-avatar.png"}
                alt="Profile"
                className="h-10 w-10 rounded-full border"
              />
            </>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="flex-1 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {/* Upcoming Appointments */}
        <Card className="shadow">
          <h2 className="text-lg font-bold">Upcoming Appointments</h2>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            {dummyAppointments.map((appointment, index) => (
              <li key={index}>{appointment}</li>
            ))}
          </ul>
          <Button color="blue" size="sm" className="mt-4">
            View All Appointments
          </Button>
        </Card>

        {/* Recent Lab Results */}
        <Card className="shadow">
          <h2 className="text-lg font-bold">Recent Lab Results</h2>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            {dummyLabResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
          <Button color="green" size="sm" className="mt-4">
            View Full Lab Reports
          </Button>
        </Card>

        {/* Health Alerts */}
        <Card className="shadow">
          <h2 className="text-lg font-bold">Health Alerts</h2>
          <div className="flex flex-col gap-2 mt-2">
            {dummyHealthAlerts.map((alert, index) => (
              <Badge key={index} color={alert.color}>
                {alert.message}
              </Badge>
            ))}
          </div>
          <Button color="red" size="sm" className="mt-4">
            View Details
          </Button>
        </Card>

        {/* Quick Links */}
        <Card className="shadow">
          <h2 className="text-lg font-bold">Quick Links</h2>
          <ul className="mt-2 list-disc list-inside text-blue-600">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <Button color="purple" size="sm" className="mt-4">
            Go to Medical Records
          </Button>
        </Card>
      </main>
    </div>
  );
}
