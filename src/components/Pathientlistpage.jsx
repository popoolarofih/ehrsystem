'use client'

import React, { useState } from 'react'
import { Table, TextInput, Dropdown, Button, Badge } from 'flowbite-react'
import { HiSearch, HiFilter, HiEye, HiPlus } from 'react-icons/hi'

// Mock data for demonstration
const mockPatients = [
  { id: '001', name: 'John Doe', age: 45, gender: 'Male', lastVisit: '2023-05-15', condition: 'Hypertension' },
  { id: '002', name: 'Jane Smith', age: 32, gender: 'Female', lastVisit: '2023-06-02', condition: 'Diabetes' },
  { id: '003', name: 'Bob Johnson', age: 58, gender: 'Male', lastVisit: '2023-05-28', condition: 'Arthritis' },
  { id: '004', name: 'Alice Brown', age: 27, gender: 'Female', lastVisit: '2023-06-10', condition: 'Asthma' },
  { id: '005', name: 'Charlie Wilson', age: 41, gender: 'Male', lastVisit: '2023-06-05', condition: 'Anxiety' },
]

export default function PatientListPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [ageFilter, setAgeFilter] = useState('All')
  const [genderFilter, setGenderFilter] = useState('All')
  const [conditionFilter, setConditionFilter] = useState('All')

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.id.includes(searchTerm) ||
                          patient.lastVisit.includes(searchTerm)
    const matchesAge = ageFilter === 'All' || 
                       (ageFilter === '0-30' && patient.age <= 30) ||
                       (ageFilter === '31-60' && patient.age > 30 && patient.age <= 60) ||
                       (ageFilter === '60+' && patient.age > 60)
    const matchesGender = genderFilter === 'All' || patient.gender === genderFilter
    const matchesCondition = conditionFilter === 'All' || patient.condition === conditionFilter

    return matchesSearch && matchesAge && matchesGender && matchesCondition
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patient List</h1>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-grow">
          <TextInput
            id="search"
            type="text"
            icon={HiSearch}
            placeholder="Search by name, ID, or visit date"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Dropdown label="Age" dismissOnClick={false} renderTrigger={() => <Button color="light"><HiFilter className="mr-2" />Age</Button>}>
            <Dropdown.Item onClick={() => setAgeFilter('All')}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => setAgeFilter('0-30')}>0-30</Dropdown.Item>
            <Dropdown.Item onClick={() => setAgeFilter('31-60')}>31-60</Dropdown.Item>
            <Dropdown.Item onClick={() => setAgeFilter('60+')}>60+</Dropdown.Item>
          </Dropdown>
          <Dropdown label="Gender" dismissOnClick={false} renderTrigger={() => <Button color="light"><HiFilter className="mr-2" />Gender</Button>}>
            <Dropdown.Item onClick={() => setGenderFilter('All')}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => setGenderFilter('Male')}>Male</Dropdown.Item>
            <Dropdown.Item onClick={() => setGenderFilter('Female')}>Female</Dropdown.Item>
          </Dropdown>
          <Dropdown label="Condition" dismissOnClick={false} renderTrigger={() => <Button color="light"><HiFilter className="mr-2" />Condition</Button>}>
            <Dropdown.Item onClick={() => setConditionFilter('All')}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => setConditionFilter('Hypertension')}>Hypertension</Dropdown.Item>
            <Dropdown.Item onClick={() => setConditionFilter('Diabetes')}>Diabetes</Dropdown.Item>
            <Dropdown.Item onClick={() => setConditionFilter('Arthritis')}>Arthritis</Dropdown.Item>
            <Dropdown.Item onClick={() => setConditionFilter('Asthma')}>Asthma</Dropdown.Item>
            <Dropdown.Item onClick={() => setConditionFilter('Anxiety')}>Anxiety</Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      {/* Patient Summary Table */}
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Patient ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Age</Table.HeadCell>
          <Table.HeadCell>Gender</Table.HeadCell>
          <Table.HeadCell>Last Visit</Table.HeadCell>
          <Table.HeadCell>Condition</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredPatients.map((patient) => (
            <Table.Row key={patient.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {patient.id}
              </Table.Cell>
              <Table.Cell>{patient.name}</Table.Cell>
              <Table.Cell>{patient.age}</Table.Cell>
              <Table.Cell>{patient.gender}</Table.Cell>
              <Table.Cell>{patient.lastVisit}</Table.Cell>
              <Table.Cell>
                <Badge color="info">{patient.condition}</Badge>
              </Table.Cell>
              <Table.Cell>
                <div className="flex gap-2">
                  <Button size="sm" color="light">
                    <HiEye className="mr-2 h-5 w-5" />
                    View Profile
                  </Button>
                  <Button size="sm" color="success">
                    <HiPlus className="mr-2 h-5 w-5" />
                    New Visit
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}