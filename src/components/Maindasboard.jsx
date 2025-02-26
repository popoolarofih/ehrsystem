"use client";
import React, { useState, useEffect } from 'react';
import {
  Card,
  Sidebar,
  Navbar,
  Avatar,
  Button,
  Badge,
  Table,
} from 'flowbite-react';
import {
  HiChartPie,
  HiUsers,
  HiUser,
  HiClipboardList,
  HiExclamationCircle,
  HiOutlineClipboardList,
  HiBeaker,
  HiLightBulb,
  HiBell,
  HiBookOpen,
} from 'react-icons/hi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { auth, db } from '../lib/firebase';
import { get, ref } from 'firebase/database';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function MainDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [doctorInfo, setDoctorInfo] = useState(null);

  // Fetch the logged in doctor's info from Realtime Database
  useEffect(() => {
    const fetchDoctorInfo = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const doctorRef = ref(db, 'users/' + user.uid);
          const snapshot = await get(doctorRef);
          if (snapshot.exists()) {
            setDoctorInfo(snapshot.val());
          } else {
            console.log("No doctor info found.");
          }
        } catch (error) {
          console.error("Error fetching doctor's info:", error);
        }
      }
    };
    fetchDoctorInfo();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar className="w-64">
        <Sidebar.Logo href="#" img="/ehr-logo.png" imgAlt="EHR logo">
          EHR System
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="#"
              icon={HiChartPie}
              active={activeTab === 'dashboard'}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item
              href="/mypatients"
              icon={HiUsers}
              active={activeTab === 'patients'}
              onClick={() => setActiveTab('patients')}
            >
              My Patients
            </Sidebar.Item>
            <Sidebar.Item
              href="/appointments"
              icon={HiBookOpen}
              active={activeTab === 'appointments'}
              onClick={() => setActiveTab('appointments')}
            >
              Appointments
            </Sidebar.Item>
            <Sidebar.Item
              href="/medicalhistory"
              icon={HiClipboardList}
              active={activeTab === 'history'}
              onClick={() => setActiveTab('history')}
            >
              Medical History
            </Sidebar.Item>
            <Sidebar.Item
              href="/notifications"
              icon={HiBell}
              active={activeTab === 'notifications'}
              onClick={() => setActiveTab('notifications')}
            >
              Notifications
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Navbar */}
        <Navbar fluid rounded>
          <Navbar.Brand href="#">
            <img src="/ehr-logo.png" className="mr-3 h-6 sm:h-9" alt="EHR Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              EHR System
            </span>
          </Navbar.Brand>
          <div className="flex md:order-2 items-center gap-4">
            {doctorInfo && (
              <>
                <Avatar
                  img={doctorInfo.avatarURL || '/default-avatar.png'}
                  rounded={true}
                  status="online"
                />
                <span className="text-sm font-medium">
                  Dr. {doctorInfo.firstName} {doctorInfo.lastName}
                </span>
              </>
            )}
            <Button>Log out</Button>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link href="#" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="/settings">Settings</Navbar.Link>
            <Navbar.Link href="#">Help</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>

        {/* Dashboard content */}
        <div className="flex-1 overflow-y-auto p-4">
          <h1 className="text-2xl font-bold mb-4">
            {doctorInfo
              ? `Welcome, Dr. ${doctorInfo.firstName} ${doctorInfo.lastName}`
              : 'Doctor Dashboard'}
          </h1>

          {/* Personalized Profile Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card>
              <h5 className="text-xl font-bold tracking-tight text-gray-900">
                My Profile
              </h5>
              {doctorInfo ? (
                <>
                  <p className="font-normal text-gray-700">
                    Dr. {doctorInfo.firstName} {doctorInfo.lastName}
                  </p>
                  <p className="font-normal text-gray-700">
                    {doctorInfo.organization}
                  </p>
                  <p className="font-normal text-gray-700">
                    Contact: {doctorInfo.phone}
                  </p>
                </>
              ) : (
                <p>Loading profile...</p>
              )}
            </Card>

            {/* Health Alerts or other personalized cards */}
            <Card>
              <h5 className="text-xl font-bold tracking-tight text-gray-900">
                Health Alerts
              </h5>
              <div className="flex flex-col gap-2">
                <Badge color="warning">Check new lab results</Badge>
                <Badge color="failure">Pending appointment confirmation</Badge>
              </div>
            </Card>

            <Card>
              <h5 className="text-xl font-bold tracking-tight text-gray-900">
                Recent Activity
              </h5>
              <ul className="list-disc list-inside">
                <li>Reviewed patient reports</li>
                <li>Updated treatment plan for John Doe</li>
                <li>Scheduled follow-up appointment</li>
              </ul>
            </Card>
          </div>

          {/* Analytics & Appointments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card>
              <h5 className="text-xl font-bold tracking-tight text-gray-900">
                Health Statistics
              </h5>
              <div className="h-64 overflow-y-auto">
                <Line
                  data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    datasets: [
                      {
                        label: 'Patient Appointments',
                        data: [5, 8, 7, 10, 9, 12, 11],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false,
                      },
                    ],
                  }}
                  options={{ maintainAspectRatio: false }}
                  height={150}
                />
              </div>
            </Card>

            <Card>
              <h5 className="text-xl font-bold tracking-tight text-gray-900">
                Upcoming Appointments
              </h5>
              <ul className="list-disc list-inside">
                <li>10:00 AM - Consultation with Patient A</li>
                <li>11:30 AM - Lab review for Patient B</li>
                <li>2:00 PM - Follow-up with Patient C</li>
              </ul>
            </Card>
          </div>

          {/* Notifications & Tasks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <a href="/notification">
              <Card>
                <h5 className="text-xl font-bold tracking-tight text-gray-900">
                  Notifications
                </h5>
                <ul className="list-disc list-inside">
                  <li>New lab result available</li>
                  <li>Patient medication updated</li>
                </ul>
              </Card>
            </a>
            <Card>
              <h5 className="text-xl font-bold tracking-tight text-gray-900">
                Tasks
              </h5>
              <ul className="list-disc list-inside">
                <li>Review lab reports for Patient D</li>
                <li>Confirm follow-up appointment</li>
                <li>Update treatment notes</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
