"use client";
import React, { useState, useEffect } from "react";
import { Card, Badge, Button } from "flowbite-react";
import { get, ref, query, orderByChild, equalTo, onValue, off } from "firebase/database";
import { auth, db } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import logo from '../../Images/ehr-logo.png';

export default function PatientDashboard() {
  const [patientInfo, setPatientInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  // Dummy data for lab results, health alerts, and quick links remain unchanged
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
    { label: "Medical History", href: "/patientmedicalhistory" },
    { label: "Allergies", href: "/allergies" },
  ];

  // Fetch patient info
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

  // Fetch upcoming appointments for the current patient
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const appointmentsRef = ref(db, "appointments");
      const appointmentsQuery = query(
        appointmentsRef,
        orderByChild("patientId"),
        equalTo(user.uid)
      );
      const callback = (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const appointmentsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          // Filter for upcoming appointments: assuming date is stored in "YYYY-MM-DD" format.
          const today = new Date().toISOString().slice(0, 10);
          const upcoming = appointmentsArray.filter(
            (appt) => appt.date >= today
          );
          setAppointments(upcoming);
        } else {
          setAppointments([]);
        }
      };
      onValue(appointmentsQuery, callback);
      return () => {
        off(appointmentsQuery, "value", callback);
      };
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 rounded shadow">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="EHR Logo" className="h-20" />
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
          {appointments.length === 0 ? (
            <p className="mt-2 text-gray-500">No upcoming appointments.</p>
          ) : (
            <ul className="mt-2 list-disc list-inside text-gray-700">
              {appointments.map((appt) => (
                <li key={appt.id}>
                  {appt.time} - Appointment with {appt.doctorName} on {appt.date}
                </li>
              ))}
            </ul>
          )}
          <div className="flex gap-2 mt-4">
            <Button
              color="blue"
              size="sm"
              onClick={() => navigate("/create-appointment")}
            >
              Set Appointment
            </Button>
          </div>
        </Card>

        {/* Recent Lab Results */}
        <Card className="shadow">
          <h2 className="text-lg font-bold">Recent Lab Results</h2>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            {dummyLabResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
          <Button
            color="green"
            size="sm"
            className="mt-4"
            onClick={() => navigate("/labreports")}
          >
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
          <Button
            color="red"
            size="sm"
            className="mt-4"
            onClick={() => navigate("/alerts")}
          >
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
        </Card>
      </main>
    </div>
  );
}
