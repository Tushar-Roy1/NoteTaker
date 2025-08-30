import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import OtpPage from './pages/OtpPage';
import NotesPage from './pages/NotesPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage/>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
