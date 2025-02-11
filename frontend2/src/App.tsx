import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectPage from "./pages/ProjectPage";
import ApplyPage from "./pages/ApplyPage";
import CreateProjectPage from "./pages/CreateProjectPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectsPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/apply/:id" element={<ApplyPage  />} />
        <Route path="/create-project" element={<CreateProjectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
