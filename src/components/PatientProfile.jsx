'use client'

import React, { useState } from 'react'
import { Card, Avatar, Badge, Table, Tabs } from 'flowbite-react'
import { HiPhone, HiMail, HiHome, HiExclamationCircle, HiClipboardList, HiBeaker, HiLightBulb } from 'react-icons/hi'

// Mock data for demonstration
const patientData = {
  id: '001',
  name: 'John Doe',
  age: 45,
  gender: 'Male',
  phone: '+1 (555) 123-4567',
  email: 'john.doe@example.com',
  address: '123 Main St, Anytown, AN 12345',
  medicalHistory: [
    { date: '2022-05-15', event: 'Diagnosed with hypertension' },
    { date: '2021-11-03', event: 'Appendectomy' },
    { date: '2020-02-20', event: 'Fractured left arm' },
  ],
  allergies: [
    { allergen: 'Penicillin', severity: 'Severe', reaction: 'Anaphylaxis' },
    { allergen: 'Peanuts', severity: 'Moderate', reaction: 'Hives' },
  ],
  medications: [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
  ],
  labResults: [
    { date: '2023-06-01', test: 'Blood Pressure', result: '130/85 mmHg', status: 'Elevated' },
    { date: '2023-05-15', test: 'HbA1c', result: '5.9%', status: 'Pre-diabetic' },
  ],
  recommendations: [
    { date: '2023-06-05', recommendation: 'Increase physical activity to 30 minutes daily' },
    { date: '2023-06-05', recommendation: 'Reduce sodium intake' },
  ],
}

export default function PatientProfilePage() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <Avatar size="xl" img="/placeholder.svg" rounded />
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{patientData.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center">
                <Badge color="info" className="mr-2">ID: {patientData.id}</Badge>
                <span>{patientData.age} years old, {patientData.gender}</span>
              </div>
              <div className="flex items-center">
                <HiPhone className="mr-2" />
                <span>{patientData.phone}</span>
              </div>
              <div className="flex items-center">
                <HiMail className="mr-2" />
                <span>{patientData.email}</span>
              </div>
              <div className="flex items-center">
                <HiHome className="mr-2" />
                <span>{patientData.address}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mt-4">
        <h2 className="text-xl font-bold mb-2">Medical History Summary</h2>
        <Table>
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Event</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {patientData.medicalHistory.map((item, index) => (
              <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{item.date}</Table.Cell>
                <Table.Cell>{item.event}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Card className="mt-4">
        <Tabs aria-label="Patient information tabs">
          <Tabs.Item active title="Allergies" icon={HiExclamationCircle}>
            <Table>
              <Table.Head>
                <Table.HeadCell>Allergen</Table.HeadCell>
                <Table.HeadCell>Severity</Table.HeadCell>
                <Table.HeadCell>Reaction</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {patientData.allergies.map((allergy, index) => (
                  <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {allergy.allergen}
                    </Table.Cell>
                    <Table.Cell>{allergy.severity}</Table.Cell>
                    <Table.Cell>{allergy.reaction}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Tabs.Item>
          <Tabs.Item title="Medications" icon={HiClipboardList}>
            <Table>
              <Table.Head>
                <Table.HeadCell>Medication</Table.HeadCell>
                <Table.HeadCell>Dosage</Table.HeadCell>
                <Table.HeadCell>Frequency</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {patientData.medications.map((medication, index) => (
                  <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {medication.name}
                    </Table.Cell>
                    <Table.Cell>{medication.dosage}</Table.Cell>
                    <Table.Cell>{medication.frequency}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Tabs.Item>
          <Tabs.Item title="Lab Results" icon={HiBeaker}>
            <Table>
              <Table.Head>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Test</Table.HeadCell>
                <Table.HeadCell>Result</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {patientData.labResults.map((result, index) => (
                  <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{result.date}</Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {result.test}
                    </Table.Cell>
                    <Table.Cell>{result.result}</Table.Cell>
                    <Table.Cell>
                      <Badge color={result.status === 'Normal' ? 'success' : 'warning'}>
                        {result.status}
                      </Badge>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Tabs.Item>
          <Tabs.Item title="Recommendations" icon={HiLightBulb}>
            <Table>
              <Table.Head>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Recommendation</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {patientData.recommendations.map((recommendation, index) => (
                  <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{recommendation.date}</Table.Cell>
                    <Table.Cell>{recommendation.recommendation}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Tabs.Item>
        </Tabs>
      </Card>
    </div>
  )
}