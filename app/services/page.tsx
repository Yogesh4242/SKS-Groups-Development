"use client";

import Link from "next/link";
import { useState } from "react";

export default function Services() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = (imageSrc: string) => {
    setActiveImage(imageSrc);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setActiveImage(null);
    setIsHovering(false);
  };

  const navLinks = [
    {
      text: "Home",
      image: "https://images.unsplash.com/photo-1623567341691-1f47b5cf949e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z29sZiUyMGNvdXJzZXxlbnwwfDB8MHx8fDI%3D",
      alt: "golf course"
    },
    {
      text: "New",
      image: "https://images.pexels.com/photos/6573707/pexels-photo-6573707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Close-Up Photo of Golf Clubs"
    },
    {
      text: "Clubs",
      image: "https://images.ctfassets.net/56u5qdsjym8c/7HcHE8NFSNflBpHozWYDdQ/16338b1b7067d193ee084bd1c95c0a39/hero-equip.png?fl=progressive&q=80",
      alt: "Golf Clubs"
    },
    {
      text: "Golf Balls",
      image: "https://images.unsplash.com/photo-1676012120403-42a8ae3f998e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Golf Balls"
    },
    {
      text: "Shoes",
      image: "https://www.melbournepodiatryclinic.net.au/wp-content/uploads/2022/04/FootJoy-Fuel-Womens-hero.jpeg",
      alt: "Golf shoes"
    },
    {
      text: "Clothing",
      image: "https://images.unsplash.com/photo-1737748612418-e39bcd6503a2?q=80&w=1616&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Golf clothing"
    },
    {
      text: "Bags & Carts",
      image: "https://uploads.mygolfspy.com/uploads/2017/03/cart-bag-pings.jpg",
      alt: "Golf bags"
    },
    {
      text: "Golf Tech",
      image: "https://thegadgetflow.com/wp-content/uploads/2023/03/Coolest-golf-gadgets-and-accessories-that-will-enhance-your-game-blog-featured.jpeg",
      alt: "Golf tech products"
    },
    {
      text: "Accessories",
      image: "https://images.unsplash.com/photo-1677764301176-c36c9416675e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Golf accessories"
    },
    {
      text: "Expert Services",
      image: "https://assets-global.website-files.com/60d6794e002c46522a057656/64531e9e974c6303d42721f6_GolfBunker2023_LowRes-89.jpg",
      alt: "Expert services"
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Fullscreen Background Image */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-10 transition-opacity duration-500 ease-in-out"
          style={{
            backgroundImage: `url(${activeImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.6,
          }}
        >
          <div className="absolute inset-0 bg-black/40" /> {/* Overlay for better text visibility */}
        </div>
      )}

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm shadow-md p-5 flex justify-center gap-10 text-[#5C4033] font-semibold tracking-wide z-50">
        <Link href="/" className="hover:text-[#8B5A2B] transition-colors">Home</Link>
        <Link href="/services" className="hover:text-[#8B5A2B] transition-colors">Services</Link>
        <Link href="/projects" className="hover:text-[#8B5A2B] transition-colors">Projects</Link>
        <Link href="/contact" className="hover:text-[#8B5A2B] transition-colors">Contact</Link>
      </nav>

      {/* Main Navigation Menu - Always Centered, No Scrolling */}
      <div className="flex items-center justify-center min-h-screen">
        <nav 
          id="nav" 
          className="flex flex-col items-center justify-center font-['Lato',sans-serif] relative z-20"
        >
          {navLinks.map((link, index) => (
            <a 
              key={index}
              href="#" 
              className="group/link nav-link text-center"
              onMouseEnter={() => handleMouseEnter(link.image)}
              onMouseLeave={handleMouseLeave}
            >
              <span className="nav-text">
                {link.text}
              </span>
            </a>
          ))}
        </nav>
      </div>

      <style jsx>{`
        .nav-link {
          color: ${isHovering ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.25)'};
          font-weight: ${isHovering ? '700' : '400'};
          font-size: clamp(2rem, 6vw, 7rem);
          text-decoration: none;
          position: relative;
          display: block;
          width: 100%;
          transition: all 0.3s ease;
          text-align: center;
        }

        .nav-link:hover {
          color: rgb(255, 255, 255);
          font-weight: 700;
          transform: scale(1.1);
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .nav-text {
          display: inline-block;
          border-bottom: 2px solid transparent;
          border-top: 2px solid transparent;
          position: relative;
          z-index: 2;
          padding-block: 1rem;
          transition: all 0.3s ease;
          width: auto;
          text-align: center;
        }

        .nav-link:hover .nav-text {
          border-top-color: rgb(255, 255, 255);
          border-bottom-color: rgb(255, 255, 255);
          transform: scale(1.05);
        }

        /* Animation for text when hovering */
        @keyframes glow {
          0% {
            text-shadow: 0 0 10px rgba(255,255,255,0.5);
          }
          50% {
            text-shadow: 0 0 20px rgba(255,255,255,0.8);
          }
          100% {
            text-shadow: 0 0 10px rgba(255,255,255,0.5);
          }
        }

        .nav-link:hover .nav-text {
          animation: glow 2s infinite;
        }

        body :global(.overflow-hidden) {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}