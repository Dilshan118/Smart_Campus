import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Building2, Info, AlertTriangle, Ticket, Sparkles, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  const errorMessage = error === 'access_denied'
    ? 'Your access request was declined. Please contact a campus administrator.'
    : error === 'server_error'
    ? 'A server error occurred during sign-in. Please check the backend logs and try again.'
    : error
    ? 'Sign-in failed. Please try again.'
    : null;

  const handleGoogleLogin = () => {
    const from = location.state?.from?.pathname || '/';
    localStorage.setItem('auth_redirect', from);

    const base = import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:8080';
    window.location.href = `${base}/oauth2/authorization/google`;
  };

  return (
    <div className="login-container">
      <style>{`
        .login-container {
          display: flex;
          min-height: 100vh;
          background-color: var(--bg-primary);
          flex-wrap: wrap;
          font-family: var(--font-body);
          position: relative;
          overflow: hidden;
        }

        /* Base Typography Overrides for Premium Aesthetic */
        .login-container h1, .login-container h2, .login-container h3 {
          font-family: var(--font-display);
          letter-spacing: -0.03em;
        }

        /* Ambient Glow System */
        .ambient-bg-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(77, 63, 203, 0.08) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
          z-index: 1;
        }
        .glow-1 { top: -10%; right: -5%; }
        .glow-2 { bottom: -15%; left: 30%; }

        /* Left Panel Styling */
        .login-left {
          flex: 1;
          min-width: 460px;
          background: linear-gradient(135deg, #180994 0%, #2a14b4 50%, #4d3fcb 100%);
          padding: 4.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: white;
          position: relative;
          overflow: hidden;
          box-shadow: 10px 0 40px rgba(0, 0, 0, 0.08);
          z-index: 2;
        }

        /* Structural Overlay Grid for the Monolith */
        .login-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 30px 30px;
          mask-image: radial-gradient(circle at 30% 30%, black, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at 30% 30%, black, transparent 80%);
          pointer-events: none;
        }

        /* Floating Light Orbs on Left Panel */
        .panel-orb-1 {
          position: absolute;
          top: 15%;
          left: 10%;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(40px);
          animation: floatOrb1 18s infinite alternate ease-in-out;
          pointer-events: none;
        }

        .panel-orb-2 {
          position: absolute;
          bottom: 10%;
          right: -5%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(77, 63, 203, 0.4) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(50px);
          animation: floatOrb2 22s infinite alternate ease-in-out;
          pointer-events: none;
        }

        @keyframes floatOrb1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, 50px) scale(1.15); }
        }

        @keyframes floatOrb2 {
          0% { transform: translate(0, 0) scale(1.2); }
          100% { transform: translate(-40px, -30px) scale(0.9); }
        }

        /* Feature Cards (Glassmorphic Pills) */
        .feature-cards-grid {
          display: grid;
          gap: 1.25rem;
          margin-top: 3.5rem;
          margin-bottom: 2rem;
          max-width: 90%;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
          display: flex;
          gap: 1.25rem;
          align-items: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
        }

        .feature-card:hover {
          background: rgba(255, 255, 255, 0.09);
          transform: translateX(6px);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .feature-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: white;
          transition: transform 0.3s ease;
        }

        .feature-card:hover .feature-icon-wrapper {
          transform: scale(1.1) rotate(5deg);
        }

        .feature-text h3 {
          font-size: 0.95rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.15rem;
        }

        .feature-text p {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.4;
          margin: 0;
        }

        /* Right Panel Styling */
        .login-right {
          flex: 1.25;
          min-width: 360px;
          padding: 4.5rem clamp(2rem, 8vw, 8rem);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          z-index: 2;
          background-color: transparent;
        }

        /* Fluid Entrance Card */
        .login-card-container {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(30px) saturate(190%);
          -webkit-backdrop-filter: blur(30px) saturate(190%);
          border: 1px solid rgba(255, 255, 255, 0.6);
          padding: 3rem;
          border-radius: 28px;
          box-shadow: 
            0 4px 30px rgba(42, 20, 180, 0.02),
            0 30px 60px rgba(0, 0, 0, 0.05);
          animation: cardEntrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
          position: relative;
        }

        @keyframes cardEntrance {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Dynamic Google Button styling */
        .google-btn {
          width: 100%;
          padding: 16px 24px;
          font-size: 1rem;
          font-weight: 600;
          font-family: var(--font-body);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          background: white;
          color: var(--text-main);
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: var(--radius);
          cursor: pointer;
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.03),
            0 1px 2px rgba(0, 0, 0, 0.02);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .google-btn:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 12px 24px -8px rgba(42, 20, 180, 0.15),
            0 4px 12px rgba(0, 0, 0, 0.05);
          border-color: rgba(42, 20, 180, 0.2);
        }

        .google-btn:active {
          transform: translateY(0) scale(0.985);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);
        }

        /* Custom Separator Overlay */
        .divider-container {
          margin: 2.5rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.06) 50%, transparent);
        }

        .divider-text {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 700;
        }

        /* Informational Box Styling */
        .info-box {
          background-color: var(--bg-surface-elevated);
          padding: 1.5rem;
          border-radius: 16px;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          border: 1px solid rgba(0, 0, 0, 0.02);
          transition: all 0.3s ease;
        }

        .info-box:hover {
          background-color: rgba(255,255,255,0.4);
          transform: translateY(1px);
        }

        .info-badge {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: white;
        }

        /* Operational System Status Pulse */
        .system-status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background-color: var(--success);
          border-radius: 50%;
          position: relative;
        }

        .status-dot::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid var(--success);
          animation: pulseStatus 2s infinite ease-out;
        }

        @keyframes pulseStatus {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .login-left {
            padding: 3.5rem;
          }
          .login-right {
            padding: 3.5rem 3rem;
          }
        }

        @media (max-width: 900px) {
          .login-left { display: none; }
          .login-right {
            flex: 1;
            padding: 3.5rem 2rem;
            min-height: 100vh;
            justify-content: center;
          }
          .login-card-container {
            padding: 2.5rem;
          }
        }
      `}</style>

      {/* Ambient background glows for high depth */}
      <div className="ambient-bg-glow glow-1" />
      <div className="ambient-bg-glow glow-2" />
      
      {/* Left Panel: The Indigo Monolith */}
      <div className="login-left">
        {/* Floating background lights */}
        <div className="panel-orb-1" />
        <div className="panel-orb-2" />

        <div style={{ position: 'relative', zIndex: 3 }}>
          {/* Logo container with blurred shadow */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            width: '60px', height: '60px',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '2.5rem',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <Building2 size={28} color="white" strokeWidth={1.5} />
          </div>
          
          <h1 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'white',
            marginBottom: '1.25rem',
            maxWidth: '95%'
          }}>
            Smart Campus<br/>Central Hub
          </h1>
          
          <p style={{
            fontSize: '1.05rem',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.75)',
            maxWidth: '88%',
            marginBottom: '2rem'
          }}>
            One unified portal to seamlessly book facilities, log support tickets, and access essential campus tools.
          </p>

          {/* Premium Visual Grid Items instead of simple counters */}
          <div className="feature-cards-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Building2 size={18} strokeWidth={2} />
              </div>
              <div className="feature-text">
                <h3>Facility Management</h3>
                <p>Reserve classrooms, labs, and equipment in real-time.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Ticket size={18} strokeWidth={2} />
              </div>
              <div className="feature-text">
                <h3>Support & Ticketing</h3>
                <p>Submit IT and facilities requests for rapid resolution.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <ShieldCheck size={18} strokeWidth={2} />
              </div>
              <div className="feature-text">
                <h3>Verified Access</h3>
                <p>Secure login tied directly to your official academic profile.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic System Brand */}
        <div style={{ 
          fontSize: '0.75rem', 
          fontWeight: 800, 
          letterSpacing: '0.25em', 
          color: 'rgba(255, 255, 255, 0.25)',
          marginTop: '3rem',
          fontFamily: 'var(--font-mono)',
          position: 'relative',
          zIndex: 3
        }}>
          SMART CAMPUS PROJECT
        </div>
      </div>

      {/* Right Panel: The Soft Glassmorphic Workspace */}
      <div className="login-right">
        {/* Helper layout spacing container */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '460px', width: '100%', margin: 'auto 0' }}>
          
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '2.25rem',
              fontWeight: 800,
              color: 'var(--text-main)',
              lineHeight: 1.15,
              marginBottom: '12px'
            }}>
              Welcome Back
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.5, fontWeight: 500 }}>
              Access university systems securely using your verified campus account.
            </p>
          </div>
 
          {/* Glass Card Container */}
          <div className="login-card-container">
            {errorMessage && (
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                padding: '16px 20px', borderRadius: '12px', marginBottom: '24px',
                background: 'var(--danger-muted)', border: '1px solid rgba(225, 42, 69, 0.1)', color: 'var(--danger)',
                animation: 'cardEntrance 0.4s ease-out'
              }}>
                <AlertTriangle size={18} strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.5 }}>{errorMessage}</p>
              </div>
            )}

            <button onClick={handleGoogleLogin} className="google-btn">
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
                <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.347 2.825.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
 
            <div className="divider-container">
              <div className="divider-line" />
              <div className="divider-text">Verification</div>
              <div className="divider-line" />
            </div>
 
            {/* Tonal Information Box */}
            <div className="info-box">
              <div className="info-badge">
                <Info size={14} color="white" strokeWidth={2.5} />
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 500, margin: 0 }}>
                Please sign in with your official university credentials. Account registration completes automatically upon first-time verification.
              </p>
            </div>
          </div>
        </div>

        {/* Footer row carved into the bottom with a system status pulse */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          fontWeight: 700,
          letterSpacing: '0.05em',
          marginTop: '3rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <span style={{ cursor: 'pointer', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.8}>HELP CENTER</span>
            <span style={{ cursor: 'pointer', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.8}>IT SUPPORT</span>
          </div>

          <div className="system-status">
            <span className="status-dot" />
            All systems operational
          </div>
        </div>
      </div>
    </div>
  );
}
