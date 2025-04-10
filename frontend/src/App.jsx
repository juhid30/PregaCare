import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import PregnancyOnboardingForm from "./pages/PregnancyOnboardingForm.JSX";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboard" element={<PregnancyOnboardingForm />} />
      </Routes>
    </Router>
  );
}

export default App;
