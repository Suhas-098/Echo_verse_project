import { Routes, Route, Navigate } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthstore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import { Toaster } from 'react-hot-toast';

function App() {

  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-background text-slate-200 relative overflow-hidden font-sans">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />
      <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/30 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-secondary/30 rounded-full blur-[100px] animate-pulse delay-1000" />

      {/* ROUTES */}
      <div className="relative z-10 h-screen flex flex-col">
        <Routes>
          <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
        </Routes>
      </div>

      <Toaster />

    </div>
  );
}

export default App;