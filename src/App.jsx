import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard'; // Create this using the logic from my previous response
import Rooms from './pages/Rooms';
// import AddTenant from './pages/AddTenant';
import Payments from './pages/Payments';
import Tenants from './pages/Tenants';
import Staff from './pages/Staff';
import Maintenance from './pages/Maintenance';
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/tenants" element={<Tenants />} /> 
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/staff" element={<Staff />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;