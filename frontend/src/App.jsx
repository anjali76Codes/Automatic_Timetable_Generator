import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCollege from "./components/AddCollege";
import Departments from "./components/Departments";
import DepartmentDetails from "./components/DepartmentDetails"; // Import the new DepartmentDetails page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddCollege />} />
        <Route path="/departments" element={<Departments />} />
        {/* New route for department details */}
        <Route path="/department/:id" element={<DepartmentDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
