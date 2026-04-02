import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IncidentList from './components/IncidentList.tsx';
import IncidentForm from './components/IncidentForm';
import IncidentDetail from './components/IncidentDetail'; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IncidentList />} />
        <Route path="/incident/:id" element={<IncidentDetail />} />
        <Route path="/add" element={<IncidentForm />} />
      </Routes>
    </Router>
  );
};

export default App;