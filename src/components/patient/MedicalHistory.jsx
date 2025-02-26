"use client";

import React, { useState, useEffect } from "react";
import { Timeline, Card, Button, Badge, Accordion, Spinner } from "flowbite-react";
import { HiCalendar, HiClipboardList } from "react-icons/hi";
import { ref, onValue, off } from "firebase/database";
import { auth, db } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function MedicalHistory() {
  const [medicalEvents, setMedicalEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const dbRef = ref(db, "medicalHistory");
    const callback = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const events = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMedicalEvents(events);
      } else {
        setMedicalEvents([]);
      }
      setLoading(false);
    };

    onValue(dbRef, callback);

    return () => {
      off(dbRef, "value", callback);
    };
  }, []);

  const getEventIcon = (type) => {
    switch (type) {
      case "Visit":
        return <HiCalendar className="h-6 w-6" />;
      case "Test":
        return <HiClipboardList className="h-6 w-6" />;
      default:
        return <HiCalendar className="h-6 w-6" />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Medical History</h1>
        <Button color="blue" size="sm" onClick={() => navigate("/patientdashboard")}>
          Back to Dashboard
        </Button>
      </header>

      {/* Content */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Section */}
        <section className="lg:col-span-2">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Timeline of Medical Events</h2>
            {loading ? (
              <div className="flex justify-center p-4">
                <Spinner size="lg" />
              </div>
            ) : medicalEvents.length === 0 ? (
              <p className="text-gray-500 text-center">No medical history available.</p>
            ) : (
              <Timeline>
                {medicalEvents.map((event) => (
                  <Timeline.Item key={event.id}>
                    <Timeline.Point icon={getEventIcon(event.type)} />
                    <Timeline.Content>
                      <Timeline.Time>{event.date}</Timeline.Time>
                      <Timeline.Title>{event.title}</Timeline.Title>
                      <p className="text-gray-700 mb-2">{event.description}</p>
                      <Button color="light" size="xs" onClick={() => setSelectedEvent(event)}>
                        View Details
                      </Button>
                    </Timeline.Content>
                  </Timeline.Item>
                ))}
              </Timeline>
            )}
          </Card>
        </section>

        {/* Detailed Sections */}
        <section className="lg:col-span-1 space-y-6">
          {/* Event Details */}
          <Card>
            <h2 className="text-xl font-semibold mb-4">Event Details</h2>
            {selectedEvent ? (
              <div>
                <h3 className="text-lg font-medium mb-2">{selectedEvent.title}</h3>
                <p className="text-gray-700 mb-2">{selectedEvent.date}</p>
                <p className="text-gray-700 mb-4">{selectedEvent.description}</p>
                <Accordion collapseAll>
                  <Accordion.Panel>
                    <Accordion.Title>Diagnoses and Procedures</Accordion.Title>
                    <Accordion.Content>
                      <div className="mb-2">
                        <strong>Diagnoses:</strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedEvent.diagnoses?.map((diagnosis, index) => (
                            <Badge key={index} color="info">
                              {diagnosis}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <strong>Procedures:</strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedEvent.procedures?.map((procedure, index) => (
                            <Badge key={index} color="success">
                              {procedure}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                </Accordion>
              </div>
            ) : (
              <p className="text-gray-700">Select an event to view details.</p>
            )}
          </Card>

          {/* Summary */}
          <Card>
            <h2 className="text-xl font-semibold mb-6">Medical History Summary</h2>
            {loading ? (
              <div className="flex justify-center">
                <Spinner size="lg" />
              </div>
            ) : (
              <ul className="list-disc list-inside text-gray-700">
                <li>Total events: {medicalEvents.length}</li>
                {medicalEvents.length > 0 && (
                  <>
                    <li>Last visit: {medicalEvents[0].date}</li>
                    <li>Ongoing conditions: Hypertension</li>
                  </>
                )}
              </ul>
            )}
          </Card>
        </section>
      </main>
    </div>
  );
}
