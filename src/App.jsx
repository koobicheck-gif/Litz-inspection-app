import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import DashboardPage from './pages/DashboardPage';
import InspectionFormPage from './pages/InspectionFormPage';
import ReportPreviewPage from './pages/ReportPreviewPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/inspection/:id" element={<InspectionFormPage />} />
            <Route path="/report/:id" element={<ReportPreviewPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
