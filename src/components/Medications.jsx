'use client';

import React, { useState } from 'react';
import { Card, Table, Button, Modal, Label, TextInput, Datepicker, Alert } from 'flowbite-react';
import { HiPlus, HiExclamation } from 'react-icons/hi';

const initialCurrentMedications = [
  { id: 1, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2023-01-15', provider: 'Dr. Smith' },
  { id: 2, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2023-02-20', provider: 'Dr. Johnson' },
];

const initialMedicationHistory = [
  { id: 3, name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', startDate: '2022-11-01', endDate: '2022-11-14', provider: 'Dr. Brown' },
  { id: 4, name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed', startDate: '2022-12-05', endDate: '2023-01-05', provider: 'Dr. Davis' },
];

const drugInteractions = [
  { drug1: 'Lisinopril', drug2: 'Spironolactone', severity: 'Moderate', description: 'May increase risk of hyperkalemia' },
  { drug1: 'Metformin', drug2: 'Iodinated contrast media', severity: 'Severe', description: 'May increase risk of lactic acidosis' },
];

export default function MedicationsPage() {
  const [currentMedications, setCurrentMedications] = useState(initialCurrentMedications);
  const [medicationHistory, setMedicationHistory] = useState(initialMedicationHistory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('current');
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    startDate: '',
    provider: '',
  });
  const [alertMessage, setAlertMessage] = useState('');

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewMedication({ name: '', dosage: '', frequency: '', startDate: '', provider: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedication((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    // Ensure that the date is a Date object before saving it to the state
    setNewMedication((prev) => ({ ...prev, startDate: date instanceof Date ? date : new Date(date) }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMed = { id: Date.now(), ...newMedication };
    setCurrentMedications((prev) => [...prev, newMed]);
    handleCloseModal();
    checkForInteractions(newMed.name);
  };

  const checkForInteractions = (newDrug) => {
    const currentDrugs = currentMedications.map(med => med.name);
    const interactions = drugInteractions.filter(
      interaction => 
        (interaction.drug1 === newDrug && currentDrugs.includes(interaction.drug2)) ||
        (interaction.drug2 === newDrug && currentDrugs.includes(interaction.drug1))
    );

    if (interactions.length > 0) {
      const interactionMessages = interactions.map(
        interaction => `${interaction.severity} interaction between ${interaction.drug1} and ${interaction.drug2}: ${interaction.description}`
      );
      setAlertMessage(interactionMessages.join('\n'));
    }
  };

  const AlertComponent = () => (
    alertMessage && (
      <Alert color="warning" icon={HiExclamation} onDismiss={() => setAlertMessage('')}>
        <span className="font-medium">Drug Interaction Alert!</span>
        <br />
        {alertMessage.split('\n').map((message, index) => (
          <React.Fragment key={index}>
            {message}
            <br />
          </React.Fragment>
        ))}
      </Alert>
    )
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Medications</h1>
      <AlertComponent />
      
      <div className="mb-4 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="mr-2">
            <button
              aria-selected={activeTab === 'current'}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === 'current'
                  ? 'text-primary border-b-2 border-primary'
                  : 'hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('current')}
            >
              Current Medications
            </button>
          </li>
          <li className="mr-2">
            <button
              aria-selected={activeTab === 'history'}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === 'history'
                  ? 'text-primary border-b-2 border-primary'
                  : 'hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('history')}
            >
              Medication History
            </button>
          </li>
        </ul>
      </div>

      {activeTab === 'current' ? (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Current Medications</h2>
            <Button className="bg-green-800" onClick={handleOpenModal}>
              <HiPlus className="mr-2 h-5 w-5" />
              Add New Medication
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Medication</Table.HeadCell>
              <Table.HeadCell>Dosage</Table.HeadCell>
              <Table.HeadCell>Frequency</Table.HeadCell>
              <Table.HeadCell>Start Date</Table.HeadCell>
              <Table.HeadCell>Prescribing Provider</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {currentMedications.map((medication) => (
                <Table.Row key={medication.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {medication.name}
                  </Table.Cell>
                  <Table.Cell>{medication.dosage}</Table.Cell>
                  <Table.Cell>{medication.frequency}</Table.Cell>
                  <Table.Cell>{medication.startDate}</Table.Cell>
                  <Table.Cell>{medication.provider}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card>
      ) : (
        <Card>
          <h2 className="text-xl font-bold mb-4">Medication History</h2>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Medication</Table.HeadCell>
              <Table.HeadCell>Dosage</Table.HeadCell>
              <Table.HeadCell>Frequency</Table.HeadCell>
              <Table.HeadCell>Start Date</Table.HeadCell>
              <Table.HeadCell>End Date</Table.HeadCell>
              <Table.HeadCell>Prescribing Provider</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {medicationHistory.map((medication) => (
                <Table.Row key={medication.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {medication.name}
                  </Table.Cell>
                  <Table.Cell>{medication.dosage}</Table.Cell>
                  <Table.Cell>{medication.frequency}</Table.Cell>
                  <Table.Cell>{medication.startDate}</Table.Cell>
                  <Table.Cell>{medication.endDate}</Table.Cell>
                  <Table.Cell>{medication.provider}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card>
      )}

      <Modal show={isModalOpen} onClose={handleCloseModal}>
        <Modal.Header>Add New Medication</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Medication Name</Label>
              <TextInput
                id="name"
                name="name"
                value={newMedication.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="dosage">Dosage</Label>
              <TextInput
                id="dosage"
                name="dosage"
                value={newMedication.dosage}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="frequency">Frequency</Label>
              <TextInput
                id="frequency"
                name="frequency"
                value={newMedication.frequency}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Datepicker
                id="startDate"
                value={newMedication.startDate}
                onSelectedDateChanged={handleDateChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="provider">Prescribing Provider</Label>
              <TextInput
                id="provider"
                name="provider"
                value={newMedication.provider}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="bg-green-800 w-full">
              Add Medication
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
