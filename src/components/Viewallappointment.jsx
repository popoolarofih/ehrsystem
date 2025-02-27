import React, { useState, useEffect } from "react";
import { get, ref } from "firebase/database";
import { db} from "../lib/firebase";

export default function AllAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all appointments (no filtering on doctorUid)
    const appointmentsRef = ref(db, "appointments");
    get(appointmentsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Convert the appointments object into an array
          const appointmentsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setAppointments(appointmentsArray);
        } else {
          setAppointments([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading appointments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Appointments</h1>
      {appointments.length > 0 ? (
        <ul className="list-disc pl-5">
          {appointments.map((appt) => (
            <li key={appt.id} className="mb-2">
              {appt.date} at {appt.time} with Dr. {appt.doctorName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
}
