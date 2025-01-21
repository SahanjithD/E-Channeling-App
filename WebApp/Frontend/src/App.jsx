import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { AuthProvider } from "./AuthContext";
import Home from './pages/Home';
import SignIn from './pages/signin';
import SignUp from './pages/SignUp';
import Header from "./components/Header";
import Appointments from "./pages/Appointments";
import MakeAppointment from "./pages/MakeAppointment";

const App = () => {
  return (
    <div>
    
      <Router>
        <Routes>
          <Route path="/" element={<Header><Home/></Header>} />
          <Route path="/Apointments" element={<Header><Appointments/></Header>} />
          <Route path="/signin" element={<Header><SignIn/></Header>} />
          <Route path="/signup" element={<Header><SignUp/></Header>} />
          <Route path="/make-appointment" element={<AuthProvider><Header><MakeAppointment/></Header></AuthProvider>} />
        </Routes>
      </Router>
      
    </div>
  );
};

export default App;