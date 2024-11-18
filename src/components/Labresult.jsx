import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Alert } from 'flowbite-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const initialLabResults = {
  bloodTests: [
    { id: 1, name: 'Blood Glucose', value: 90, date: '2023-01-01' },
    { id: 2, name: 'Cholesterol', value: 180, date: '2023-01-10' },
    { id: 3, name: 'Blood Glucose', value: 85, date: '2023-01-15' },
    { id: 4, name: 'Cholesterol', value: 190, date: '2023-02-01' },
    { id: 5, name: 'Blood Glucose', value: 88, date: '2023-02-15' },
  ],
  imagingResults: [
    { id: 1, name: 'X-Ray Chest', result: 'Clear', date: '2023-01-20' },
    { id: 2, name: 'MRI Brain', result: 'Normal', date: '2023-02-05' },
  ],
};

export default function LabResultsPage() {
  const [labResults, setLabResults] = useState(initialLabResults);
  const [alertMessage, setAlertMessage] = useState('');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newGlucoseLevel = 80 + Math.floor(Math.random() * 20); // Random blood glucose level
      setLabResults((prevResults) => ({
        ...prevResults,
        bloodTests: [
          ...prevResults.bloodTests,
          { id: Date.now(), name: 'Blood Glucose', value: newGlucoseLevel, date: new Date().toISOString().split('T')[0] },
        ],
      }));
      setAlertMessage('New blood test result updated');
      setTimeout(() => setAlertMessage(''), 3000);
    }, 10000); // Updates every 10 seconds for demo

    return () => clearInterval(interval);
  }, []);

  const bloodGlucoseData = labResults.bloodTests
    .filter((test) => test.name === 'Blood Glucose')
    .map((test) => ({ date: test.date, value: test.value }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lab and Test Results</h1>

      {alertMessage && (
        <Alert color="warning" onDismiss={() => setAlertMessage('')}>
          {alertMessage}
        </Alert>
      )}

      {/* Blood Tests Section */}
      <Card className="mb-4">
        <h2 className="text-xl font-bold mb-4">Blood Tests</h2>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Test Name</Table.HeadCell>
            <Table.HeadCell>Value</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {labResults.bloodTests.map((test) => (
              <Table.Row key={test.id}>
                <Table.Cell>{test.name}</Table.Cell>
                <Table.Cell>{test.value}</Table.Cell>
                <Table.Cell>{test.date}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      {/* Data Visualization */}
      <Card className="mb-4">
        <h2 className="text-xl font-bold mb-4">Blood Glucose Level Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={bloodGlucoseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Imaging Results Section */}
      <Card className="mb-4">
        <h2 className="text-xl font-bold mb-4">Imaging Results</h2>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Imaging Type</Table.HeadCell>
            <Table.HeadCell>Result</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {labResults.imagingResults.map((result) => (
              <Table.Row key={result.id}>
                <Table.Cell>{result.name}</Table.Cell>
                <Table.Cell>{result.result}</Table.Cell>
                <Table.Cell>{result.date}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
}
