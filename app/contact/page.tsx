"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    connections: any[];
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current || sceneRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x0a0a1a);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2.0;
    
    // Clear any existing content and append
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(renderer.domElement);

    // Generate positions
    const positions: THREE.Vector3[] = [];
    const nrOfPositions = 50;
    
    for(let i = 0; i < nrOfPositions; i++) {
      let v = new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40, 
        (Math.random() - 0.5) * 40);
      positions.push(v);
    }

    // Create connections and lines
    interface Connection {
      p0: THREE.Vector3;
      p1: THREE.Vector3;
      dataPos: THREE.Vector3;
      lerp: number;
      sphere: THREE.Mesh;
    }
    
    const connections: Connection[] = [];
    
    for(let i = 0; i < 50; i++) {
      let index0 = Math.floor(Math.random() * positions.length);
      let index1 = Math.floor(Math.random() * positions.length);
      
      // Create sphere (data particle)
      const sphereGeometry = new THREE.SphereGeometry(0.2, 16, 16);
      const sphereMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x88ccff,
        emissive: 0x2266aa,
        emissiveIntensity: 2.0,
        roughness: 0.2,
        metalness: 0.2
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.castShadow = true;
      sphere.receiveShadow = true;  
      scene.add(sphere);
      
      // Create connection line
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x4488cc,
        transparent: true,
        opacity: 0.4
      });
      const points = [positions[index0], positions[index1]];
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
      
      connections.push({
        p0: positions[index0], 
        p1: positions[index1],
        dataPos: new THREE.Vector3(),
        lerp: Math.random(),
        sphere: sphere
      });
    }

    // Create NAVY BLUE GLOWING cubes at positions
    const geometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);
    
    // Main cube material
    const material = new THREE.MeshStandardMaterial({
      color: 0x000080,
      emissive: 0x0044aa,
      emissiveIntensity: 3.5,
      roughness: 0.15,
      metalness: 0.4,
    });

    // Add cubes and lights
    positions.forEach(p => {
      const cube = new THREE.Mesh(geometry, material);
      cube.castShadow = true;
      cube.receiveShadow = true;
      cube.position.set(p.x, p.y, p.z);
      
      const cubeLight = new THREE.PointLight(0x3366cc, 2.5, 20);
      cubeLight.position.set(p.x, p.y, p.z);
      scene.add(cubeLight);
      
      scene.add(cube);
    });

    // Add decorative spheres
    for(let i = 0; i < 40; i++) {
      const glowSphereGeo = new THREE.SphereGeometry(0.15, 12, 12);
      const glowSphereMat = new THREE.MeshStandardMaterial({
        color: 0x44aaff,
        emissive: 0x1155aa,
        emissiveIntensity: 2.5
      });
      const glowSphere = new THREE.Mesh(glowSphereGeo, glowSphereMat);
      
      const randomPos = positions[Math.floor(Math.random() * positions.length)];
      glowSphere.position.set(
        randomPos.x + (Math.random() - 0.5) * 3.5,
        randomPos.y + (Math.random() - 0.5) * 3.5,
        randomPos.z + (Math.random() - 0.5) * 3.5
      );
      scene.add(glowSphere);
    }

    // Add floating particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount; i++) {
      particlePositions[i*3] = (Math.random() - 0.5) * 60;
      particlePositions[i*3+1] = (Math.random() - 0.5) * 60;
      particlePositions[i*3+2] = (Math.random() - 0.5) * 60;
    }
    
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    const particleMat = new THREE.PointsMaterial({
      color: 0x88aaff,
      size: 0.1,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x224466);
    scene.add(ambientLight);
    
    // Add blue-tinted spotlights
    for(let i = 0; i < 8; i++) {
      const spotLight = new THREE.SpotLight(0x88aaff);
      spotLight.position.set(
        (Math.random() - 0.5) * 100, 
        (Math.random() - 0.5) * 100, 
        (Math.random() - 0.5) * 100);
      spotLight.castShadow = true;
      spotLight.angle = 0.4;
      spotLight.penumbra = 0.3;
      spotLight.decay = 1;
      spotLight.distance = 200;
      spotLight.intensity = 2.0 + Math.random() * 1.5;
      spotLight.lookAt(0, 0, 0);
      scene.add(spotLight);
    }

    const pointLight1 = new THREE.PointLight(0x2266cc, 3, 60);
    pointLight1.position.set(15, 15, 15);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x1155aa, 3, 60);
    pointLight2.position.set(-15, -10, 15);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0x3377dd, 4, 70);
    pointLight3.position.set(0, 20, 0);
    scene.add(pointLight3);

    // Add subtle fog
    scene.fog = new THREE.FogExp2(0x0a0a1a, 0.015);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.8;
    controls.autoRotateSpeed = 2.0;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.maxPolarAngle = Math.PI / 2;

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      controls,
      connections
    };

    // Handle resize
    const handleResize = () => {
      if (!sceneRef.current) return;
      sceneRef.current.camera.aspect = window.innerWidth / window.innerHeight;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      if (!sceneRef.current) return;
      
      const { scene, camera, renderer, controls, connections } = sceneRef.current;
      
      // Move data spheres along connections
      connections.forEach((connection: Connection) => {
        connection.dataPos.lerpVectors(connection.p0, connection.p1, connection.lerp);
        connection.sphere.position.set(connection.dataPos.x, connection.dataPos.y, connection.dataPos.z);
        connection.lerp += 0.008;
        if(connection.lerp > 1) {
          connection.lerp = 0;
        }
      });

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && sceneRef.current) {
        // Properly dispose Three.js resources
        sceneRef.current.renderer.dispose();
        sceneRef.current.scene.clear();
        containerRef.current.innerHTML = '';
        sceneRef.current = null;
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setFormStatus({ message: '', type: null });

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus({ 
        message: "Message sent successfully! We'll get back to you soon.", 
        type: 'success' 
      });
      
      form.reset();
    } catch (error) {
      setFormStatus({ 
        message: "Something went wrong. Please try again.", 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      color: '#ffffff',
      fontFamily: "'Space Grotesk', sans-serif",
      position: 'relative',
      overflowX: 'hidden',
      backgroundColor: '#0a0a1a'
    }}>
      {/* Navbar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        zIndex: 1000,
        boxShadow: 'rgba(0, 0, 0, 0.3) 0 1px 3px',
      }}>
        <Link href="/" style={{ color: '#5C4033', textDecoration: 'none', fontWeight: '600' }}>Home</Link>
        <Link href="/services" style={{ color: '#5C4033', textDecoration: 'none', fontWeight: '600' }}>Services</Link>
        <Link href="/projects" style={{ color: '#5C4033', textDecoration: 'none', fontWeight: '600' }}>Projects</Link>
        <Link href="/contact" style={{ color: '#5C4033', textDecoration: 'none', fontWeight: '600' }}>Contact</Link>
      </nav>

      {/* Three.js Canvas Background - Fixed behind everything */}
      <div 
        ref={containerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'auto', // Allow interaction with canvas
        }}
      />

      {/* Scrollable Content - On top of canvas */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          minHeight: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          pointerEvents: 'none', // Let clicks pass through to canvas by default
        }}
      >
        {/* Content wrapper with padding for navbar */}
        <div
          style={{
            width: '100%',
            maxWidth: '1200px',
            padding: '120px 20px 40px',
            margin: '0 auto',
            minHeight: '100vh',
          }}
        >
          {/* Brand Header - Non-interactive */}
          <div style={{
            textAlign: 'center',
            marginBottom: '50px',
            width: '100%',
            pointerEvents: 'none', // Clicks pass through to canvas
          }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 'bold',
              letterSpacing: '-0.02em',
              marginBottom: '10px',
              textTransform: 'uppercase',
              color: '#ffffff',
              textShadow: '0 2px 20px rgba(0, 0, 128, 0.8)'
            }}>
              SKS GROUPS
            </h1>
            <p style={{
              fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
              color: '#d0d0d0',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textShadow: '0 2px 10px rgba(0, 0, 128, 0.6)'
            }}>
              Designing the World of Tomorrow
            </p>
          </div>

          {/* Grid Layout - Container doesn't block clicks */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '25px',
            width: '100%',
            pointerEvents: 'none', // Container passes clicks through
          }}>
            
            {/* Left Column */}
            <div style={{ pointerEvents: 'none' }}>
              {/* Contact Info Card - ONLY THIS BLOCKS CLICKS */}
              <div 
                style={{
                  background: 'rgba(10, 10, 26, 0.7)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 0, 128, 0.3)',
                  borderRadius: '20px',
                  padding: '30px',
                  height: '100%',
                  boxShadow: '0 15px 35px rgba(0, 0, 128, 0.3)',
                  pointerEvents: 'auto', // This card blocks clicks
                }}
              >
                <h2 style={{
                  fontSize: '1.6rem',
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  color: '#ffffff'
                }}>
                  Let's Work Together
                </h2>
                <p style={{
                  color: '#b0b0b0',
                  marginBottom: '25px',
                  fontSize: '0.95rem',
                  lineHeight: '1.6'
                }}>
                  Transforming ideas into digital reality. Based in Chennai, serving the world.
                </p>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}>
                  {/* Phone */}
                  <a 
                    href="tel:+919080133878" 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      textDecoration: 'none',
                      color: 'inherit',
                      padding: '8px',
                      borderRadius: '10px',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 128, 0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 128, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#88ccff',
                      border: '1px solid rgba(0, 0, 128, 0.5)',
                      boxShadow: '0 0 15px rgba(0, 0, 128, 0.5)'
                    }}>
                      <i className="fas fa-phone-alt" style={{ fontSize: '0.9rem' }}></i>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', marginBottom: '2px' }}>Phone</div>
                      <div style={{ fontSize: '1rem', fontWeight: '500', color: '#ffffff' }}>+91 90801 33878</div>
                    </div>
                  </a>

                  {/* Email */}
                  <a 
                    href="mailto:contact@enhanzers.com" 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      textDecoration: 'none',
                      color: 'inherit',
                      padding: '8px',
                      borderRadius: '10px',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 128, 0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 128, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#88ccff',
                      border: '1px solid rgba(0, 0, 128, 0.5)',
                      boxShadow: '0 0 15px rgba(0, 0, 128, 0.5)'
                    }}>
                      <i className="fas fa-envelope" style={{ fontSize: '0.9rem' }}></i>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', marginBottom: '2px' }}>Email</div>
                      <div style={{ fontSize: '1rem', fontWeight: '500', color: '#ffffff' }}>contact@enhanzers.com</div>
                    </div>
                  </a>

                  {/* Email Alt */}
                  <a 
                    href="mailto:yogesh@enhanzers.com" 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      textDecoration: 'none',
                      color: 'inherit',
                      padding: '8px',
                      borderRadius: '10px',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 128, 0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 128, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#88ccff',
                      border: '1px solid rgba(0, 0, 128, 0.5)',
                      boxShadow: '0 0 15px rgba(0, 0, 128, 0.5)'
                    }}>
                      <i className="fas fa-envelope" style={{ fontSize: '0.9rem' }}></i>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', marginBottom: '2px' }}>Email (Alt)</div>
                      <div style={{ fontSize: '1rem', fontWeight: '500', color: '#ffffff' }}>yogesh@enhanzers.com</div>
                    </div>
                  </a>

                  {/* Location */}
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px'
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 128, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#88ccff',
                      border: '1px solid rgba(0, 0, 128, 0.5)',
                      boxShadow: '0 0 15px rgba(0, 0, 128, 0.5)'
                    }}>
                      <i className="fas fa-map-marker-alt" style={{ fontSize: '0.9rem' }}></i>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', marginBottom: '2px' }}>Location</div>
                      <div style={{ fontSize: '1rem', fontWeight: '500', color: '#ffffff' }}>Chennai, India</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ pointerEvents: 'none' }}>
              {/* Contact Form Card - ONLY THIS BLOCKS CLICKS */}
              <div 
                style={{
                  background: 'rgba(10, 10, 26, 0.7)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 0, 128, 0.3)',
                  borderRadius: '20px',
                  padding: '30px',
                  height: '100%',
                  boxShadow: '0 15px 35px rgba(0, 0, 128, 0.3)',
                  pointerEvents: 'auto', // This card blocks clicks
                }}
              >
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '25px',
                  borderBottom: '1px solid rgba(0, 0, 128, 0.3)',
                  paddingBottom: '12px',
                  color: '#ffffff'
                }}>
                  Send a Message
                </h3>
                
                <form 
                  onSubmit={handleSubmit} 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    pointerEvents: 'auto', // Form needs clicks
                  }}
                >
                  {/* Honeypot */}
                  <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                    <input type="text" name="website" tabIndex={-1} defaultValue="" autoComplete="off" />
                  </div>
                  
                  {/* Name Field */}
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Enter name"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: 'rgba(10, 10, 26, 0.8)',
                      border: '1px solid rgba(0, 0, 128, 0.3)',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 0 10px rgba(0, 0, 128, 0.2)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#000080';
                      e.currentTarget.style.backgroundColor = 'rgba(20, 20, 40, 0.9)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 0, 128, 0.5)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0, 0, 128, 0.3)';
                      e.currentTarget.style.backgroundColor = 'rgba(10, 10, 26, 0.8)';
                      e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 0, 128, 0.2)';
                    }}
                  />
                  
                  {/* Email Field */}
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Enter email"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: 'rgba(10, 10, 26, 0.8)',
                      border: '1px solid rgba(0, 0, 128, 0.3)',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 0 10px rgba(0, 0, 128, 0.2)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#000080';
                      e.currentTarget.style.backgroundColor = 'rgba(20, 20, 40, 0.9)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 0, 128, 0.5)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0, 0, 128, 0.3)';
                      e.currentTarget.style.backgroundColor = 'rgba(10, 10, 26, 0.8)';
                      e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 0, 128, 0.2)';
                    }}
                  />

                  {/* Message Field */}
                  <textarea 
                    name="message" 
                    rows={4} 
                    placeholder="Message us"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: 'rgba(10, 10, 26, 0.8)',
                      border: '1px solid rgba(0, 0, 128, 0.3)',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      boxShadow: '0 0 10px rgba(0, 0, 128, 0.2)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#000080';
                      e.currentTarget.style.backgroundColor = 'rgba(20, 20, 40, 0.9)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 0, 128, 0.5)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0, 0, 128, 0.3)';
                      e.currentTarget.style.backgroundColor = 'rgba(10, 10, 26, 0.8)';
                      e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 0, 128, 0.2)';
                    }}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      backgroundColor: '#000080',
                      color: '#ffffff',
                      fontWeight: '600',
                      padding: '12px',
                      borderRadius: '10px',
                      border: 'none',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '0.95rem',
                      opacity: isSubmitting ? 0.7 : 1,
                      marginTop: '5px',
                      boxShadow: '0 0 20px rgba(0, 0, 128, 0.7)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = '#0000a0';
                        e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 0, 128, 0.9)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = '#000080';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 0, 128, 0.7)';
                      }
                    }}
                  >
                    <span>{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                    {isSubmitting && (
                      <span style={{
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderLeftColor: '#ffffff',
                        borderRadius: '50%',
                        width: '16px',
                        height: '16px',
                        animation: 'spin 1s linear infinite',
                        display: 'inline-block'
                      }}></span>
                    )}
                  </button>

                  {formStatus.message && (
                    <div style={{
                      textAlign: 'center',
                      fontSize: '0.85rem',
                      color: formStatus.type === 'success' ? '#4ade80' : '#f87171',
                      marginTop: '5px'
                    }}>
                      {formStatus.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Footer - Non-interactive */}
          <footer style={{
            marginTop: '50px',
            color: '#888',
            fontSize: '0.8rem',
            textAlign: 'center',
            pointerEvents: 'none', // Clicks pass through to canvas
            paddingBottom: '40px'
          }}>
            &copy; {new Date().getFullYear()} SKS GROUPS. All rights reserved.
          </footer>
        </div>
      </div>

      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Space Grotesk', sans-serif;
          overflow-x: hidden;
          margin: 0;
          padding: 0;
          background-color: #0a0a1a;
        }

        /* BRIGHT WHITE focus style */
        *:focus,
        *:focus-visible {
          outline: none !important;
          box-shadow: 0 0 0 3px rgb(255, 255, 255) !important;
          border-radius: 4px !important;
        }

        input:focus, 
        textarea:focus,
        button:focus,
        a:focus {
          outline: none !important;
          box-shadow: 0 0 0 3px rgb(255, 255, 255) !important;
        }

        ::selection {
          background: rgba(255, 255, 255, 0.3) !important;
          color: #000000 !important;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(2, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }

        /* Custom scrollbar styling */
        ::-webkit-scrollbar {
          width: 10px;
          background: transparent;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 128, 0.2);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 128, 0.6);
          border-radius: 5px;
          border: 2px solid rgba(10, 10, 26, 0.5);
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 128, 0.9);
        }

        /* Firefox scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 128, 0.6) rgba(0, 0, 128, 0.2);
        }
      `}</style>
    </div>
  );
}