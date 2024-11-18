'use client'

import React, { useState } from 'react'
import { Card, Table, Button, Modal, Label, TextInput, Select, Datepicker, Alert } from 'flowbite-react'
import { HiPlus, HiPencil, HiExclamation } from 'react-icons/hi'

// Mock data for demonstration
const initialAllergies = [
  { id: 1, allergen: 'Peanuts', reactionType: 'Anaphylaxis', severity: 'Severe', lastReported: '2023-01-15' },
  { id: 2, allergen: 'Penicillin', reactionType: 'Rash', severity: 'Moderate', lastReported: '2022-11-03' },
  { id: 3, allergen: 'Latex', reactionType: 'Hives', severity: 'Mild', lastReported: '2023-03-22' },
]

export default function AllergiesPage() {
  const [allergies, setAllergies] = useState(initialAllergies)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAllergy, setSelectedAllergy] = useState(null)
  const [newAllergy, setNewAllergy] = useState({
    allergen: '',
    reactionType: '',
    severity: '',
    lastReported: '',
  })
  const [alertMessage, setAlertMessage] = useState('')

  const handleOpenModal = (allergy = null) => {
    if (allergy) {
      setSelectedAllergy(allergy)
      setNewAllergy(allergy)
    } else {
      setSelectedAllergy(null)
      setNewAllergy({
        allergen: '',
        reactionType: '',
        severity: '',
        lastReported: '',
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedAllergy(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewAllergy((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date) => {
    setNewAllergy((prev) => ({ ...prev, lastReported: date }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedAllergy) {
      setAllergies((prev) =>
        prev.map((allergy) => (allergy.id === selectedAllergy.id ? { ...allergy, ...newAllergy } : allergy))
      )
    } else {
      setAllergies((prev) => [...prev, { id: Date.now(), ...newAllergy }])
    }
    handleCloseModal()
    checkForConflicts(newAllergy.allergen)
  }

  const checkForConflicts = (allergen) => {
    // This is a simulated check. In a real application, you would check against actual patient medications and treatments.
    const conflictingMedications = [
      { allergen: 'Peanuts', medication: 'PeanutOil Supplement' },
      { allergen: 'Penicillin', medication: 'Amoxicillin' },
      { allergen: 'Latex', medication: 'Latex-based Medical Devices' },
    ]

    const conflict = conflictingMedications.find((item) => item.allergen.toLowerCase() === allergen.toLowerCase())
    if (conflict) {
      setAlertMessage(`Warning: ${conflict.medication} may conflict with ${allergen} allergy.`)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Allergies</h1>
        <Button className='bg-green-800' onClick={() => handleOpenModal()}>
          <HiPlus className="mr-2 h-5 w-5" />
          Add New Allergy
        </Button>
      </div>

      {alertMessage && (
        <Alert color="warning" icon={HiExclamation} onDismiss={() => setAlertMessage('')}>
          {alertMessage}
        </Alert>
      )}

      <Card>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Allergen</Table.HeadCell>
            <Table.HeadCell>Reaction Type</Table.HeadCell>
            <Table.HeadCell>Severity</Table.HeadCell>
            <Table.HeadCell>Last Reported</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {allergies.map((allergy) => (
              <Table.Row key={allergy.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {allergy.allergen}
                </Table.Cell>
                <Table.Cell>{allergy.reactionType}</Table.Cell>
                <Table.Cell>{allergy.severity}</Table.Cell>
                <Table.Cell>{allergy.lastReported}</Table.Cell>
                <Table.Cell>
                  <Button className='bg-green-800' size="sm" onClick={() => handleOpenModal(allergy)}>
                    <HiPencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Modal show={isModalOpen} onClose={handleCloseModal}>
        <Modal.Header>{selectedAllergy ? 'Edit Allergy' : 'Add New Allergy'}</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="allergen">Allergen</Label>
              <TextInput
                id="allergen"
                name="allergen"
                value={newAllergy.allergen}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="reactionType">Reaction Type</Label>
              <TextInput
                id="reactionType"
                name="reactionType"
                value={newAllergy.reactionType}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="severity">Severity</Label>
              <Select id="severity" name="severity" value={newAllergy.severity} onChange={handleInputChange} required>
                <option value="">Select severity</option>
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="lastReported">Last Reported</Label>
              <Datepicker
                id="lastReported"
                name="lastReported"
                value={newAllergy.lastReported}
                onSelectedDateChanged={handleDateChange}
                required
              />
            </div>
            <Button className='bg-green-800' type="submit">{selectedAllergy ? 'Update Allergy' : 'Add Allergy'}</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}