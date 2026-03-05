"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Projects() {
  const router = useRouter();
  const [hoveredContainer, setHoveredContainer] = useState<number | null>(null);

  const handleContainerClick = (containerNumber: number) => {
    if (containerNumber === 1) {
      router.push('/projects/project1');
    } else if (containerNumber === 3) {
      router.push('/projects/project3');
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
    }}>
      {/* Navbar - Updated for dark theme */}
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
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
        borderBottom: "1px solid rgba(255, 215, 0, 0.2)",
      }}>
        <Link href="/" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "600", opacity: 0.9, transition: "opacity 0.3s" }}>Home</Link>
        <Link href="/services" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "600", opacity: 0.9, transition: "opacity 0.3s" }}>Services</Link>
        <Link href="/projects" style={{ color: "#ffd700", textDecoration: "none", fontWeight: "600", opacity: 1 }}>Projects</Link>
        <Link href="/contact" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "600", opacity: 0.9, transition: "opacity 0.3s" }}>Contact</Link>
      </nav>

      {/* Section 1 - First Two Containers */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        padding: "180px 20px 60px",
        gap: "60px", // Increased gap between elements
      }}>
        {/* Section 1 Title */}
        <h2 style={{
          color: "#ffd700",
          fontSize: "2.5rem",
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: "60px", // Increased gap after title
          textTransform: "uppercase",
          letterSpacing: "2px",
          textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
        }}>
          Featured Project
        </h2>

        {/* Container 1 - BIG (Clickable) with Image */}
        <div 
          style={{
            width: "85%",
            maxWidth: "900px",
            height: "250px",
            borderRadius: "20px",
            boxShadow: hoveredContainer === 1 
              ? "0 10px 30px rgba(0, 0, 0, 0.5)"
              : "0 10px 30px rgba(0, 0, 0, 0.3)",
            border: "1px solid rgba(255, 215, 0, 0.2)",
            backdropFilter: "blur(5px)",
            transition: "all 0.3s ease",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={() => setHoveredContainer(1)}
          onMouseLeave={() => setHoveredContainer(null)}
          onClick={() => handleContainerClick(1)}
        >
          {/* Background Image */}
          <img 
            src="https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2069&auto=format&fit=crop"
            alt="Modern building architecture"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "filter 0.3s ease",
              filter: hoveredContainer === 1 ? "blur(4px)" : "none",
            }}
          />
          
          {/* Overlay with text on hover */}
          {hoveredContainer === 1 && (
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}>
              <span style={{
                color: "#ffd700",
                fontSize: "3rem",
                fontWeight: "bold",
                fontFamily: "'DM Sans', sans-serif",
                textShadow: "0 0 20px rgba(255, 215, 0, 0.8)",
                opacity: 1,
                animation: "fadeIn 0.3s ease",
              }}>
                PROJECT 1
              </span>
            </div>
          )}
        </div>

        {/* Container 2 - SMALL with glowing gradient animation and centered title */}
        <div style={{
          width: "75%",
          maxWidth: "700px",
          height: "180px", // Slightly increased height for better spacing
          background: "rgba(20, 20, 20, 0.4)",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(100, 150, 255, 0.2)",
          backdropFilter: "blur(5px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 30px",
        }}>
          <h3 style={{
            fontSize: "1.8rem",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: "700", // Bold title
            textAlign: "center",
            marginBottom: "10px",
            backgroundSize: "200%",
            backgroundImage: "linear-gradient(45deg, #fff070 0%, #fff070 35%, #00c9d3 66%, #00c9d3 100%)",
            WebkitTextFillColor: "transparent",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            animation: "glow 9s linear infinite",
          }}>
            WEB APPLICATION
          </h3>
          <p
            style={{
              fontSize: "1.2rem",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: "600", // Bold description
              textAlign: "center",
              lineHeight: "1.5",
              color: "#ffffff",
              margin: 0,
              padding: 0,
              opacity: 0.9,
            }}
          >
            A modern web application built with React and Node.js, featuring real-time updates and responsive design.
          </p>
        </div>
      </div>

      {/* Section 2 - Last Two Containers */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        padding: "120px 20px 100px", // Increased top padding
        gap: "60px", // Increased gap between elements
      }}>
        {/* Section 2 Title */}
        <h2 style={{
          color: "#ffd700",
          fontSize: "2.5rem",
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: "60px", // Increased gap after title
          textTransform: "uppercase",
          letterSpacing: "2px",
          textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
        }}>
          Mobile Innovation
        </h2>

        {/* Container 3 - BIG (Clickable) with Image */}
        <div 
          style={{
            width: "85%",
            maxWidth: "900px",
            height: "250px",
            borderRadius: "20px",
            boxShadow: hoveredContainer === 3 
              ? "0 10px 30px rgba(0, 0, 0, 0.5)"
              : "0 10px 30px rgba(0, 0, 0, 0.3)",
            border: "1px solid rgba(255, 100, 150, 0.2)",
            backdropFilter: "blur(5px)",
            transition: "all 0.3s ease",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={() => setHoveredContainer(3)}
          onMouseLeave={() => setHoveredContainer(null)}
          onClick={() => handleContainerClick(3)}
        >
          {/* Background Image */}
          <img 
            src="https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=2069&auto=format&fit=crop"
            alt="Skyscraper building"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "filter 0.3s ease",
              filter: hoveredContainer === 3 ? "blur(4px)" : "none",
            }}
          />
          
          {/* Overlay with text on hover */}
          {hoveredContainer === 3 && (
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}>
              <span style={{
                color: "#ffd700",
                fontSize: "3rem",
                fontWeight: "bold",
                fontFamily: "'DM Sans', sans-serif",
                textShadow: "0 0 20px rgba(255, 215, 0, 0.8)",
                opacity: 1,
                animation: "fadeIn 0.3s ease",
              }}>
                PROJECT 3
              </span>
            </div>
          )}
        </div>

        {/* Container 4 - SMALL with glowing gradient animation and centered title */}
        <div style={{
          width: "75%",
          maxWidth: "700px",
          height: "180px", // Slightly increased height for better spacing
          background: "rgba(20, 20, 20, 0.4)",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(150, 255, 100, 0.2)",
          backdropFilter: "blur(5px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 30px",
        }}>
          <h3 style={{
            fontSize: "1.8rem",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: "700", // Bold title
            textAlign: "center",
            marginBottom: "10px",
            backgroundSize: "200%",
            backgroundImage: "linear-gradient(45deg, #fff070 0%, #fff070 35%, #00c9d3 66%, #00c9d3 100%)",
            WebkitTextFillColor: "transparent",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            animation: "glow 9s linear infinite",
          }}>
            MOBILE APP
          </h3>
          <p
            style={{
              fontSize: "1.2rem",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: "600", // Bold description
              textAlign: "center",
              lineHeight: "1.5",
              color: "#ffffff",
              margin: 0,
              padding: 0,
              opacity: 0.9,
            }}
          >
            Cross-platform mobile application with offline support, push notifications, and real-time chat functionality.
          </p>
        </div>
      </div>

      {/* Add keyframes for fadeIn and glow animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes glow {
          0% {
            background-position: 0% 43%;
          }
          50% {
            background-position: 100% 58%;
          }
          100% {
            background-position: 0% 43%;
          }
        }
      `}</style>
    </div>
  );
}