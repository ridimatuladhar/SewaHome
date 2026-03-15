import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAttempts = parseInt(localStorage.getItem("loginAttempts")) || 0;
    const lockUntil = parseInt(localStorage.getItem("lockUntil")) || 0;
    setAttempts(storedAttempts);

    const now = Date.now();
    if (now < lockUntil) {
      const secondsLeft = Math.floor((lockUntil - now) / 1000);
      setIsLocked(true);
      setRemainingTime(secondsLeft);
    }
  }, []);

  useEffect(() => {
    if (!isLocked || remainingTime <= 0) return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsLocked(false);
          localStorage.removeItem("lockUntil");
          localStorage.setItem("loginAttempts", "0");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLocked, remainingTime]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s < 10 ? "0" + s : s}s`;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLocked) {
      setError("Account locked. Please wait.");
      return;
    }

    // Email validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate delay for spinner
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const res = await fetch("https://stf.org.np/Backend/admin/admin_login.php", {
      //const res = await fetch("http://localhost/SewaHome/Backend/admin/admin_login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (res.ok && result.status === "success") {
        // Check if admin is active
        if (result.user.status && result.user.status !== 'active') {
          setError("This admin account has been blocked");
          setLoading(false);
          return;
        }

        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("adminData", JSON.stringify(result.user));
        localStorage.setItem("loginTime", new Date().getTime().toString());
        localStorage.removeItem("loginAttempts");
        localStorage.removeItem("lockUntil");
        navigate("/admin-panel");
      } else {
        // Check if the error is due to account being blocked
        if (result.message && result.message.toLowerCase().includes('blocked')) {
          setError("This admin account has been blocked");
        } else if (result.message && result.message.toLowerCase().includes('inactive')) {
          setError("This admin account has been blocked");
        } else {
          const newAttempts = attempts + 1;
          setAttempts(newAttempts);
          localStorage.setItem("loginAttempts", newAttempts.toString());

          if (newAttempts >= 3) {
            const lockUntil = Date.now() + 30 * 60 * 1000;
            localStorage.setItem("lockUntil", lockUntil.toString());
            setRemainingTime(Math.floor((lockUntil - Date.now()) / 1000));
            setIsLocked(true);
            setError("Too many failed attempts. Account locked for 30 minutes.");
          } else {
            setError(result.message || "Invalid email or password");
          }
        }
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 w-full max-w-sm"
      >
        <img 
          src="/main-logo/logo.webp"
          alt="Sewa Home Care Logo" 
          className="mb-4 w-52 h-auto mx-auto" 
        />
       
        <h2 className="text-2xl font-bold mb-4 text-[#2E6FB7] text-center">
          Admin Login
        </h2>

        {error && (
          <p className={`text-sm mb-2 text-center ${
            error.includes("blocked") || error.includes("inactive") 
              ? "text-red-600 font-semibold" 
              : "text-red-500"
          }`}>
            {error.includes("blocked") || error.includes("inactive") ? "🚫 " : ""}
            {error}
          </p>
        )}
        {attempts > 0 && !isLocked && (
          <p className="text-yellow-600 text-sm mb-2 text-center">
            ⚠ Failed attempts: {attempts} / 3
          </p>
        )}
        {isLocked && (
          <p className="text-red-600 text-sm mb-4 text-center">
            🚫 Account locked. Time remaining: {formatTime(remainingTime)}
          </p>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E6FB7] focus:border-transparent"
            required
            disabled={isLocked || loading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E6FB7] focus:border-transparent"
            required
            disabled={isLocked || loading}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#2E6FB7] text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 transition duration-200 font-medium"
          disabled={isLocked || loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </div>
          ) : isLocked ? (
            "Account Locked"
          ) : (
            "Login"
          )}
        </button>

        {/* Forgot password link */}
        {/* <div className="text-center mt-4">
          <button
            type="button"
            className="text-sm text-[#2E6FB7] hover:text-blue-600"
            onClick={() => setError("Forgot password feature coming soon")}
          >
            Forgot your password?
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default AdminLogin;