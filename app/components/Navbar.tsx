"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { label: "Home",     href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact",  href: "/contact" },
];

export default function Navbar() {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <div className="navbar-container">
      <nav className="navbar-wrapper">
        <ul className="navbar-track">
          {links.map(({ label, href }) => {
            const isActive = pathname === href;
            const isCta = label === "Contact";

            return (
              <li key={label}>
                <Link
                  href={href}
                  onClick={() => setPathname(href)}
                  className={[
                    "nav-item",
                    isActive && !isCta ? "nav-item--active" : "",
                    isCta ? "nav-item--cta" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .navbar-container {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
        }

        .navbar-wrapper {
          display: inline-flex;
          align-items: center;
          background: #2c1a0a;
          border-radius: 34px;
          padding: 8px 10px;
          box-shadow:
            0 0 0 1px rgba(168, 131, 90, 0.25),
            0 8px 32px rgba(44, 26, 10, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        .navbar-track {
          display: flex;
          align-items: center;
          gap: 3px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: rgba(232, 221, 208, 0.55);
          text-decoration: none;
          padding: 8px 18px;
          border-radius: 24px;
          transition: all 0.22s ease;
          white-space: nowrap;
          display: block;
          letter-spacing: 0.02em;
        }

        .nav-item:hover {
          color: #e8ddd0;
          background: rgba(168, 131, 90, 0.15);
        }

        .nav-item--active {
          background: #4e2f10;
          color: #e8ddd0;
          box-shadow:
            0 2px 6px rgba(44, 26, 10, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .nav-item--cta {
          background: #e8ddd0;
          color: #2c1a0a;
          font-weight: 600;
          border-radius: 24px;
          box-shadow:
            0 0 0 1px rgba(168, 131, 90, 0.4),
            0 3px 10px rgba(44, 26, 10, 0.2);
          transition: all 0.22s ease;
        }

        .nav-item--cta:hover {
          background: #f5ede0;
          color: #2c1a0a;
          box-shadow:
            0 0 0 1px rgba(168, 131, 90, 0.6),
            0 6px 16px rgba(44, 26, 10, 0.28);
        }

        @media (max-width: 480px) {
          .navbar-container {
            top: 14px;
            width: calc(100% - 32px);
            left: 16px;
            transform: none;
          }
          .navbar-wrapper {
            width: 100%;
            justify-content: center;
            padding: 7px 8px;
          }
          .nav-item {
            padding: 7px 13px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}