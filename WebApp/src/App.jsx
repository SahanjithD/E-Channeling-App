import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/home';
import SignIn from './pages/signin';
import SignUp from './pages/SignUp';
import Header from "./components/Header";
import Appointments from "./pages/Appointments";

const App = () => {
  return (
    <div>
    
      <Router>
        <Routes>
          <Route path="/Home" element={<Header><Home/></Header>} />
          <Route path="/Apointments" element={<Header><Appointments/></Header>} />
          <Route path="/signin" element={<Header><SignIn/></Header>} />
          <Route path="/signup" element={<Header><SignUp/></Header>} />
        </Routes>
      </Router>
      
    </div>
  );
};

export default App;