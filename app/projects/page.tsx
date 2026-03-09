"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Projects() {
  const router = useRouter();
  const [hovered, setHovered] = useState<number | null>(null);

  const goToProject = (id: number) => {
    if (id === 1) router.push("/projects/project1");
    if (id === 2) router.push("/projects/project3");
  };

  return (
    <>
      <style>{`

      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

      *{
        box-sizing:border-box;
        margin:0;
        padding:0;
      }

      body{
        background:#e8ddd0;
      }

      /* NAV */

      .nav-link{
        font-family:'DM Sans';
        font-size:.85rem;
        letter-spacing:.12em;
        text-transform:uppercase;
        color:#5c3a1e;
        text-decoration:none;
        position:relative;
      }

      .nav-link::after{
        content:'';
        position:absolute;
        left:0;
        bottom:-4px;
        width:0;
        height:1px;
        background:#a8835a;
        transition:.3s;
      }

      .nav-link:hover::after{
        width:100%;
      }

      /* HERO */

      .hero{
        padding:110px 20px 50px;
        max-width:900px;
        margin:auto;
        text-align:center;
      }

      .hero h1{
        font-family:'Cormorant Garamond';
        font-size:clamp(2rem,4vw,3rem);
        font-weight:600;
        color:#2c1a0a;
        line-height:1.35;
      }

      .section{
        max-width:1200px;
        margin:auto;
        padding:60px 20px;
      }

      .section-title{
        font-family:'Cormorant Garamond';
        font-size:clamp(1.8rem,4vw,2.6rem);
        margin-bottom:30px;
        color:#2c1a0a;
      }

      /* GRID */

      .project-row{
        display:grid;
        gap:30px;
      }

      @media(min-width:900px){
        .project-row{
          grid-template-columns:1.4fr 1fr;
          align-items:center;
        }

        .reverse{
          grid-template-columns:1fr 1.4fr;
        }
      }

      /* CARD */

      .project-card{
        width:100%;
        border-radius:16px;
        overflow:hidden;
        position:relative;
        cursor:pointer;
        aspect-ratio:16/9;
        transition:.35s;
        border:1px solid rgba(168,131,90,0.3);
      }

      .project-card img{
        width:100%;
        height:100%;
        object-fit:cover;
        transition:transform .5s;
      }

      .project-card:hover img{
        transform:scale(1.05);
      }

      .overlay{
        position:absolute;
        inset:0;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        background:rgba(0,0,0,.45);
        color:white;
        opacity:0;
        transition:.35s;
      }

      .project-card:hover .overlay{
        opacity:1;
      }

      .overlay h3{
        font-family:'Cormorant Garamond';
        font-size:2rem;
        letter-spacing:.05em;
      }

      .overlay span{
        margin-top:6px;
        font-size:.75rem;
        letter-spacing:.15em;
        text-transform:uppercase;
      }

      /* LABEL */

      .card-label{
        position:absolute;
        bottom:14px;
        left:14px;
        background:rgba(0,0,0,.55);
        backdrop-filter:blur(6px);
        padding:6px 14px;
        border-radius:40px;
        font-size:.7rem;
        letter-spacing:.12em;
        text-transform:uppercase;
        color:white;
        font-family:'DM Sans';
      }

      /* INFO */

      .info-card{
        background:#efe6d8;
        padding:36px;
        border-radius:16px;
        border:1px solid rgba(168,131,90,0.25);
        box-shadow:0 8px 30px rgba(0,0,0,.08);
      }

      .info-title{
        font-family:'Cormorant Garamond';
        font-size:1.6rem;
        margin-bottom:10px;
      }

      .info-text{
        font-family:'DM Sans';
        font-size:.95rem;
        line-height:1.7;
        color:#5c3a1e;
      }

      /* MOBILE */

      @media(max-width:768px){

        .project-row{
          grid-template-columns:1fr;
        }

        .info-card{
          padding:22px;
        }

        .project-card{
          aspect-ratio:4/3;
        }

      }

      `}</style>

      <div>

        <NavBar/>

        <section className="hero">
          <h1>
            Building the future with innovative infrastructure solutions
          </h1>
        </section>

        {/* SECTION 1 */}

        <section className="section">

          <h2 className="section-title">Infrastructure Projects</h2>

          <div className="project-row">

            <div
              className="project-card"
              onClick={()=>goToProject(1)}
            >
              <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1400&auto=format&fit=crop"/>

              <span className="card-label">Smart City</span>

              <div className="overlay">
                <h3>SMART CITY</h3>
                <span>View Project</span>
              </div>

            </div>

            <div className="info-card">

              <h3 className="info-title">
                METRO CORRIDOR
              </h3>

              <p className="info-text">
                A 15km elevated metro corridor now connects major business districts across the city.
                Eight modern stations feature smart ticketing and real-time information systems.
                Commute times have been reduced by 45 minutes for thousands of daily passengers.
                The corridor serves over 500,000 commuters each day with reliable service.
              </p>

            </div>

          </div>

        </section>


        {/* SECTION 2 */}

        <section className="section">

          <h2 className="section-title">
            Construction & Consulting
          </h2>

          <div className="project-row reverse">

            <div className="info-card">

              <h3 className="info-title">
                GREEN TOWER
              </h3>

              <p className="info-text">
                This LEED-certified commercial tower was built using sustainable materials.
                Energy-efficient HVAC systems reduce power consumption while maintaining
                optimal indoor comfort. Solar panels and rainwater harvesting make the
                building largely self-sufficient.
              </p>

            </div>

            <div
              className="project-card"
              onClick={()=>goToProject(2)}
            >

              <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1400&auto=format&fit=crop"/>

              <span className="card-label">
                Business Hub
              </span>

              <div className="overlay">
                <h3>BUSINESS HUB</h3>
                <span>View Project</span>
              </div>

            </div>

          </div>

        </section>

        <Footer/>

      </div>
    </>
  );
}

function NavBar(){

  const [open,setOpen] = useState(false)

  return(
    <>
      

      {open && (

        <div style={{
          position:"fixed",
          inset:0,
          background:"#efe6d8",
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center",
          gap:"30px",
          zIndex:999
        }}>

          <Link href="/" onClick={()=>setOpen(false)} className="nav-link">Home</Link>
          <Link href="/services" onClick={()=>setOpen(false)} className="nav-link">Services</Link>
          <Link href="/projects" onClick={()=>setOpen(false)} className="nav-link">Projects</Link>
          <Link href="/contact" onClick={()=>setOpen(false)} className="nav-link">Contact</Link>

        </div>

      )}

    </>
  )
}

function Footer(){

  return(

    <footer style={{
      borderTop:"1px solid rgba(168,131,90,0.25)",
      padding:"30px",
      marginTop:"40px",
      display:"flex",
      justifyContent:"space-between",
      flexWrap:"wrap",
      gap:"10px"
    }}>

      <span style={{
        fontSize:".8rem",
        color:"#a8835a",
        fontFamily:"DM Sans"
      }}>
        © 2024 — All Rights Reserved
      </span>

      <span style={{
        fontFamily:"Cormorant Garamond",
        fontWeight:600,
        color:"#4e2f10"
      }}>
        Infrastructure · Construction · Consulting
      </span>

    </footer>

  )
}