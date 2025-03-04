import FloatingShape from "./components/FloatingShape.tsx"
import { Navigate, Route, Routes , useLocation} from 'react-router-dom'
import SignUpPage from './pages/SignUpPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import EmailVerificationPage from './pages/EmailVerificationPage.tsx'
import { Toaster } from "react-hot-toast";
import { useAuthStore } from './store/authStore.ts'
import { ReactNode, useEffect } from 'react'
import HomePage from './pages/HomePage.tsx'
import LoadingSpinner from './components/LoadingSpinner.tsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.tsx'
import ResetPasswordPage from './pages/ResetPasswordPage.tsx'
import ExpensesPage from "./pages/ExpensesPage.tsx"
import PlantripPage from "./pages/PlantripPage.tsx"
import ConverterPage from "./pages/ConverterPage.tsx"
import AboutPage from "./pages/AboutPage.tsx"
import ExpenseFormPage from "./pages/ExpenseFormPage.tsx"

/*interface ProtectedRouteProps {
  children: ReactNode;
  requireVerification?: boolean;
}

// **Protects routes that require authentication**
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return <>{children}</>;
};*/

// **Redirect authenticated users away from auth pages (login, signup, etc.)**
const RedirectAuthenticatedUser: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const location = useLocation();
  const isHomePage = location.pathname === "/";


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <div
    className={`min-h-screen mx-auto flex items-center relative overflow-hidden ${
      isHomePage ? "bg-gray-100 flex flex-col min-h-screen w-338 bg-cover bg-fixed bg-center" : "bg-gradient-to-br from-[#145a32] via-[#28a745] to-[#a3e635]"
    }`}
  > {!["/","/expenses/add-expense","/expenses/edit-expense", "/expenses", "/plantrip", "/converter", "/about"].includes(location.pathname) && (
    <>
      <FloatingShape color="#111827" size="w-64 h-64" top="top-[-5%]" left="left-[20%]" delay={0} />
      <FloatingShape color="#052e16" size="w-48 h-48" top="top-[70%]" left="left-[80%]" delay={5} />
      <FloatingShape color="#14532d" size="w-32 h-32" top="top-[40%]" left="left-[-5%]" delay={2} />
    </>
  )}
  
      <Routes>
        {/* Home Page - Only for Authenticated and Verified Users */}
        <Route path="/" element={<HomePage />} />

        {/* Authentication Pages - Redirect Authenticated Users */}
        <Route path="/signup" element={<RedirectAuthenticatedUser><SignUpPage /></RedirectAuthenticatedUser>} />
        <Route path="/login" element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} />

        {/* Email Verification Page (Accessible by Unverified Users) */}
        <Route path="/verify-email" element={<EmailVerificationPage />} />

        {/* Password Reset Pages */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser><ResetPasswordPage /></RedirectAuthenticatedUser>} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/plantrip" element={<PlantripPage />} />
        <Route path="/converter" element={<ConverterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/expenses/add-expense" element={<ExpenseFormPage />} />
        <Route path="/expenses/edit-expense" element={<ExpenseFormPage />} />
        {/* 404 Fallback - Redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;


