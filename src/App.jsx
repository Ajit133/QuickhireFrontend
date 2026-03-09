import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrowseJobsPage from './pages/BrowseJobsPage';
import JobDetailPage from './pages/JobDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse-jobs" element={<BrowseJobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
