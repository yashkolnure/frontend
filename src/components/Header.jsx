import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // 🔹 Countdown logic
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const diff = endOfDay - now;

      if (diff <= 0) {
        setTimeLeft("Offer Ended!");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  // 🔹 Detect token changes automatically
  useEffect(() => {
    const checkToken = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
    };

    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-transparent py-0">
      {/* 🔹 Optional Offer Banner */}
      {/* <div className="text-center bg-gradient-to-r from-orange-500 via-black to-blue-600 text-white py-1 text-sm">
        ⏰ Offer ends in {timeLeft}
      </div> */}

      <div className="max-w-[1200px] mx-auto px-4 py-2">
        <div className="flex items-center justify-between bg-white/60 backdrop-blur-lg rounded-full px-6 py-0 border border-gray-200 shadow-lg">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img
              src="https://petoba.avenirya.com/wp-content/uploads/2022/07/Untitled-design-6.png"
              alt="Logo"
              className="h-20 w-auto"
            />
          </a>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-6">
            {token ? (
              <>
                <a
                  href="/admin/dashboard"
                  className="hover:text-blue-600 font-medium"
                >
                  Manage Orders 
                </a>
                <a
                  href="/dashboard"
                  className="hover:text-blue-600 font-medium"
                >
                  Dashboard 
                </a>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-full text-xl bg-gradient-to-r from-red-600 via-black to-orange-600 text-white font-semibold shadow-md hover:scale-105 transition-transform"
                >
                  Logout
                </button>
              </>
            ) : (
              <a
                href="/login"
                className="px-5 py-2 rounded-full text-xl bg-gradient-to-r from-orange-500 via-black to-blue-600 text-white font-semibold shadow-md hover:scale-105 transition-transform"
              >
                Login →
              </a>
            )}
          </div>

          {/* Hamburger (Mobile) */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md"
          >
            {menuOpen ? (
              <span className="text-2xl font-bold">×</span>
            ) : (
              <span className="text-2xl font-bold">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={closeMenu}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-6 gap-4 text-black font-medium">
          {/* <a href="/" onClick={closeMenu} className="hover:text-blue-600">
            Home
          </a>
          <a href="/features" onClick={closeMenu} className="hover:text-blue-600">
            Features
          </a>
          <a href="/membership" onClick={closeMenu} className="hover:text-blue-600">
            Pricing
          </a>
          <a href="/agency" onClick={closeMenu} className="hover:text-blue-600">
            Agency
          </a>
          <a href="/contact" onClick={closeMenu} className="hover:text-blue-600">
            Contact Us
          </a> */}

          {token ? (
            <>
            <a href="/admin/dashboard" onClick={closeMenu} className="hover:text-blue-600">
              Manage Orders
            </a>
              <a
                href="/dashboard"
                onClick={closeMenu}
                className=""
              >
                Dashboard
              </a>
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-red-600 via-black to-orange-600 text-white text-center shadow-md hover:scale-105 transition-transform"
              >
                Logout
              </button>
            </>
          ) : (
            <a
              href="/login"
              onClick={closeMenu}
              className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 via-black to-blue-600 text-white text-center shadow-md hover:scale-105 transition-transform"
            >
              Login →
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
