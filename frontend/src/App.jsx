import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCollege from "./components/AddCollege";
import Departments from "./components/Departments";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddCollege />} />
        <Route path="/departments" element={<Departments />} />
      </Routes>
    </Router>
  );
}

export default App;
