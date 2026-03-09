import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrowseJobsPage from './pages/BrowseJobsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse-jobs" element={<BrowseJobsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
