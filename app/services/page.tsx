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

        // Fade out hero 1 text and description when reaching thumbs
        gsap.timeline({
          scrollTrigger: {
            trigger: ".thumbs",
            start: "top bottom",
            end: "top center",
            scrub: 1,
          },
        })
        .to(".hero--1 .hero__headline", { opacity: 0, pointerEvents: "none" })
        .to(".hero--1 .hero__description", { opacity: 0, pointerEvents: "none" }, "<");

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
      <div className="sticky-sections" style={{ background: '#e8ddd0' }}>
        {/* Section 1 - Infrastructure */}
        <section className="section section--1">
          <div className="hero hero--1">
            <div className="hero__content">
              <h1 className="hero__headline" style={{ color: '#2c1a0a' }}>OUR SERVICES</h1>
              {/* Description text aligned below headline */}
              <p className="hero__description" style={{ color: '#7a5230' }}>
                We are a professional company specializing in infrastructure development, 
                construction, and building services. Our goal is to deliver high-quality 
                projects that meet modern standards and client expectations. With a skilled 
                team and strong technical expertise, we focus on building reliable and 
                sustainable structures that support community growth and development.
              </p>
            </div>
            <div className="hero__background" style={{ background: '#a8835a' }}></div>
          </div>
          
          <div className="thumbs">
            <div className="container">
              {/* ADDED PADDING HERE - space between the description and the Bridge Engineering card */}
              <div style={{ height: '80px', backgroundColor: 'transparent' }}></div>
              <div className="grid">
                <div className="thumbs__card service-card">
                  <img 
                    alt="Bridge Construction" 
                    src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1742&auto=format&fit=crop" 
                  />
                  <div className="legend">
                    <h2>Bridge Engineering</h2>
                    <p>We deliver comprehensive bridge solutions from concept to completion. Our expert team handles structural analysis, design optimization, and construction supervision. Every project meets rigorous safety standards while ensuring minimal environmental impact and maximum durability for decades of reliable service.</p>
                  </div>
                </div>
                <div className="thumbs__card service-card">
                  <img 
                    alt="Road Construction" 
                    src="https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1740&auto=format&fit=crop" 
                  />
                  <div className="legend">
                    <h2>Highway Systems</h2>
                    <p>Our highway engineering expertise spans urban expressways and rural connectors. We integrate smart traffic management, sustainable drainage solutions, and durable pavement designs. From feasibility studies to final construction, we create road networks that enhance connectivity and economic growth.</p>
                  </div>
                </div>
                <div className="thumbs__card service-card">
                  <img 
                    alt="Railway Infrastructure" 
                    src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1742&auto=format&fit=crop" 
                  />
                  <div className="legend">
                    <h2>Rail Networks</h2>
                    <p>We specialize in modern rail infrastructure including high-speed corridors, commuter lines, and freight networks. Our services encompass track design, signaling systems, electrification, and station development. We prioritize safety, efficiency, and seamless integration with existing transportation systems.</p>
                  </div>
                </div>
                <div className="thumbs__card service-card">
                  <img 
                    alt="Tunnel Construction" 
                    src="https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1740&auto=format&fit=crop " 
                  />
                  <div className="legend">
                    <h2>Tunnel Projects</h2>
                    <p>Our tunneling expertise covers road, rail, and utility tunnels through challenging geological conditions. We employ advanced excavation methods, continuous monitoring systems, and robust safety protocols. Each project is engineered for longevity, with careful attention to groundwater control and structural integrity.</p>
                  </div>
                </div>
                <div className="thumbs__card service-card">
                  <img 
                    alt="Port Infrastructure" 
                    src= "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1742&auto=format&fit=crop" 
                  />
                  <div className="legend">
                    <h2>Port Development</h2>
                    <p>We deliver comprehensive port solutions including container terminals, bulk handling facilities, and cruise ship docks. Our services encompass dredging, quay wall construction, cargo handling systems, and logistics integration. We create efficient maritime gateways that support global trade and economic development.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visit Our Projects Section - with CSS fade effect from the example */}
        <section style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#e8ddd0',
          position: 'relative',
          zIndex: 10,
        }}>
          <div className="text-wrapper" style={{ 
            '--text-color': '#2c1a0a',
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            top: 'auto',
          } as React.CSSProperties}>
            <h1 className="fade-from-left" style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}>
              Visit Our Projects
            </h1>
            <p className="fade-from-right" style={{ 
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.6,
              marginBottom: '2.5rem',
            }}>
              Explore our portfolio of completed and ongoing infrastructure projects 
              delivered with precision, quality, and care.
            </p>
            <div className="fade-from-top">
              <Link href="/projects" className="button" style={{ 
                color: '#2c1a0a', 
                borderColor: '#2c1a0a',
                backgroundColor: 'transparent',
                display: 'inline-block',
              }}><span>Explore Projects →</span></Link>
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;400;500;900&display=swap');

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
          cursor: pointer;
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
          background: #a8835a;
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
          margin-bottom: 0;
          padding: 20vh 0 0;
          background: transparent;
        }

        /* Service Card Styles - Updated with hover animation */
        .service-card {
          overflow: hidden;
          position: relative;
          cursor: pointer;
          width: 100%;
          height: auto;
          border-radius: 8px;
          transition: 200ms ease-in-out;
          box-shadow: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.75rem;
          will-change: transform;
        }

        .service-card > img {
          position: absolute;
          z-index: 1;
          inset: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
          transition: transform 200ms;
          border-radius: 8px;
        }

        .service-card:hover > img {
          transform: scale(1.05);
        }

        .service-card:hover {
          box-shadow: -15px -15px 0px 0px rgba(99, 190, 182, 0.5);
        }

        .service-card:hover > .legend {
          height: auto;
          width: 100%;
          padding: 16px;
          z-index: 10;
        }

        .service-card:hover > .legend > p {
          font-size: 0.9rem;
          word-break: break-word;
          max-width: 100%;
          line-height: 1.5;
          margin-top: 0.5rem;
        }

        .service-card > .legend {
          position: absolute;
          background-color: rgba(242, 167, 195, 0.9);
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0%;
          transition: height 200ms;
          overflow: hidden;
          z-index: 5;
          border-radius: 0 0 8px 8px;
          color: #242424;
        }

        .service-card > .legend > h2 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          font-family: 'Syne', sans-serif;
        }

        .service-card > .legend > p {
          font-size: 0;
          transition: font-size 200ms;
          font-family: 'DM Sans', sans-serif;
        }

        /* Maintain original grid positioning */
        .service-card:nth-child(1) {
          grid-column: 4 / span 5;
        }

        .service-card:nth-child(1) {
          aspect-ratio: 16 / 9;
        }

        .service-card:nth-child(2) {
          grid-column: 2 / span 3;
          margin-top: 8rem;
        }

        .service-card:nth-child(2) {
          aspect-ratio: 4 / 3;
        }

        .service-card:nth-child(3) {
          grid-column: 8 / span 3;
          margin-top: -8rem;
        }

        .service-card:nth-child(3) {
          aspect-ratio: 3 / 4;
        }

        .service-card:nth-child(4) {
          grid-column: 3 / span 4;
        }

        .service-card:nth-child(4) {
          aspect-ratio: 1 / 1;
        }

        .service-card:nth-child(5) {
          grid-column: 7 / span 4;
        }

        .service-card:nth-child(5) {
          aspect-ratio: 16 / 9;
        }

        .thumbs__card-headline {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1.3;
          padding-left: 0.5rem;
          position: relative;
          z-index: 2;
          margin-top: 0.5rem;
        }

        .thumbs__card-text {
          font-size: 1rem;
          line-height: 1.5;
          opacity: 0.8;
          max-width: 85%;
          padding-left: 0.5rem;
          position: relative;
          z-index: 2;
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
          width: '100%';
          position: relative;
          z-index: 5;
        }

        /* CSS Fade Effects from the example */
        .text-wrapper {
          margin: 6rem 4rem;
          padding: 1px;
          width: 100%;
          max-width: 800px;
          position: sticky;
          top: 6rem;
        }

        .fade-from-left {
          background: 
            linear-gradient(to top left, transparent 50%, var(--text-color) 60%, var(--text-color) 0) left bottom 25vh / 100vw 30vh fixed no-repeat,
            linear-gradient(to top, transparent 55%, var(--text-color) 0) left bottom 0vh / 100vw 100vh fixed no-repeat;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .fade-from-top {
          background: 
            linear-gradient(to top, transparent 27%, var(--text-color) 40%, var(--text-color) 0) left bottom 0vh / 100vw 100vh fixed no-repeat;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .fade-from-right {
          background: 
            linear-gradient(to top right, transparent 50%, var(--text-color) 60%, var(--text-color) 0) left bottom 25vh / 100vw 30vh fixed no-repeat,
            linear-gradient(to top, transparent 55%, var(--text-color) 0) left bottom 0vh / 100vw 100vh fixed no-repeat;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .fade-from-top-dots {
          background: 
            url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4"%3E%3Cpath fill="%23ffffff" fill-opacity="0.8" d="M1 3h1v1H1V3zm2-2h1v1H3V1z"%3E%3C/path%3E%3C/svg%3E'),
            linear-gradient(to top, transparent 27%, var(--text-color) 40%, var(--text-color) 0) left bottom 0vh / 100vw 100vh fixed no-repeat;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        @media (max-width: 768px) {
          .grid {
            gap: 1.5rem;
          }
          
          .service-card:nth-child(1),
          .service-card:nth-child(2),
          .service-card:nth-child(3),
          .service-card:nth-child(4),
          .service-card:nth-child(5) {
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

          .text-wrapper {
            margin: 2rem 1rem;
            top: 4rem;
          }

          .service-card:hover > .legend > p {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </>
  );
}