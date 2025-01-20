import { Routes, Route, Navigate,BrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

//Protected route that require authentications
const ProtectRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

//Redirect authenticated user to the homepage
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // console.log("isAuthenticated",isAuthenticated);
  // console.log("user",user);
  if (isCheckingAuth) return <LoadingSpinner />;
  return (
    <>
      <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-white-900 to-emerald-700 flex items-center justify-center relative overflow-hidden">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectRoute>
                <HomePage />
              </ProtectRoute>
            }
          />
          <Route
            path="/register"
            element={
              <RedirectAuthenticatedUser>
                <RegisterPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectRoute>
                <ProfilePage />
              </ProtectRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;
