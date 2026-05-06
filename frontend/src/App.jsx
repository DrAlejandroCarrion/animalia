import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CrearDenunciaPage from './pages/CrearDenunciaPage';
import SeguimientoPage from './pages/SeguimientoPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/denunciar" element={<CrearDenunciaPage />} />
          <Route path="/seguimiento" element={<SeguimientoPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
