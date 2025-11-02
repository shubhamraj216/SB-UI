"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Chrome, Github, Linkedin } from "lucide-react";
import { background, text, brand, gradients, radialGradients, dark, border, shadows } from "@/lib/colors";
import { useAuth } from "@/context/AuthContext";

export default function CrazyLoginPage() {
  const router = useRouter();
  const { login, signup, isAuthenticated } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState<'candidate' | 'recruiter' | 'interviewer'>('candidate');
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/profile');
    }
  }, [isAuthenticated, router]);

  const filledCount = mode === 'login' 
    ? [email, password].filter(Boolean).length
    : [name, email, password].filter(Boolean).length;
  const totalCount = mode === 'login' ? 2 : 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password || (mode === 'signup' && !name)) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    try {
      if (mode === 'login') {
        await login(email, password, userType);
      } else {
        await signup(name, email, password, userType);
      }
      
      // Show success animation
      setShowConfetti(true);
      
      // Redirect to profile after short delay
      setTimeout(() => {
        router.push('/profile');
      }, 1500);
      
    } catch (err) {
      setError("Authentication failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 overflow-hidden" style={{ background: gradients.background }}>
      {/* floating background blobs - subtle professional effect */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="absolute w-72 h-72 rounded-full blur-3xl mix-blend-multiply opacity-30"
          style={{ background: radialGradients.navy }}
          animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl mix-blend-multiply opacity-20"
          style={{ background: radialGradients.sky }}
          animate={{ x: [30, -30, 30], y: [15, -15, 15] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="relative w-full max-w-6xl grid grid-cols-12 gap-6 z-10">
        {/* Left - Visual playground */}
        <div className="col-span-7 backdrop-blur-md rounded-3xl p-8 overflow-hidden relative border bg-white/80" style={{ borderColor: border.light }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: text.primary }}>Scholar Bharat</h1>
              <p className="text-sm" style={{ color: text.muted }}>Where interviews become unforgettable</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                style={{ 
                  backgroundColor: dark['8'], 
                  color: text.primary,
                  border: `1px solid ${border.default}`
                }}
              >
                {mode === "login" ? "Switch to Signup" : "Switch to Login"}
              </button>

            </div>
          </div>

          {/* hero spectacle */}
          <motion.div
            className="rounded-2xl p-6 border shadow-lg"
            style={{ 
              background: background.white, 
              borderColor: border.light,
              boxShadow: `0 4px 16px ${shadows.subtle}`
            }}
            initial={{ scale: 0.98, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80 }}
          >
            <div className="flex items-center gap-6">
              <motion.div
                className="w-28 h-28 rounded-xl flex items-center justify-center text-2xl font-bold text-white cursor-grab"
                whileHover={{ scale: 1.05 }}
                drag
                dragConstraints={{ left: -20, right: 20, top: -10, bottom: 10 }}
                style={{ background: gradients.navySky }}
              >
                SB
              </motion.div>

              <div>
                <h2 className="text-2xl font-bold" style={{ color: text.primary }}>Make your mark professionally</h2>
                <p className="text-sm" style={{ color: text.muted }}>Professional interviews, live feedback, and smart matching.</p>
              </div>
            </div>

            {/* badges that respond subtly when form grows */}
            <div className="mt-6 flex gap-4 flex-wrap">
              {['Portfolio Verified','Code Score: 94','Culture Fit: A+'].map((b, i) => (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: filledCount > i ? -6 * (i+1) : 0, scale: filledCount > i ? 1.05 : 1 }}
                  transition={{ type: 'spring', stiffness: 140, delay: i*0.05 }}
                  className="px-3 py-1 rounded-full text-xs border"
                  style={{ 
                    backgroundColor: dark['8'], 
                    borderColor: border.default,
                    color: text.primary
                  }}
                >
                  {b}
                </motion.div>
              ))}
            </div>

            {/* interactive timeline with pulses */}
            <div className="mt-8">
              <div className="h-3 rounded-full overflow-hidden relative" style={{ backgroundColor: dark['10'] }}>
                <motion.div
                  className="h-3 rounded-full absolute left-0"
                  style={{ background: gradients.navySky }}
                  animate={{ 
                    width: `${Math.min(100, (filledCount/totalCount)*100)}%`, 
                    boxShadow: filledCount ? `0 6px 20px ${shadows.skyGlow}` : 'none' 
                  }}
                  transition={{ type: 'spring', stiffness: 90 }}
                />
                <motion.div
                  className="absolute -right-3 top-[-6px] w-6 h-6 rounded-full"
                  style={{ backgroundColor: dark['20'], border: `2px solid ${border.default}` }}
                  animate={{ x: filledCount ? -Math.max(0, (totalCount-filledCount) * 18) : 0, scale: filledCount ? 1.1 : 1 }}
                  transition={{ type: 'spring', stiffness: 140 }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs" style={{ color: text.muted }}>
                <div>Start</div>
                <div>{filledCount}/{totalCount}</div>
                <div>Finish</div>
              </div>
            </div>

            {/* panel with moving dots */}
            <div className="mt-6 relative rounded-xl p-4 overflow-hidden border" style={{ backgroundColor: dark['5'], borderColor: border.light }}>
              <motion.div
                className="absolute w-2 h-2 rounded-full"
                style={{ backgroundColor: brand.sky }}
                animate={{ x: [10, 220, 50], y: [10, 80, 10] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-3 h-3 rounded-full"
                style={{ backgroundColor: brand.navyLight }}
                animate={{ x: [150, 20, 180], y: [40, 10, 120] }}
                transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
              />

              <p className="text-sm" style={{ color: text.secondary }}>Recruiters nearby — tracking your progress.</p>
            </div>

          </motion.div>

        </div>

        {/* Right - Auth form area */}
        <div className="col-span-5 rounded-3xl p-8 border flex flex-col justify-center relative overflow-hidden bg-white/90 backdrop-blur-sm" style={{ borderColor: border.light }}>

          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full blur-2xl opacity-40" style={{ background: gradients.navySky }} />

          <h3 className="text-2xl font-bold mb-4" style={{ color: text.primary }}>{mode === 'login' ? 'Welcome Back' : 'Create with Scholar Bharat'}</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <motion.label className="block text-sm" style={{ color: text.secondary }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                Full name
                <motion.input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="mt-2 w-full px-4 py-3 rounded-xl border outline-none focus:ring-0"
                  style={{ 
                    backgroundColor: background.white, 
                    borderColor: border.default,
                    color: text.primary
                  }}
                  whileFocus={{ scale: 1.01, borderColor: brand.sky }}
                />
              </motion.label>
            )}

            <motion.label className="block text-sm" style={{ color: text.secondary }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              I am a
              <motion.select
                value={userType}
                onChange={(e) => setUserType(e.target.value as 'candidate' | 'recruiter' | 'interviewer')}
                className="mt-2 w-full px-4 py-3 rounded-xl border outline-none focus:ring-0"
                style={{ 
                  backgroundColor: background.white, 
                  borderColor: border.default,
                  color: text.primary
                }}
                whileFocus={{ scale: 1.01, borderColor: brand.sky }}
              >
                <option value="candidate" className="bg-white">Candidate (Looking for Jobs)</option>
                <option value="recruiter" className="bg-white">Recruiter (Hiring)</option>
                <option value="interviewer" className="bg-white">Interviewer (Conduct Interviews)</option>
              </motion.select>
            </motion.label>

            <label className="block text-sm" style={{ color: text.secondary }}>
              Email
              <motion.input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourdomain.com"
                className="mt-2 w-full px-4 py-3 rounded-xl border outline-none focus:ring-0"
                style={{ 
                  backgroundColor: background.white, 
                  borderColor: border.default,
                  color: text.primary
                }}
                whileFocus={{ scale: 1.01, borderColor: brand.sky }}
                animate={{ boxShadow: email ? `0 6px 20px ${shadows.skyGlow}` : 'none' }}
              />
            </label>

            <label className="block text-sm" style={{ color: text.secondary }}>
              Password
              <motion.input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full px-4 py-3 rounded-xl border outline-none focus:ring-0"
                style={{ 
                  backgroundColor: background.white, 
                  borderColor: border.default,
                  color: text.primary
                }}
                whileFocus={{ scale: 1.01, borderColor: brand.sky }}
                animate={{ x: password ? -3 : 0 }}
              />
            </label>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input id="remember" type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                <label htmlFor="remember" className="text-sm" style={{ color: text.muted }}>Remember me</label>
              </div>

              <a className="text-sm underline" style={{ color: brand.sky }} href="#">Forgot?</a>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl text-sm" style={{ backgroundColor: '#fee', color: '#c00' }}>
                {error}
              </div>
            )}

            <div className="flex gap-3 items-center">
              <motion.button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-xl font-semibold text-white shadow-lg disabled:opacity-50"
                style={{ background: gradients.navySky }}
                whileHover={!isLoading ? { scale: 1.02, boxShadow: `0 8px 24px ${shadows.navyGlow}` } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Create Account'}
              </motion.button>

            </div>

            <div className="text-center text-xs" style={{ color: text.muted }}>Or continue with</div>

            <div className="flex gap-3 justify-center">
              {[
                { name: 'Google', Icon: Chrome },
                { name: 'GitHub', Icon: Github },
                { name: 'LinkedIn', Icon: Linkedin }
              ].map(({ name, Icon }) => (
                <motion.button
                  key={name}
                  className="px-3 py-2 rounded-lg text-sm border flex items-center gap-2"
                  style={{ 
                    backgroundColor: background.white, 
                    color: text.primary,
                    borderColor: border.default
                  }}
                  whileHover={{ y: -2, borderColor: brand.sky }}
                >
                  <Icon size={16} />
                  {name}
                </motion.button>
              ))}
            </div>
          </form>

          {/* Animated assistant */}
          <AnimatePresence>
            <motion.div
              key={filledCount + mode}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: filledCount ? -3 : 0, scale: filledCount ? 1.03 : 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 180, damping: 16 }}
              className="mt-6 flex items-center gap-3"
            >
              <motion.div
                animate={{ y: [0, -4, 0, -3, 0] }}
                transition={{ repeat: Infinity, duration: filledCount ? 3 : 6, ease: 'easeInOut' }}
                className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white"
                style={{ background: gradients.navySky }}
              >
                AI
              </motion.div>

              <div>
                <div className="text-sm font-medium" style={{ color: text.primary }}>Assistant</div>
                <div className="text-xs" style={{ color: text.muted }}>{mode === 'login' ? (filledCount >= totalCount ? 'Ready to proceed' : 'Fill email & password') : (filledCount >= totalCount ? 'Welcome aboard!' : 'Fill all fields to continue')}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* confetti celebration */}
          <AnimatePresence>
            {showConfetti && (
              <motion.div className="absolute inset-0 flex items-start justify-center pointer-events-none">
                <motion.div
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-wrap gap-2 justify-center mt-12"
                >
                  {Array.from({ length: 48 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -10, opacity: 0, rotate: 0 }}
                      animate={{ y: 200 + Math.random() * 300, opacity: 1, rotate: Math.random() * 720 }}
                      transition={{ duration: 1.8, ease: 'easeOut' }}
                      className="w-2 h-4"
                      style={{ background: [brand.navy, brand.sky, brand.navyLight, brand.skyBright][i%4] }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

    </div>
  );
}

