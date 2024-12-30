import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/home';
import SignIn from './pages/signin';
import SignUp from './pages/SignUp';
import Banner from "./components/Banner";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
    
      <Router>
        <Routes>
          <Route path="/" element={<Header><Home/></Header>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
      
    </div>
  );
};

export default App;