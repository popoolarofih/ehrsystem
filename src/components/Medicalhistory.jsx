'use client'

import React, { useState } from 'react'
import { Card, Timeline, Button, Modal, Label, TextInput, Textarea, Datepicker, Select } from 'flowbite-react'
import { HiCalendar, HiPlus, HiPencil, HiOutlineClipboardList, HiOutlineBeaker, HiOutlineLightBulb } from 'react-icons/hi'

// Mock data for demonstration
const initialMedicalHistory = [
  {
    id: 1,
    date: '2023-06-15',
    type: 'Visit',
    title: 'Annual Check-up',
    description: 'Routine annual physical examination',
    notes: 'Patient reports feeling well. No significant changes in health status. Recommended continued exercise and balanced diet.',
    diagnosis: 'Healthy adult',
    treatment: 'No treatment required. Advised on preventive measures.',
  },
  {
    id: 2,
    date: '2023-03-10',
    type: 'Procedure',
    title: 'Dental Cleaning',
    description: 'Routine dental cleaning and examination',
    notes: 'No cavities found. Slight gingivitis noted on lower left quadrant.',
    diagnosis: 'Mild gingivitis',
    treatment: 'Advised on improved flossing technique and recommended follow-up in 6 months.',
  },
  {
    id: 3,
    date: '2022-11-22',
    type: 'Diagnosis',
    title: 'Seasonal Allergies',
    description: 'Patient complained of runny nose and itchy eyes',
    notes: 'Symptoms consistent with seasonal allergies. No signs of infection.',
    diagnosis: 'Allergic rhinitis',
    treatment: 'Prescribed antihistamine and nasal spray. Advised on allergen avoidance strategies.',
  },
]

const entryTypes = ['Visit', 'Procedure', 'Diagnosis', 'Test', 'Vaccination']

export default function MedicalHistoryPage() {
  const [medicalHistory, setMedicalHistory] = useState(initialMedicalHistory)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [newEntry, setNewEntry] = useState({
    date: '',
    type: '',
    title: '',
    description: '',
    notes: '',
    diagnosis: '',
    treatment: '',
  })

  const handleOpenModal = (entry = null) => {
    if (entry) {
      setSelectedEntry(entry)
      setNewEntry(entry)
    } else {
      setSelectedEntry(null)
      setNewEntry({
        date: '',
        type: '',
        title: '',
        description: '',
        notes: '',
        diagnosis: '',
        treatment: '',
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedEntry(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewEntry((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date) => {
    setNewEntry((prev) => ({ ...prev, date: date }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedEntry) {
      setMedicalHistory((prev) =>
        prev.map((entry) => (entry.id === selectedEntry.id ? { ...entry, ...newEntry } : entry))
      )
    } else {
      setMedicalHistory((prev) => [...prev, { id: Date.now(), ...newEntry }])
    }
    handleCloseModal()
  }

  const getEntryIcon = (type) => {
    switch (type) {
      case 'Visit':
        return HiCalendar
      case 'Procedure':
        return HiOutlineClipboardList
      case 'Diagnosis':
        return HiOutlineLightBulb
      case 'Test':
        return HiOutlineBeaker
      default:
        return HiCalendar
    }
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Medical History</h1>
        <Button className='bg-green-800' onClick={() => handleOpenModal()}>
    <HiPlus className="mr-2 h-5 w-5" />
    Add New Entry
</Button>
      </div>

      <Card className="shadow-lg">
        <Timeline>
          {medicalHistory.map((entry) => (
            <Timeline.Item key={entry.id}>
              <Timeline.Point icon={getEntryIcon(entry.type)} />
              <Timeline.Content>
                <Timeline.Time>{entry.date}</Timeline.Time>
                <Timeline.Title className="text-xl font-semibold text-gray-800">{entry.title}</Timeline.Title>
                <Timeline.Body>
                  <p className="text-gray-600 mb-2">{entry.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{entry.type}</span>
                    {entry.diagnosis && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        Diagnosis: {entry.diagnosis}
                      </span>
                    )}
                  </div>
                  <Button color="light" size="xs" onClick={() => handleOpenModal(entry)} className="mt-2">
                    <HiPencil className="mr-2 h-4 w-4" />
                    Edit Details
                  </Button>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>

      <Modal show={isModalOpen} onClose={handleCloseModal} size="xl">
        <Modal.Header>{selectedEntry ? 'Edit Medical History Entry' : 'Add New Medical History Entry'}</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date" className="mb-2 block">Date</Label>
                <Datepicker
                  id="date"
                  name="date"
                  value={selectedEntry ? selectedEntry.date : newEntry.date}
                  onSelectedDateChanged={handleDateChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="type" className="mb-2 block">Type</Label>
                <Select
                  id="type"
                  name="type"
                  value={selectedEntry ? selectedEntry.type : newEntry.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select type</option>
                  {entryTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="title" className="mb-2 block">Title</Label>
              <TextInput
                id="title"
                name="title"
                value={selectedEntry ? selectedEntry.title : newEntry.title}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="description" className="mb-2 block">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={selectedEntry ? selectedEntry.description : newEntry.description}
                onChange={handleInputChange}
                required
                className="w-full"
                rows={1}
              />
            </div>
            <div>
              <Label htmlFor="notes" className="mb-2 block">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={selectedEntry ? selectedEntry.notes : newEntry.notes}
                onChange={handleInputChange}
                required
                className="w-full"
                rows={1}
              />
            </div>
            <div>
              <Label htmlFor="diagnosis" className="mb-2 block">Diagnosis</Label>
              <TextInput
                id="diagnosis"
                name="diagnosis"
                value={selectedEntry ? selectedEntry.diagnosis : newEntry.diagnosis}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="treatment" className="mb-2 block">Treatment</Label>
              <Textarea
                id="treatment"
                name="treatment"
                value={selectedEntry ? selectedEntry.treatment : newEntry.treatment}
                onChange={handleInputChange}
                className="w-full"
                rows={1}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className='bg-green-800'>
                {selectedEntry ? 'Update Entry' : 'Add Entry'}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}