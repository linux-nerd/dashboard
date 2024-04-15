import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {DashboardPage } from "./pages/dashboard"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </Router>
  )
}

export default App
