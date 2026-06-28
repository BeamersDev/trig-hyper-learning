import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import ChapterPage from './content/ChapterContent';
import PracticePage from './pages/PracticePage';
import SolverPage from './pages/SolverPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chapter/:chapter/:section" element={<ChapterPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/solver" element={<SolverPage />} />
      </Routes>
    </Layout>
  );
}
