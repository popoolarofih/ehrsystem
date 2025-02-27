"use client";

import React, { useState, useEffect } from 'react';
import {
  Card,
  Timeline,
  Button,
  Modal,
  Label,
  TextInput,
  Textarea,
  Datepicker,
  Select,
} from 'flowbite-react';
import {
  HiCalendar,
  HiPlus,
  HiPencil,
  HiOutlineClipboardList,
  HiOutlineBeaker,
  HiOutlineLightBulb,
} from 'react-icons/hi';
import { ref, onValue, off } from 'firebase/database';
import { db } from '../lib/firebase';

// Mock data for demonstration
const initialMedicalHistory = [
  {
    id: 1,
    date: '2023-06-15',
    type: 'Visit',
    title: 'Annual Check-up',
    description: 'Routine annual physical examination',
    notes:
      'Patient reports feeling well. No significant changes in health status. Recommended continued exercise and balanced diet.',
    diagnosis: 'Healthy adult',
    treatment: 'No treatment required. Advised on preventive measures.',
  },
  {
    id: 2,
    date: '2023-03-10',
    type: 'Procedure',
    title: 'Dental Cleaning',
    description: 'Routine dental cleaning and examination',
    notes:
      'No cavities found. Slight gingivitis noted on lower left quadrant.',
    diagnosis: 'Mild gingivitis',
    treatment:
      'Advised on improved flossing technique and recommended follow-up in 6 months.',
  },
  {
    id: 3,
    date: '2022-11-22',
    type: 'Diagnosis',
    title: 'Seasonal Allergies',
    description: 'Patient complained of runny nose and itchy eyes',
    notes: 'Symptoms consistent with seasonal allergies. No signs of infection.',
    diagnosis: 'Allergic rhinitis',
    treatment:
      'Prescribed antihistamine and nasal spray. Advised on allergen avoidance strategies.',
  },
];

const entryTypes = ['Visit', 'Procedure', 'Diagnosis', 'Test', 'Vaccination'];

/** Returns the appropriate icon component based on entry type */
const getEntryIcon = (type) => {
  switch (type) {
    case 'Visit':
      return HiCalendar;
    case 'Procedure':
      return HiOutlineClipboardList;
    case 'Diagnosis':
      return HiOutlineLightBulb;
    case 'Test':
      return HiOutlineBeaker;
    default:
      return HiCalendar;
  }
};

/** Timeline Component */
const MedicalHistoryTimeline = ({ history, onEdit }) => (
  <Card className="shadow-lg">
    <Timeline>
      {history.map((entry) => {
        const Icon = getEntryIcon(entry.type);
        return (
          <Timeline.Item key={entry.id}>
            <Timeline.Point icon={Icon} />
            <Timeline.Content>
              <Timeline.Time>{entry.date}</Timeline.Time>
              <Timeline.Title className="text-xl font-semibold text-gray-800">
                {entry.title}
              </Timeline.Title>
              <Timeline.Body>
                <p className="text-gray-600 mb-2">{entry.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {entry.type}
                  </span>
                  {entry.diagnosis && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      Diagnosis: {entry.diagnosis}
                    </span>
                  )}
                </div>
                <Button
                  color="light"
                  size="xs"
                  className="mt-2"
                  onClick={() => onEdit(entry)}
                >
                  <HiPencil className="mr-2 h-4 w-4" />
                  Edit Details
                </Button>
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        );
      })}
    </Timeline>
  </Card>
);

/** Modal Form Component */
const MedicalHistoryFormModal = ({
  show,
  onClose,
  onSubmit,
  initialData,
  entryTypes,
}) => {
  const [formData, setFormData] = useState({
    date: '',
    type: '',
    title: '',
    description: '',
    notes: '',
    diagnosis: '',
    treatment: '',
  });

  // Sync form data when initialData changes (i.e., when editing an entry)
  useEffect(() => {
    setFormData(
      initialData || {
        date: '',
        type: '',
        title: '',
        description: '',
        notes: '',
        diagnosis: '',
        treatment: '',
      }
    );
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => setFormData((prev) => ({ ...prev, date }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose} size="xl">
      <Modal.Header>
        {initialData && initialData.id
          ? 'Edit Medical History Entry'
          : 'Add New Medical History Entry'}
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="mb-2 block">
                Date
              </Label>
              <Datepicker
                id="date"
                name="date"
                value={formData.date}
                onSelectedDateChanged={handleDateChange}
                required
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="type" className="mb-2 block">
                Type
              </Label>
              <Select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select type</option>
                {entryTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="title" className="mb-2 block">
              Title
            </Label>
            <TextInput
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="description" className="mb-2 block">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full"
              rows={1}
            />
          </div>
          <div>
            <Label htmlFor="notes" className="mb-2 block">
              Notes
            </Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              required
              className="w-full"
              rows={1}
            />
          </div>
          <div>
            <Label htmlFor="diagnosis" className="mb-2 block">
              Diagnosis
            </Label>
            <TextInput
              id="diagnosis"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="treatment" className="mb-2 block">
              Treatment
            </Label>
            <Textarea
              id="treatment"
              name="treatment"
              value={formData.treatment}
              onChange={handleInputChange}
              className="w-full"
              rows={1}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-green-800">
              {initialData && initialData.id ? 'Update Entry' : 'Add Entry'}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

/** Main Page Component */
export default function MedicalHistoryPage() {
  const [history, setHistory] = useState(initialMedicalHistory);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);

  // Fetch medical history from the Realtime Database
  useEffect(() => {
    const dbRef = ref(db, 'medicalHistory');
    const callback = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object data into an array
        const events = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setHistory(events);
      } else {
        setHistory([]);
      }
    };
    onValue(dbRef, callback);

    // Cleanup listener on unmount
    return () => off(dbRef, 'value', callback);
  }, []);

  const openModal = (entry = null) => {
    setCurrentEntry(entry);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentEntry(null);
  };

  const handleFormSubmit = (data) => {
    if (currentEntry && currentEntry.id) {
      // Update existing entry
      setHistory((prev) =>
        prev.map((entry) =>
          entry.id === currentEntry.id ? { ...entry, ...data } : entry
        )
      );
    } else {
      // Create new entry with a unique id (using Date.now() for demo purposes)
      setHistory((prev) => [...prev, { id: Date.now(), ...data }]);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Medical History
        </h1>
        <Button className="bg-green-800" onClick={() => openModal()}>
          <HiPlus className="mr-2 h-5 w-5" />
          Add New Entry
        </Button>
      </div>
      <MedicalHistoryTimeline history={history} onEdit={openModal} />
      <MedicalHistoryFormModal
        show={modalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        initialData={currentEntry}
        entryTypes={entryTypes}
      />
    </div>
  );
}
