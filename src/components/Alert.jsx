import React, { useState, useEffect } from 'react';
import { Card, Checkbox, Button, Alert } from 'flowbite-react';

// Sample lab data with critical value simulation
const labData = [
  { id: 1, type: 'Blood Test', name: 'Blood Glucose', value: 200, critical: true },
  { id: 2, type: 'Allergy', name: 'Peanut Allergy Reaction', critical: true },
  { id: 3, type: 'Medication', name: 'Aspirin Interaction', critical: false },
];

export default function NotificationsPage() {
  const [preferences, setPreferences] = useState({
    labs: true,
    allergies: true,
    medications: true,
    urgencyLevel: 'critical',
  });
  const [alerts, setAlerts] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    // Simulate real-time notifications for critical events
    const interval = setInterval(() => {
      const criticalAlert = labData.find(
        (alert) =>
          alert.critical &&
          ((preferences.labs && alert.type === 'Blood Test') ||
            (preferences.allergies && alert.type === 'Allergy') ||
            (preferences.medications && alert.type === 'Medication'))
      );

      if (criticalAlert) {
        setAlerts((prev) => [...prev, criticalAlert]);
        setAlertMessage(`Critical alert: ${criticalAlert.name}`);
        setTimeout(() => setAlertMessage(''), 3000);
      }
    }, 10000); // Update every 10 seconds for demo purposes

    return () => clearInterval(interval);
  }, [preferences]);

  // Update preferences based on user selection
  const handlePreferenceChange = (e) => {
    const { name, checked, value } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: checked !== undefined ? checked : value,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications and Alerts</h1>

      {/* Real-Time Notification Display */}
      {alertMessage && (
        <Alert color="danger" onDismiss={() => setAlertMessage('')}>
          {alertMessage}
        </Alert>
      )}

      {/* User Preferences for Notifications */}
      <Card className="mb-4">
        <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
        <form className="space-y-4">
          <div className="flex items-center">
            <Checkbox
              id="labs"
              name="labs"
              checked={preferences.labs}
              onChange={handlePreferenceChange}
            />
            <label htmlFor="labs" className="ml-2">Lab Results</label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="allergies"
              name="allergies"
              checked={preferences.allergies}
              onChange={handlePreferenceChange}
            />
            <label htmlFor="allergies" className="ml-2">Allergies</label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="medications"
              name="medications"
              checked={preferences.medications}
              onChange={handlePreferenceChange}
            />
            <label htmlFor="medications" className="ml-2">Medications</label>
          </div>

          <div className="mt-4">
            <label className="block font-semibold mb-2">Urgency Level</label>
            <select
              name="urgencyLevel"
              value={preferences.urgencyLevel}
              onChange={handlePreferenceChange}
              className="border rounded-md px-4 py-2"
            >
              <option value="critical">Critical Only</option>
              <option value="all">All Alerts</option>
            </select>
          </div>
        </form>
      </Card>

      {/* Notification History */}
      <Card className="mb-4">
        <h2 className="text-xl font-bold mb-4">Notification History</h2>
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <Alert key={index} color="info" className="mb-2">
              {alert.name} - {alert.type}
            </Alert>
          ))
        ) : (
          <p>No notifications to show.</p>
        )}
      </Card>
    </div>
  );
}
