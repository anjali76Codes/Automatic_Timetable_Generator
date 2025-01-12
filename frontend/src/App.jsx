import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import AddCollege from "./components/AddCollege";
import Departments from "./components/Departments";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./components/Home";
import DepartmentDetails from "./components/DepartmentDetails";
import CollegeDetails from "./pages/CollegeDetails";
import DepDetails from "./pages/DepDetails";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar is outside Routes to make it visible on all pages */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/departments/:collegeCode" element={<Departments />} />
        <Route path="/add-college" element={<AddCollege />} />
        <Route path="/getCollege" element={<CollegeDetails />} />
        <Route path="/getDeps" element={<DepDetails />} />

        <Route path="/departments/:collegeCode/:id" element={<DepartmentDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
