import { Routes, Route, Navigate } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import {Toaster} from 'react-hot-toast';

function App() {

const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    //Decorative animated background container
    <div className="min-h-screen relative overflow-hidden">

      {/* ===========================
          CLEAN ANIME GRADIENT BACKGROUND
      ============================ */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1a26] via-[#1a3142] to-[#24172b]"></div>

      {/* Soft anime glow mist */}
      <div
        className="absolute inset-0 blur-[120px]
        bg-[radial-gradient(circle_at_30%_40%,rgba(0,255,200,0.22),transparent_60%),
           radial-gradient(circle_at_75%_65%,rgba(170,70,255,0.25),transparent_65%)]"
      ></div>

    
      {/* ===========================
          ANIME LIGHT BEAM (very subtle)
      ============================ */}
      <div
        className="absolute top-1/3 left-0 w-full h-[130px]
        bg-gradient-to-r from-transparent via-[#00ffc833] to-transparent
        blur-[50px] animate-shimmer"
      />


      {/* ===========================
          CUSTOM ANIMATIONS
      ============================ */}
      <style>
        {`
          /* Float animations */
          @keyframes float1 {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
          }
          @keyframes float2 {
            0% { transform: translateY(0); }
            50% { transform: translateY(-28px); }
            100% { transform: translateY(0); }
          }
          @keyframes float3 {
            0% { transform: translateY(0); }
            50% { transform: translateY(-16px); }
            100% { transform: translateY(0); }
          }

          .animate-float1 { animation: float1 6s ease-in-out infinite; }
          .animate-float2 { animation: float2 7s ease-in-out infinite; }
          .animate-float3 { animation: float3 8s ease-in-out infinite; }

          /* Light beam shimmer */
          @keyframes shimmer {
            0% { opacity: 0.15; transform: translateX(-25%); }
            50% { opacity: 0.5; transform: translateX(25%); }
            100% { opacity: 0.15; transform: translateX(-25%); }
          }
          .animate-shimmer {
            animation: shimmer 8s ease-in-out infinite;
          }
        `}
      </style>


        {/* ===========================
          ROUTES
      ============================ */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"}/>} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"}/>} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"}/>} />
        </Routes>
      </div>

      <Toaster/>

    </div>
  );
}

export default App;
