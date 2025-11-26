import { useState } from "react";
import { useAuthStore } from "../store/useAuthstore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, LockIcon, MailIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {

  const [formData, setFormData] = useState({ Email: "", Password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 lg:p-6">
      <div className="relative w-full max-w-6xl glass-card rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row min-h-[600px]">
            {/* FORM CLOUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 lg:p-12 flex items-center justify-center md:border-r border-white/5 bg-surface/30 backdrop-blur-md">
              <div className="w-full max-w-md">
                {/* HEADING TEXT Title content*/}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                    <MessageCircleIcon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                  <p className="text-slate-400">Login to access to your Account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* EMAIL INPUT */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative group">
                      <MailIcon className="auth-input-icon" />

                      <input
                        type="email"
                        value={formData.Email}
                        onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                        className="input"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative group">
                      <LockIcon className="auth-input-icon" />

                      <input
                        type="password"
                        value={formData.Password}
                        onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
                        className="input"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button className="auth-btn" type="submit" disabled={isLoggingIn}>
                    {isLoggingIn ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Login In"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/signup" className="auth-link">
                    Don't have an account? Sign Up
                  </Link>
                </div>
              </div>
            </div>


            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-primary/10 to-transparent relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10 max-w-md text-center">
                <img
                  src="/login.png"
                  alt="Login Illustration"
                  className="w-full h-auto object-contain mb-8 rounded-2xl shadow-2xl shadow-primary/20 hover:scale-105 transition-transform duration-500"
                />
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">Connect anytime, anywhere</h3>
                  <p className="text-slate-400">Join our community and experience seamless communication like never before.</p>

                  <div className="mt-8 flex justify-center gap-3 flex-wrap">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage;