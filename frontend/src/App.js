import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyLearningPlans from "./Pages/MyLearningPlans";
import CourseDetailPage from "./Pages/CourseDetailPage";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} /> 
        <Route path="/plans" element={<MyLearningPlans />} />
        <Route path="/plans/:id" element={<CourseDetailPage />} />
        <Route path="/Home" element={<HomePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
