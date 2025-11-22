import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../state/CartContext";

export const Layout = ({ children }) => {
  const { totalItems } = useCart();

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-inner">
          <Link to="/" className="topbar-logo">
            <span className="topbar-logo-icon">🏬</span>
            <span className="topbar-logo-text">ShopHub</span>
          </Link>

          <nav className="topbar-nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                "topbar-btn" + (isActive ? " topbar-btn-active" : "")
              }
            >
              <span className="topbar-btn-icon">🏠</span>
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                "topbar-btn" + (isActive ? " topbar-btn-active" : "")
              }
            >
              <span className="topbar-btn-icon">🛒</span>
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="topbar-badge">{totalItems}</span>
              )}
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="page-main">{children}</main>
    </div>
  );
};
