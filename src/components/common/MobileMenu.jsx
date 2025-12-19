"use client";

import { useSelector } from "react-redux";
import {
  HEADER_NAV_ITEMS,
  HEADER_ACTIONS,
} from "../constants/layout";

const MobileMenu = ({ onNavigate, onLogout }) => {
  const token = useSelector((s) => s?.auth?.token);
  const userEmail = useSelector((s) => s?.auth?.userEmail);
  const isLoggedIn = Boolean(token);

  const handleClick = (href) => {
    try {
      if (typeof onNavigate === "function") onNavigate(href);
    } catch (e) {
      console.error("MobileMenu navigate error:", e);
    }
  };

  const handleLogout = () => {
    try {
      if (typeof onLogout === "function") onLogout();
    } catch (e) {
      console.error("MobileMenu logout error:", e);
    }
  };

  const loginAction = HEADER_ACTIONS.login;
  const signupAction = HEADER_ACTIONS.signup;

  return (
    <div className="lg:hidden py-4 border-t border-gray-100">
      <nav className="flex flex-col space-y-2">
        {/* Main nav */}
        {HEADER_NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleClick(item.href)}
            className="text-left text-gray-700 hover:text-emerald-600 font-medium transition py-2"
          >
            {item.label}
          </button>
        ))}

        {/* Auth / Account area - Consistent with desktop */}
        <div className="pt-2 border-t border-gray-100 mt-2 space-y-2">
          {isLoggedIn ? (
            <>
              <button
                type="button"
                onClick={() => handleClick("/profile")}
                className="w-full text-left text-gray-700 hover:text-emerald-600 font-medium transition py-2"
                title={userEmail || "Account"}
              >
                {userEmail || "Account"}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {loginAction && (
                <button
                  type="button"
                  onClick={() => handleClick(loginAction.href)}
                  className="w-full text-left text-emerald-600 hover:text-emerald-700 font-medium transition py-2"
                >
                  {loginAction.label}
                </button>
              )}

              {signupAction && (
                <button
                  type="button"
                  onClick={() => handleClick(signupAction.href)}
                  className="w-full px-5 py-2 bg-linear-to-r from-emerald-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition transform hover:-translate-y-0.5 font-medium text-center"
                >
                  {signupAction.label}
                </button>
              )}
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;