import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { AuthProvider } from "./AuthContext"; // Import AuthProvider
import Home from './pages/Home';
import SignIn from './pages/signin';
import SignUp from './pages/SignUp';
import Header from "./components/Header";
import Appointments from "./pages/Appointments";
import MakeAppointment from "./pages/MakeAppointment";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/make-appointment" element={<MakeAppointment />} />
          </Routes>
        </Header>
      </Router>
    </AuthProvider>
  );
};

export default App;
