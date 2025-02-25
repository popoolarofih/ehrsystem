'use client';

import React, { useState } from 'react';
import { Card, Table, Button, Badge, Accordion, Select } from 'flowbite-react';
import { HiDownload } from 'react-icons/hi';
import { Line } from 'react-chartjs-2';
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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Mock data
const labResults = [
  {
    id: 1,
    date: '2023-06-15',
    test: 'Complete Blood Count (CBC)',
    result: 'Normal',
    doctor: 'Dr. Smith',
    notes: 'All values within normal range. Continue current health regimen.',
  },
  {
    id: 2,
    date: '2023-05-01',
    test: 'Lipid Panel',
    result: 'Abnormal',
    doctor: 'Dr. Johnson',
    notes: 'LDL cholesterol slightly elevated. Recommend dietary changes and follow-up in 3 months.',
  },
  {
    id: 3,
    date: '2023-03-15',
    test: 'Hemoglobin A1C',
    result: 'Normal',
    doctor: 'Dr. Lee',
    notes: 'A1C levels indicate good blood sugar control. Continue current management plan.',
  },
];

const trendData = {
  labels: ['2023-01-15', '2023-03-15', '2023-05-01', '2023-06-15'],
  datasets: [
    {
      label: 'Hemoglobin A1C',
      data: [5.9, 5.7, 5.8, 5.7],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
    {
      label: 'LDL Cholesterol',
      data: [140, 135, 130, 128],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      label: 'HDL Cholesterol',
      data: [45, 48, 50, 52],
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
    },
  ],
};

export default function PatientLabResultsPage() {
  const [selectedTest, setSelectedTest] = useState('a1c');

  const handleDownload = (id) => {
    console.log(`Downloading report for test ID: ${id}`);
  };

  const filteredTrendData = {
    ...trendData,
    datasets: trendData.datasets.filter((dataset) => {
      if (selectedTest === 'a1c') return dataset.label === 'Hemoglobin A1C';
      if (selectedTest === 'ldl') return dataset.label === 'LDL Cholesterol';
      if (selectedTest === 'hdl') return dataset.label === 'HDL Cholesterol';
      return false;
    }),
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Lab Results</h1>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Lab Results</h2>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Test</Table.HeadCell>
            <Table.HeadCell>Result</Table.HeadCell>
            <Table.HeadCell>Doctor</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {labResults.map((result) => (
              <Table.Row key={result.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{result.date}</Table.Cell>
                <Table.Cell>{result.test}</Table.Cell>
                <Table.Cell>
                  <Badge color={result.result === 'Normal' ? 'success' : 'warning'}>
                    {result.result}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{result.doctor}</Table.Cell>
                <Table.Cell>
                  <Button color="light" size="sm" onClick={() => handleDownload(result.id)}>
                    <HiDownload className="mr-2 h-5 w-5" />
                    Download
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Test Trends</h2>
        <div className="mb-4">
          <Select id="testSelect" value={selectedTest} onChange={(e) => setSelectedTest(e.target.value)}>
            <option value="a1c">Hemoglobin A1C</option>
            <option value="ldl">LDL Cholesterol</option>
            <option value="hdl">HDL Cholesterol</option>
          </Select>
        </div>
        <div className="h-[300px]">
          <Line
            data={filteredTrendData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Test Trends Over Time' },
              },
            }}
          />
        </div>
      </Card>
    </div>
  );
}
