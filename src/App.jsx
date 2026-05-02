import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
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

function App() {
  return (
   
    <Router>
      <Routes>
        {/* --- PUBLIC WEBSITE ROUTES --- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/services" element={<Services />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* --- MANAGEMENT PORTAL ROUTES (Wrapped in Layout) --- */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/visitors" element={<Visitors />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/grocery" element={<GroceryExpenses />} />
          <Route path='/tenants/add' element={<TenantsAdd />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;