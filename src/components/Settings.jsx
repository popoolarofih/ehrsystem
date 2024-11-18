import React, { useState } from 'react';
import { Card, Button, TextInput, Tabs, Checkbox, Label } from 'flowbite-react';

export default function SettingsPage() {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    role: 'Doctor',
  });

  const handleProfileUpdate = (event) => {
    event.preventDefault();
    // Add backend call to update profile here
    alert('Profile updated!');
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    // Add backend call to change password here
    alert('Password changed successfully!');
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs.Group>
        <Tabs.Item title="User Profile">
          <Card>
            <form onSubmit={handleProfileUpdate}>
              <TextInput
                label="Full Name"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                required
              />
              <TextInput
                label="Email"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                required
              />
              <TextInput
                label="Role"
                value={userData.role}
                readOnly
              />
              <Button type="submit" className="mt-4">Save Changes</Button>
            </form>
          </Card>
        </Tabs.Item>

        <Tabs.Item title="Account Security">
          <Card>
            <form onSubmit={handlePasswordChange}>
              <TextInput
                label="New Password"
                type="password"
                required
              />
              <TextInput
                label="Confirm Password"
                type="password"
                required
              />
              <Button type="submit" className="mt-4">Update Password</Button>
            </form>
          </Card>
        </Tabs.Item>

        <Tabs.Item title="Notification Settings">
          <Card>
            <div className="space-y-4">
              <Checkbox id="email-alerts" />
              <Label htmlFor="email-alerts" className="ml-2">Receive email alerts for lab results</Label>
              <Checkbox id="appointment-reminders" />
              <Label htmlFor="appointment-reminders" className="ml-2">Receive appointment reminders</Label>
            </div>
            <Button className="mt-4">Save Preferences</Button>
          </Card>
        </Tabs.Item>

      </Tabs.Group>
    </div>
  );
}
