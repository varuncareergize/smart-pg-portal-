import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import ExploreProperties from './components/ExploreProperties';

// Route-level chunks keep the first page load lean; pages load only when visited.
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Rooms = lazy(() => import('./pages/Rooms'));
const Payments = lazy(() => import('./pages/Payments'));
const Tenants = lazy(() => import('./pages/Tenants'));
const Staff = lazy(() => import('./pages/Staff'));
const Maintenance = lazy(() => import('./pages/Maintenance'));
const Login = lazy(() => import('./pages/Login'));
const Properties = lazy(() => import('./pages/Properties'));
const Services = lazy(() => import('./pages/Services'));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const GroceryExpenses = lazy(() => import('./pages/GroceryExpenses'));
const Visitors = lazy(() => import('./pages/Visitors'));
const TenantsAdd = lazy(() => import('./pages/Tenant_add'));
const AddRoom = lazy(() => import('./pages/AddRoom'));
const AddVisitor = lazy(() => import('./pages/AddVisitor'));
const EditRoom = lazy(() => import('./pages/EditRoom'));
const AddStaff = lazy(() => import('./pages/AddStaff'));
const AddTicket = lazy(() => import('./pages/AddTicket'));
const Notifications = lazy(() => import('./pages/Notifications'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen bg-neutral-50" />}>
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
          <Route path="/staff/add" element={<AddStaff />} />
          <Route path="/maintenance/new" element={<AddTicket />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>

        {/* Handle Unknown Routes */}
        <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
