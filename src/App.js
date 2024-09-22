import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'

import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Protected from "./components/Protected";
import Admissions from './components/Admissions';
import Applicants from './components/Applicants';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import FeeStructure from './components/FeeStructure';
import Admits from './components/Admits';
import ViewTeachers from './components/ViewTeachers';
import StudentGrades from './components/StudentGrades';
import ClassGrades from './components/ClassGrades';
import PayFees from './components/PayFees';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/feestructure" element={<FeeStructure />} />
          <Route path="/admits" element={<Admits />} />
          <Route path="/ViewTeachers" element={<ViewTeachers />} />
          <Route path="/StudentGrades" element={<StudentGrades />} />
          <Route path="/classGrades" element={<ClassGrades />} />
          <Route path="/payfees" element={<PayFees />} />
          <Route element={<Protected />}>
            <Route path="/logout" element={<Logout />} />
            <Route path="/Applicants" element={<Applicants />} />
            {/* <Route path="/addpeople/:id" element={<AddPeople />} /> */}
          </Route>
        </Routes>
      </Router>


    </div>
  );
}

export default App;
