import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import AddCollege from "./components/AddCollege";
import Departments from "./components/Departments";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./components/Home";
import DepartmentDetails from "./components/DepartmentDetails";

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

        {/* <Route path="/departments/:id" element={<DepartmentDetails />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
