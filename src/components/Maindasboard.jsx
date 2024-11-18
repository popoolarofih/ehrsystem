import React from 'react';
import { Card, Sidebar, Navbar, Avatar, Button, Badge, Table} from 'flowbite-react';
import { HiChartPie, HiUsers, HiUser, HiClipboardList, HiExclamationCircle, HiOutlineClipboardList, HiBeaker, HiLightBulb, HiBell, HiBookOpen } from 'react-icons/hi';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register components
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
  const [activeTab, setActiveTab] = React.useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar className="w-64">
        <Sidebar.Logo href="#" img="/ehr-logo.png" imgAlt="EHR logo">
          EHR System
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie} active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="/patientlist" icon={HiUsers} active={activeTab === 'patients'} onClick={() => setActiveTab('patients')}>
              Patient List
            </Sidebar.Item>
            <Sidebar.Item href="/patientprofile" icon={HiUser} active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>
              Patient Profile
            </Sidebar.Item>
            <Sidebar.Item href="/medicalhistory" icon={HiClipboardList} active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
              Medical History
            </Sidebar.Item>
            <Sidebar.Item href="/allergies" icon={HiExclamationCircle} active={activeTab === 'allergies'} onClick={() => setActiveTab('allergies')}>
              Allergies
            </Sidebar.Item>
            <Sidebar.Item href="/medications" icon={HiOutlineClipboardList} active={activeTab === 'medications'} onClick={() => setActiveTab('medications')}>
              Medications
            </Sidebar.Item>
            <Sidebar.Item href="/labresults" icon={HiBeaker} active={activeTab === 'labs'} onClick={() => setActiveTab('labs')}>
              Lab Results
            </Sidebar.Item>
            <Sidebar.Item href="/appointment" icon={HiBookOpen} active={activeTab === 'appointment'} onClick={() => setActiveTab('appointment')}>
              Appointment
            </Sidebar.Item>
            <Sidebar.Item href="/recommendation" icon={HiLightBulb} active={activeTab === 'recommendations'} onClick={() => setActiveTab('recommendations')}>
              Recommendations
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
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">EHR System</span>
          </Navbar.Brand>
          <div className="flex md:order-2">
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
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card>
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Patient Information
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                John Doe, 45 years old, Male
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Last Visit: May 15, 2023
              </p>
            </Card>

            <Card>
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Health Alerts
              </h5>
              <div className="flex flex-col gap-2">
                <Badge color="warning">Allergy: Penicillin</Badge>
                <Badge color="failure">Critical: High blood pressure</Badge>
              </div>
            </Card>

            <Card>
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Recent Activity
              </h5>
              <ul className="list-disc list-inside">
                <li>Blood test results updated</li>
                <li>New medication prescribed</li>
                <li>Appointment scheduled for next week</li>
              </ul>
            </Card>
          </div>

          {/* Analytics & Appointments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card>
  <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
    Health Statistics
  </h5>
  <div className="h-64 overflow-y-auto">
    <Line
      data={{
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Blood Pressure',
            data: [120, 125, 130, 140, 135, 128, 132],
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
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Upcoming Appointments
              </h5>
              <ul className="list-disc list-inside">
                <li>10:00 AM - Consultation with Dr. Smith</li>
                <li>11:30 AM - Lab tests</li>
                <li>2:00 PM - Follow-up appointment</li>
              </ul>
            </Card>
          </div>

          {/* Notifications & Tasks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <a href="/notification">
            
            <Card>
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Notifications
              </h5>
              <ul className="list-disc list-inside">
                <li>New lab result available</li>
                <li>Patient medication updated</li>
              </ul>
            </Card>
            </a>
            <Card>
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Tasks
              </h5>
              <ul className="list-disc list-inside">
                <li>Review blood test results for John Doe</li>
                <li>Confirm next appointment date</li>
                <li>Update allergy information</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
