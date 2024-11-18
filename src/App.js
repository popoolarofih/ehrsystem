import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainDashboard from './components/Maindasboard';
import PatientListPage from './components/Pathientlistpage';
import PatientProfile from './components/PatientProfile';
import MedicalHistoryPage from './components/Medicalhistory';
import AllergiesPage from './components/Allegies';
import MedicationsPage from './components/Medications';
import LabResultsPage from './components/Labresult';
import TreatmentRecommendationsPage from './components/Recommedation';
import LandingPage from './components/LandingPage';
import SignUpPage from './components/SignupPage';
import NotificationsPage from './components/Alert';
import SettingsPage from './components/Settings';
import LoginPage from './components/Login';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/patientlist" element={<PatientListPage />} />
        <Route path="/patientprofile" element={<PatientProfile />} />
        <Route path="/medicalhistory" element={<MedicalHistoryPage />} />
        <Route path="/allergies" element={<AllergiesPage />} />
        <Route path="/medications" element={<MedicationsPage />} />
        <Route path="/labresults" element={<LabResultsPage/>} />
        <Route path="/recommendation" element={<TreatmentRecommendationsPage/>} />
        <Route path="/notification" element={<NotificationsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
