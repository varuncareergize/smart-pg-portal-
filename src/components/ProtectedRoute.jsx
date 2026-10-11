import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../api';

const ProtectedRoute = ({ children }) => {
  useTranslation();

  // Check if user is logged in (looking for token in localStorage)
  const isAuthenticated = getAuthToken();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
