"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Services() {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Load required libraries
    const initAnimations = async () => {
      // @ts-ignore
      const gsap = (await import("gsap")).default;
      // @ts-ignore
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).ScrollTrigger;
      // @ts-ignore
      const ScrollToPlugin = (await import("gsap/ScrollToPlugin")).ScrollToPlugin;
      
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

      // Try to initialize Lenis for smooth scrolling
      try {
        // @ts-ignore - Completely ignore type checking for Lenis
        const LenisModule = await import("@studio-freight/lenis");
        const Lenis = LenisModule.default;
        
        // Use the most basic options that work across versions
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          // Only include options that are most likely to exist
          orientation: 'vertical',
          gestureOrientation: 'vertical',
        });
        
        lenisRef.current = lenis;

        // Connect Lenis to ScrollTrigger
        lenis.on('scroll', () => {
          ScrollTrigger.update();
        });

        // Use requestAnimationFrame to continuously update Lenis
        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        
        requestAnimationFrame(raf);

        console.log("Lenis initialized successfully");
      } catch (e) {
        console.log("Smooth scrolling disabled, using native scroll");
      }

      // Small delay to ensure DOM is ready
      setTimeout(() => {
        // Kill any existing ScrollTriggers
        ScrollTrigger.getAll().forEach((st: any) => st.kill());
        
        // Refresh ScrollTrigger
        ScrollTrigger.refresh();
        
        // Section 1 Animations
        gsap.timeline({
          scrollTrigger: {
            trigger: ".hero--1",
            start: "top top",
            end: "+=50%",
            scrub: 1,
          },
        })
        .to(".hero--1 .hero__headline", { scale: 0.88 })
        .to(".hero--1 .hero__background", { scale: 0.89 }, "<");

        // Pin hero 1
        gsap.to(".hero--1", {
          scrollTrigger: {
            trigger: ".hero--1",
            start: "top top",
            endTrigger: ".hero--2",
            end: "top top",
            pin: true,
            pinSpacing: false,
            scrub: 1,
          },
        });

        // Thumbnail parallax animations
        gsap.utils.toArray<HTMLElement>(".thumbs__card").forEach((thumb, index) => {
          const img = thumb.querySelector("img");
          let yValue = "0%";
          
          if (index === 1) yValue = "30%";
          else if (index === 2) yValue = "-30%";
          else if (index === 4) yValue = "-20%";
          
          gsap.to(thumb, {
            y: yValue,
            scrollTrigger: {
              trigger: thumb,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });

          if (img) {
            gsap.fromTo(img, 
              { y: "-50px" }, 
              { 
                y: "0px",
                scrollTrigger: {
                  trigger: thumb,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              }
            );
          }
        });

        // Fade out hero 1 text and description
        gsap.timeline({
          scrollTrigger: {
            trigger: ".thumbs",
            start: "top bottom",
            end: "+=30%",
            scrub: 1,
          },
        })
        .to(".hero--1 .hero__headline", { opacity: 0, pointerEvents: "none" })
        .to(".hero--1 .hero__description", { opacity: 0, pointerEvents: "none" }, "<")
        .to(".hero--1 .explore-button", { opacity: 1, pointerEvents: "all" }, "<0.5");

        // Section 2 Animations
        gsap.timeline({
          scrollTrigger: {
            trigger: ".hero--2",
            start: "top top",
            end: "+=50%",
            scrub: 1,
          },
        })
        .to(".hero--2 .hero__headline", { scale: 0.88 })
        .to(".hero--2 .hero__background", { scale: 0.89 }, "<");

        // Pin hero 2
        gsap.to(".hero--2", {
          scrollTrigger: {
            trigger: ".hero--2",
            start: "top top",
            endTrigger: ".text",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            scrub: 1,
            onEnter: () => {
              gsap.set(".section--1", { visibility: "hidden" });
            },
            onLeaveBack: () => {
              gsap.set(".section--1", { visibility: "visible" });
            },
          },
        });

        // Section 3 Animations - Marquee text
        gsap.timeline({
          scrollTrigger: {
            trigger: ".hero--3 .hero__headline",
            start: "top bottom",
            end: "+=200%",
            scrub: 1,
          },
        })
        .to(".hero--3 .hero__headline", { x: "-50%" });

        // Pin hero 3
        gsap.to(".hero--3", {
          scrollTrigger: {
            trigger: ".hero--3",
            start: "top top",
            end: "+=150%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
          },
        });

        // Color change for hero 3
        const hero3Tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero--3 .hero__headline",
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        });
        
        hero3Tl
          .to(".hero--3 .hero__background", { background: "#4e2f10" }) // Brown background
          .to(".hero--3 .hero__headline", { color: "#e8ddd0" }, "<"); // Cream text

        // Refresh ScrollTrigger
        ScrollTrigger.refresh();
        console.log("ScrollTrigger animations initialized");
      }, 500);
    };

    initAnimations();

    return () => {
      // Cleanup
      if (lenisRef.current && lenisRef.current.destroy) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      {/* Top Navigation Bar - Warm White */}
      <nav className="fixed top-0 w-full shadow-md p-5 flex justify-center gap-10 font-semibold tracking-wide z-[100] border-b" style={{
        backgroundColor: '#efe6d8',
        color: '#4e2f10',
        borderColor: '#a8835a'
      }}>
        <Link href="/" className="transition-colors" style={{ color: '#4e2f10' }}>Home</Link>
        <Link href="/services" className="transition-colors" style={{ color: '#4e2f10' }}>Services</Link>
        <Link href="/projects" className="transition-colors" style={{ color: '#4e2f10' }}>Projects</Link>
        <Link href="/contact" className="transition-colors" style={{ color: '#4e2f10' }}>Contact</Link>
      </nav>

      <div className="sticky-sections" style={{ background: '#e8ddd0' }}>
        {/* Section 1 - Infrastructure */}
        <section className="section section--1">
          <div className="hero hero--1">
            <div className="hero__content">
              <h1 className="hero__headline" style={{ color: '#2c1a0a' }}>Infrastructure</h1>
              {/* Description text aligned below headline */}
              <p className="hero__description" style={{ color: '#7a5230' }}>
                We are a professional company specializing in infrastructure development, 
                construction, and building services. Our goal is to deliver high-quality 
                projects that meet modern standards and client expectations. With a skilled 
                team and strong technical expertise, we focus on building reliable and 
                sustainable structures that support community growth and development.
              </p>
              {/* Button container to center the button */}
              <div className="button-container">
                <a href="#" className="button explore-button" style={{ 
                  color: '#2c1a0a', 
                  borderColor: '#2c1a0a',
                  backgroundColor: 'transparent'
                }}><span>Explore Projects →</span></a>
              </div>
            </div>
            <div className="hero__background" style={{ background: '#a8835a' }}></div>
          </div>
          
          <div className="thumbs">
            <div className="container">
              <div className="grid">
                <div className="thumbs__card">
                  <div className="thumbs__card-picture">
                    <img alt="Bridge Construction" src="https://images.unsplash.com/photo-1513828586377-a76e01d15b2d?q=80&w=1740&auto=format&fit=crop" />
                  </div>
                  <p className="thumbs__card-headline" style={{ color: '#2c1a0a' }}>Bridge Engineering</p>
                  <p className="thumbs__card-text" style={{ color: '#7a5230' }}>Design and construction of modern bridge infrastructure with cutting-edge engineering solutions</p>
                </div>
                <div className="thumbs__card">
                  <div className="thumbs__card-picture">
                    <img alt="Road Construction" src="https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1740&auto=format&fit=crop" />
                  </div>
                  <p className="thumbs__card-headline" style={{ color: '#2c1a0a' }}>Highway Systems</p>
                  <p className="thumbs__card-text" style={{ color: '#7a5230' }}>Comprehensive highway and roadway development for improved connectivity and safety</p>
                </div>
                <div className="thumbs__card">
                  <div className="thumbs__card-picture">
                    <img alt="Railway Infrastructure" src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1742&auto=format&fit=crop" />
                  </div>
                  <p className="thumbs__card-headline" style={{ color: '#2c1a0a' }}>Rail Networks</p>
                  <p className="thumbs__card-text" style={{ color: '#7a5230' }}>Development of high-speed rail corridors and urban transit systems</p>
                </div>
                <div className="thumbs__card">
                  <div className="thumbs__card-picture">
                    <img alt="Tunnel Construction" src="https://images.unsplash.com/photo-1545534008-43e2caddf6f5?q=80&w=1740&auto=format&fit=crop" />
                  </div>
                  <p className="thumbs__card-headline" style={{ color: '#2c1a0a' }}>Tunnel Projects</p>
                  <p className="thumbs__card-text" style={{ color: '#7a5230' }}>Advanced tunneling solutions for transportation and utility infrastructure</p>
                </div>
                <div className="thumbs__card">
                  <div className="thumbs__card-picture">
                    <img alt="Port Infrastructure" src="https://images.unsplash.com/photo-1586528116311-619dde5e98b3?q=80&w=1740&auto=format&fit=crop" />
                  </div>
                  <p className="thumbs__card-headline" style={{ color: '#2c1a0a' }}>Port Development</p>
                  <p className="thumbs__card-text" style={{ color: '#7a5230' }}>Modern port facilities and maritime infrastructure for global trade</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cream color gap between Infrastructure section and Our Vision section */}
        <div className="section-gap" style={{ 
          height: '60px', 
          backgroundColor: '#e8ddd0',
          width: '100%',
          position: 'relative',
          zIndex: 5
        }}></div>

        {/* Section 2 - Construction - WITH "OUR VISION" HEADING AND VISION TEXT */}
        <section className="section section--2">
          <div className="hero hero--2">
            {/* Changed from "Construction" to "Our Vision" */}
            <h1 className="hero__headline" style={{ color: '#2c1a0a' }}>Our Vision</h1>
            {/* ADDED: Vision text paragraph */}
            <p className="hero__vision-text" style={{ color: '#7a5230' }}>
              To become a trusted name in infrastructure and construction by delivering 
              innovative solutions and maintaining long-term relationships with our clients.
            </p>
            <div className="hero__background" style={{ background: '#a8835a' }}></div>
          </div>
          
          <div className="text" style={{ background: '#efe6d8' }}>
            <div className="container">
              <div className="grid">
                <div className="text__container">
                  <h2 className="services-headline" style={{ color: '#2c1a0a', borderBottomColor: '#a8835a' }}>Our Services</h2>
                  
                  <div className="service-item">
                    <h3 className="service-title" style={{ color: '#4e2f10' }}>1. Infrastructure Development</h3>
                    <p className="service-description" style={{ color: '#7a5230' }}>We provide infrastructure services such as roads, drainage systems, foundations, and structural development. Our team ensures durability, safety, and efficient project execution.</p>
                  </div>
                  
                  <div className="service-item">
                    <h3 className="service-title" style={{ color: '#4e2f10' }}>2. Construction Services</h3>
                    <p className="service-description" style={{ color: '#7a5230' }}>We handle construction projects from planning to completion. This includes residential, commercial, and industrial construction using modern techniques and quality materials.</p>
                  </div>
                  
                  <div className="service-item">
                    <h3 className="service-title" style={{ color: '#4e2f10' }}>3. Building Development</h3>
                    <p className="service-description" style={{ color: '#7a5230' }}>We specialize in building construction including houses, apartments, office buildings, and other structures. Our focus is on quality workmanship, strong design, and timely project delivery.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 - Consulting */}
        <section className="section section--3">
          <div className="hero hero--3">
            {/* Added padding-top to move the text down */}
            <div style={{ paddingTop: '25vh' }}>
              <h1 className="hero__headline" style={{ color: '#2c1a0a' }}>Strategic Consulting · Project Management · Technical Advisory · Risk Assessment · Value Engineering · Sustainability Consulting</h1>
            </div>
            {/* Changed button text and added Link to contact page */}
            <Link href="/contact" className="button consulting-button" style={{ 
              color: '#2c1a0a', 
              borderColor: '#2c1a0a',
              backgroundColor: 'rgba(255, 255, 255, 0.2)'
            }}><span>CONTACT US FOR QUERIES →</span></Link>
            <div className="hero__background" style={{ background: '#a8835a' }}></div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 400;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          font-family: inherit;
          overflow-x: hidden;
          background: #e8ddd0;
        }

        /* Lenis styles if available */
        html.lenis {
          height: auto;
        }

        .lenis.lenis-smooth {
          scroll-behavior: auto;
        }

        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }

        .lenis.lenis-stopped {
          overflow: hidden;
        }

        .sticky-sections {
          position: relative;
          width: 100%;
          margin-top: 73px;
        }

        .section {
          position: relative;
          width: 100%;
          min-height: 100vh;
        }

        .section--1 {
          background: #e8ddd0;
          z-index: 1;
        }

        .section--2 {
          background: #e8ddd0;
          z-index: 2;
        }

        .section--3 {
          background: #e8ddd0;
          z-index: 3;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          width: 100%;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 2rem;
        }

        .button {
          display: inline-block;
          padding: 0.75rem 2rem;
          border: 2px solid;
          border-radius: 70px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-family: 'Syne', sans-serif;
          font-weight: 500;
          font-size: 1.1rem;
          z-index: 10;
        }
        
        .button span {
          font-size: inherit;
          line-height: 1.3;
          font-weight: 500;
        }

        .button:hover {
          background: #2c1a0a !important;
          color: #efe6d8 !important;
          border-color: #2c1a0a !important;
        }

        .hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }

        .hero__content {
          position: relative;
          z-index: 5;
          max-width: 900px;
          width: 90%;
          text-align: left;
          padding: 2rem;
        }

        .button-container {
          display: flex;
          justify-content: center;
          width: 100%;
          margin-top: 1rem;
        }
        
        .hero__background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          will-change: transform;
        }

        .hero__headline {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
          will-change: transform;
          text-align: center;
          z-index: 5;
          position: relative;
        }

        .hero__description {
          font-size: 1.2rem;
          line-height: 1.6;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 2rem;
          max-width: 800px;
          opacity: 0.9;
          text-align: left;
        }

        .hero__vision-text {
          font-size: 1.5rem;
          line-height: 1.6;
          font-family: 'DM Sans', sans-serif;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          opacity: 0.9;
          padding: 0 2rem;
          position: relative;
          z-index: 5;
        }

        .explore-button {
          position: relative;
          opacity: 0;
          pointer-events: none;
          display: inline-block;
          margin: 0 auto;
        }

        .hero--2 .hero__background {
          background: #a8835a;
        }
      
        .hero--2 .hero__headline {
          color: #2c1a0a;
        }

        .hero--3 {
          justify-content: flex-start;
          position: relative;
        }

        .hero--3 .hero__headline {
          padding-left: 33vw;
          white-space: nowrap;
          font-size: clamp(3rem, 6vw, 5rem);
          transition: color 0.3s ease;
          will-change: transform;
          max-width: none;
          width: auto;
          margin-bottom: 0;
        }

        .consulting-button {
          position: absolute;
          bottom: 20%;
          left: 50%;
          transform: translateX(-50%);
          backdrop-filter: blur(10px);
          opacity: 1 !important;
          pointer-events: all !important;
          z-index: 20;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 0.9rem 2.2rem;
          white-space: nowrap;
        }

        .consulting-button:hover {
          background: #2c1a0a !important;
          color: #efe6d8 !important;
          border-color: #2c1a0a !important;
        }

        .thumbs {
          position: relative;
          z-index: 3;
          margin-bottom: 100vh;
          padding: 20vh 0 0;
          background: transparent;
        }

        .thumbs__card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.75rem;
          will-change: transform;
        }

        .thumbs__card:nth-child(1) {
          grid-column: 4 / span 5;
        }

        .thumbs__card:nth-child(1) .thumbs__card-picture {
          aspect-ratio: 16 / 9;
          width: 100%;
        }

        .thumbs__card:nth-child(2) {
          grid-column: 2 / span 3;
          margin-top: 8rem;
        }

        .thumbs__card:nth-child(2) .thumbs__card-picture {
          aspect-ratio: 4 / 3;
          width: 100%;
        }

        .thumbs__card:nth-child(3) {
          grid-column: 8 / span 3;
          margin-top: -8rem;
        }

        .thumbs__card:nth-child(3) .thumbs__card-picture {
          aspect-ratio: 3 / 4;
          width: 100%;
        }

        .thumbs__card:nth-child(4) {
          grid-column: 3 / span 4;
        }

        .thumbs__card:nth-child(4) .thumbs__card-picture {
          aspect-ratio: 1 / 1;
          width: 100%;
        }

        .thumbs__card:nth-child(5) {
          grid-column: 7 / span 4;
        }

        .thumbs__card:nth-child(5) .thumbs__card-picture {
          aspect-ratio: 16 / 9;
          width: 100%;
        }

        .thumbs__card-picture {
          width: 100%;
          overflow: hidden;
          border-radius: 12px;
          background: #a8835a;
        }

        .thumbs__card-picture img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          will-change: transform;
        }

        .thumbs__card-headline {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1.3;
          padding-left: 0.5rem;
        }

        .thumbs__card-text {
          font-size: 1rem;
          line-height: 1.5;
          opacity: 0.8;
          max-width: 85%;
          padding-left: 0.5rem;
        }

        .text {
          position: relative;
          z-index: 3;
          padding: 20vh 0 50vh;
          font-size: 2rem;
          line-height: 1.4;
          font-weight: 400;
        }

        .text__container {
          grid-column: 4 / span 6;
        }

        .services-headline {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 3rem;
          font-family: 'Syne', sans-serif;
          border-bottom: 2px solid;
          padding-bottom: 1rem;
        }

        .service-item {
          margin-bottom: 2.5rem;
        }

        .service-title {
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          font-family: 'Syne', sans-serif;
        }

        .service-description {
          font-size: 1.1rem;
          line-height: 1.6;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 1rem;
        }

        .text__container p {
          margin-bottom: 2rem;
        }

        .text__container p:last-child {
          margin-bottom: 0;
        }

        /* Section gap styling */
        .section-gap {
          height: 60px;
          background-color: #e8ddd0;
          width: 100%;
          position: relative;
          z-index: 5;
        }

        @media (max-width: 768px) {
          .grid {
            gap: 1.5rem;
          }
          
          .thumbs__card:nth-child(1),
          .thumbs__card:nth-child(2),
          .thumbs__card:nth-child(3),
          .thumbs__card:nth-child(4),
          .thumbs__card:nth-child(5) {
            grid-column: span 12;
            margin-top: 0;
          }
          
          .text__container {
            grid-column: span 12;
          }
          
          .text {
            font-size: 1.25rem;
          }
          
          .hero--3 .hero__headline {
            padding-left: 2rem;
            white-space: normal;
            font-size: clamp(2rem, 5vw, 3rem);
          }
          
          .hero__headline {
            font-size: clamp(2.5rem, 6vw, 4rem);
          }

          .hero__description {
            font-size: 1rem;
          }

          .hero__vision-text {
            font-size: 1.2rem;
            padding: 0 1rem;
          }

          .consulting-button {
            bottom: 15%;
            padding: 0.75rem 1.5rem;
            font-size: 0.8rem;
            white-space: normal;
            max-width: 90%;
            text-align: center;
          }

          .services-headline {
            font-size: 2rem;
          }

          .service-title {
            font-size: 1.5rem;
          }

          .service-description {
            font-size: 1rem;
          }

          .section-gap {
            height: 40px;
          }
        }
      `}</style>
    </>
  );
}