import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Payments from './pages/Payments';
import Tenants from './pages/Tenants';
import Staff from './pages/Staff';
import Maintenance from './pages/Maintenance';
import Login from './pages/Login';
import Properties from './pages/Properties';
import Services from './pages/Services';
import PropertyDetails from './pages/PropertyDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import GroceryExpenses from './pages/GroceryExpenses';
import Visitors from './pages/Visitors';
import TenantsAdd from './pages/Tenant_add';
import AddRoom from './pages/AddRoom';
import AddVisitor from './pages/AddVisitor';
import EditRoom from './pages/EditRoom';

function App() {
  return (
    <Router basename="/smart-pg-portal-">
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/services" element={<Services />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* --- PROTECTED MANAGEMENT ROUTES --- */}
        {/* We wrap the Layout inside ProtectedRoute so all sub-routes are secured */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/visitors" element={<Visitors />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/grocery" element={<GroceryExpenses />} />
          <Route path="/tenants/add" element={<TenantsAdd />} />
          <Route path="/rooms/add" element={<AddRoom />} />
          <Route path="/rooms/edit/:id" element={<EditRoom />} />
          <Route path="/visitors/add" element={<AddVisitor />} />

        </Route>

        {/* Handle Unknown Routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;