import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#5C4033] text-white relative">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white shadow-md p-5 flex justify-center gap-10 text-[#5C4033] font-semibold tracking-wide">
        <Link href="/">Home</Link>
        <Link href="/services">Services</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      {/* Center Content */}
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-6xl font-bold tracking-widest">Contact</h1>
      </div>

    </div>
  );
}