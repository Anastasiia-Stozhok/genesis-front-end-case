import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CatalogPage, CoursePage } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/course/:id" element={<CoursePage />} />
      </Routes>
    </Router>
  );
}

export default App;
