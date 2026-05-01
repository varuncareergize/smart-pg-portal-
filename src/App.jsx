import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home'; // The high-end landing page we just created
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Payments from './pages/Payments';
import Tenants from './pages/Tenants';
import Staff from './pages/Staff';
import Maintenance from './pages/Maintenance'; // The portal-style maintenance page
import Login from './pages/Login';
import Properties from './pages/Properties';
import Services from './pages/Services';
function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTE: Does not use the Sidebar Layout */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/services" element={<Services />} />
        {/* PORTAL ROUTES: Wrapped in Layout (Sidebar/Header) */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/tenants" element={<Tenants />} />
                <Route path="/maintenance" element={<Maintenance />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/staff" element={<Staff />} />
              
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;