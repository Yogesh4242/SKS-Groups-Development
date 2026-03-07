"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Projects() {
  const router = useRouter();
  const [hoveredContainer, setHoveredContainer] = useState<number | null>(null);
  const swiftUpRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (swiftUpRef.current) {
      const elem = swiftUpRef.current;
      const words = elem.textContent?.split(' ') || [];
      elem.innerHTML = '';

      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        span.style.overflow = 'hidden';
        span.style.animation = '0.3s swift-up ease-in-out forwards';
        
        const i = document.createElement('i');
        i.style.fontStyle = 'normal';
        i.style.position = 'relative';
        i.style.top = '55px';
        i.style.animation = '0.5s swift-up ease-in-out forwards';
        i.style.animationDelay = `${index * 0.2}s`;
        i.textContent = word + (index < words.length - 1 ? '\u00A0' : '');
        
        span.appendChild(i);
        elem.appendChild(span);
      });
    }
  }, []);

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
      background: "#e8ddd0", // Main page background - cream
    }}>
      {/* Navbar - Warm White */}
      <nav style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "#efe6d8", // Warm white
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        gap: "40px",
        zIndex: 1000,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid #a8835a", // Light brown border
      }}>
        <Link href="/" style={{ color: "#4e2f10", textDecoration: "none", fontWeight: "600", opacity: 0.9, transition: "opacity 0.3s" }}>Home</Link>
        <Link href="/services" style={{ color: "#4e2f10", textDecoration: "none", fontWeight: "600", opacity: 0.9, transition: "opacity 0.3s" }}>Services</Link>
        <Link href="/projects" style={{ color: "#2c1a0a", textDecoration: "none", fontWeight: "700", opacity: 1 }}>Projects</Link>
        <Link href="/contact" style={{ color: "#4e2f10", textDecoration: "none", fontWeight: "600", opacity: 0.9, transition: "opacity 0.3s" }}>Contact</Link>
      </nav>

      {/* Spacer div */}
      <div style={{ height: "80px" }}></div>

      {/* Section 1 - First Two Containers */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        padding: "100px 20px 60px",
        gap: "60px",
      }}>
        {/* Swift Up Text */}
        <div style={{
          width: "80%",
          maxWidth: "900px",
          marginBottom: "20px",
          textAlign: "center",
        }}>
          <p
            ref={swiftUpRef}
            style={{
              fontSize: "2rem",
              fontFamily: "Helvetica, sans-serif",
              color: "#2c1a0a", // Dark brown for main heading
              lineHeight: "1.4",
              letterSpacing: "-1px",
            }}
          >
            Building the future with innovative infrastructure solutions
          </p>
        </div>

        {/* Section 1 Title */}
        <h2 style={{
          color: "#4e2f10", // Brown for sub-headings
          fontSize: "2.5rem",
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: "30px",
          textTransform: "uppercase",
          letterSpacing: "2px",
          textShadow: "0 0 10px rgba(78, 47, 16, 0.2)",
        }}>
          Infrastructure Projects
        </h2>

        {/* Container 1 - BIG (Clickable) with Image */}
        <div 
          style={{
            width: "85%",
            maxWidth: "900px",
            height: "250px",
            borderRadius: "20px",
            boxShadow: hoveredContainer === 1 
              ? "0 10px 30px rgba(78, 47, 16, 0.3)"
              : "0 10px 30px rgba(0, 0, 0, 0.1)",
            border: "1px solid #a8835a", // Light brown border
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
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"
            alt="Highway infrastructure project"
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
              backgroundColor: "rgba(232, 221, 208, 0.8)", // Cream with opacity
            }}>
              <span style={{
                color: "#2c1a0a", // Dark brown
                fontSize: "3rem",
                fontWeight: "bold",
                fontFamily: "'DM Sans', sans-serif",
                textShadow: "0 0 20px rgba(44, 26, 10, 0.3)",
                opacity: 1,
                animation: "fadeIn 0.3s ease",
              }}>
                SMART CITY
              </span>
            </div>
          )}
        </div>

        {/* Container 2 - SMALL with 5-line paragraph infrastructure project description */}
        <div style={{
          width: "75%",
          maxWidth: "700px",
          height: "240px",
          background: "#efe6d8", // Warm white
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(78, 47, 16, 0.15)",
          border: "1px solid #a8835a", // Light brown border
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 30px",
        }}>
          <h3 style={{
            fontSize: "1.8rem",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "12px",
            backgroundSize: "200%",
            backgroundImage: "linear-gradient(45deg, #4e2f10 0%, #2c1a0a 35%, #a8835a 66%, #7a5230 100%)",
            WebkitTextFillColor: "transparent",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            animation: "glow 9s linear infinite",
          }}>
            METRO CORRIDOR
          </h3>
          <p
            style={{
              fontSize: "1rem",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: "500",
              textAlign: "center",
              lineHeight: "1.7",
              backgroundSize: "200%",
              backgroundImage: "linear-gradient(45deg, #4e2f10 0%, #2c1a0a 35%, #a8835a 66%, #7a5230 100%)",
              WebkitTextFillColor: "transparent",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              animation: "glow 9s linear infinite",
              margin: 0,
              padding: 0,
            }}
          >
            A 15km elevated metro corridor now connects major business districts across the city. Eight modern stations feature smart ticketing and real-time information systems. Commute times have been reduced by 45 minutes for thousands of daily passengers. The corridor serves over 500,000 commuters each day with reliable service. This infrastructure project has transformed urban mobility and reduced traffic congestion significantly.
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
        padding: "120px 20px 100px",
        gap: "60px",
      }}>
        {/* Section 2 Title */}
        <h2 style={{
          color: "#4e2f10", // Brown for sub-headings
          fontSize: "2.5rem",
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: "60px",
          textTransform: "uppercase",
          letterSpacing: "2px",
          textShadow: "0 0 10px rgba(78, 47, 16, 0.2)",
        }}>
          Construction & Consulting
        </h2>

        {/* Container 3 - BIG (Clickable) with Image */}
        <div 
          style={{
            width: "85%",
            maxWidth: "900px",
            height: "250px",
            borderRadius: "20px",
            boxShadow: hoveredContainer === 3 
              ? "0 10px 30px rgba(78, 47, 16, 0.3)"
              : "0 10px 30px rgba(0, 0, 0, 0.1)",
            border: "1px solid #a8835a", // Light brown border
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
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop"
            alt="Commercial construction project"
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
              backgroundColor: "rgba(232, 221, 208, 0.8)", // Cream with opacity
            }}>
              <span style={{
                color: "#2c1a0a", // Dark brown
                fontSize: "3rem",
                fontWeight: "bold",
                fontFamily: "'DM Sans', sans-serif",
                textShadow: "0 0 20px rgba(44, 26, 10, 0.3)",
                opacity: 1,
                animation: "fadeIn 0.3s ease",
              }}>
                BUSINESS HUB
              </span>
            </div>
          )}
        </div>

        {/* Container 4 - SMALL with 5-line paragraph construction consulting project description */}
        <div style={{
          width: "75%",
          maxWidth: "700px",
          height: "240px",
          background: "#efe6d8", // Warm white
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(78, 47, 16, 0.15)",
          border: "1px solid #a8835a", // Light brown border
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 30px",
        }}>
          <h3 style={{
            fontSize: "1.8rem",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "12px",
            backgroundSize: "200%",
            backgroundImage: "linear-gradient(45deg, #4e2f10 0%, #2c1a0a 35%, #a8835a 66%, #7a5230 100%)",
            WebkitTextFillColor: "transparent",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            animation: "glow 9s linear infinite",
          }}>
            GREEN TOWER
          </h3>
          <p
            style={{
              fontSize: "1rem",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: "500",
              textAlign: "center",
              lineHeight: "1.7",
              backgroundSize: "200%",
              backgroundImage: "linear-gradient(45deg, #4e2f10 0%, #2c1a0a 35%, #a8835a 66%, #7a5230 100%)",
              WebkitTextFillColor: "transparent",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              animation: "glow 9s linear infinite",
              margin: 0,
              padding: 0,
            }}
          >
            This LEED-certified commercial tower was built using sustainable materials throughout its structure. Energy-efficient HVAC systems reduce power consumption while maintaining optimal comfort. Solar panels and rainwater harvesting systems make the building self-sufficient in resource management. Our consulting team guided every phase from design to final certification. The result is a 40% reduction in carbon footprint compared to conventional buildings.
          </p>
        </div>
      </div>

      {/* Add keyframes for animations */}
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
        
        @keyframes swift-up {
          to {
            top: 0;
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