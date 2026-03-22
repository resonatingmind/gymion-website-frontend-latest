import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-[#080810] text-[#EEEDF8] px-6 relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Background orbs */}
      <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-[#7C3AED]/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-[#06B6D4]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Logo */}
        <Link href="/" className="mb-12">
          <img src="/Logo/GYMION White logo.png" alt="Gymion Logo" className="h-9" />
        </Link>

        {/* 404 Number */}
        <h1 className="text-[120px] sm:text-[160px] font-extrabold leading-none tracking-[-6px] bg-gradient-to-r from-[#A78BFA] via-[#60A5FA] to-[#67E8F9] text-transparent bg-clip-text mb-2">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.5px] mb-4">
          Page not found
        </h2>

        {/* Description */}
        <p className="text-[#9D9CB5] text-base sm:text-lg leading-relaxed max-w-md mb-10">
          Looks like this page skipped leg day and disappeared. Let&apos;s get you back on track.
        </p>

        {/* CTA Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] via-[#3B82F6] to-[#06B6D4] text-white font-bold py-3.5 px-8 rounded-[14px] transition-all shadow-[0_0_24px_rgba(124,58,237,0.25)] hover:shadow-[0_4px_32px_rgba(124,58,237,0.4)] hover:-translate-y-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Go back home
        </Link>

        {/* Subtle footer */}
        <p className="text-[#6B6A80] text-xs mt-16 tracking-wider">
          GYMION — Built for gym owners who mean business.
        </p>
      </div>
    </div>
  );
}
