// router.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AuditPage from './pages/AuditPage';
import PropTypes from 'prop-types';
import AuditForm from './pages/AuditForm';

function Router({ isAuthenticated }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* สำหรับเส้นทางหลัก */}
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />}
        />
        {/* สำหรับเส้นทางของการตรวจสอบการตรวจสอบ */}
        <Route
          path="/audit"
          element={isAuthenticated ? <AuditPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/auditform/:GroupId"
          element={isAuthenticated ? <AuditForm /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

Router.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Router;
