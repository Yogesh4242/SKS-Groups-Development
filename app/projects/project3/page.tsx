"use client";

import Link from "next/link";

export default function Project3() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
      color: "white",
    }}>
      <nav style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "#111111",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        gap: "40px",
        zIndex: 1000,
        borderBottom: "1px solid rgba(255, 100, 150, 0.2)",
      }}>
        <Link href="/" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "600" }}>Home</Link>
        <Link href="/services" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "600" }}>Services</Link>
        <Link href="/projects" style={{ color: "#ffd700", textDecoration: "none", fontWeight: "600" }}>Projects</Link>
        <Link href="/contact" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "600" }}>Contact</Link>
      </nav>

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "100px 20px",
      }}>
        <h1 style={{ color: "#ffd700", fontSize: "4rem", marginBottom: "2rem" }}>PROJECT 3</h1>
        <p style={{ fontSize: "1.5rem", maxWidth: "800px", textAlign: "center" }}>
          Detailed information about Project 3 goes here.
        </p>
        <Link 
          href="/projects" 
          className="back-button"
          style={{
            marginTop: "3rem",
            padding: "1rem 2rem",
            background: "transparent",
            border: "2px solid #ffd700",
            color: "#ffd700",
            textDecoration: "none",
            borderRadius: "30px",
            fontSize: "1.2rem",
            transition: "all 0.3s ease",
          }}
        >
          Back to Projects
        </Link>
      </div>

      <style jsx>{`
        .back-button:hover {
          background: #ffd700 !important;
          color: #0a0a0a !important;
        }
      `}</style>
    </div>
  );
}