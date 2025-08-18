// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router';

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useSelector((state) => state.admin);
//   return isAuthenticated ? children : <Navigate to="/admin-login" />;
// };

// export default ProtectedRoute;


// ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.admin);

  if (loading) return <p className="text-center mt-20">Checking authentication...</p>;

  return isAuthenticated ? children : <Navigate to="/admin-login" replace />;
};

export default ProtectedRoute;
