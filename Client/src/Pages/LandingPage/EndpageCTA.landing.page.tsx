import React from "react";

interface EndPageCTAProps {
  /** path to background image (public folder or absolute URL) */
  imageSrc?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  ctaText?: string;
}

export default function EndPageCTA({
  imageSrc = "https://amazingfoodanddrink.com/wp-content/uploads/2024/05/The-Importance-of-Organic-Farming-in-Ireland_-259036356.jpg",
  title = (
    <>
      Ready to Make you
      <br />
      Farm Smart?
    </>
  ),
  subtitle = (
    <>
      We bring smart irrigation, crop health monitoring, and real time insights in one system, using AI and IoT to create a practical, scalable solution for farmers
    </>
  ),
  ctaText = "Get Free Consultation",
}: EndPageCTAProps) {
  return (
    <section className="relative w-full min-h-[68vh] lg:min-h-[76vh] flex items-center justify-center bg-white">
      {/* Background image (fills) */}
      <img
        src={imageSrc}
        alt="Farm landscape"
        className="absolute inset-0 w-full h-full object-cover object-bottom"
        style={{ zIndex: 0 }}
      />

      {/* White-ish top fade overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 18%, rgba(255,255,255,0.75) 32%, rgba(255,255,255,0.35) 48%, rgba(255,255,255,0.0) 72%)",
        }}
      />

      {/* Optional subtle side vignette to focus center (tiny) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.0) 45%, rgba(0,0,0,0.03) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 max-w-3xl text-center px-6 md:px-8 lg:px-0"
        style={{ transform: "translateY(-8%)" }} // raises the text slightly like the reference
      >
        <h2 className="font-extrabold text-gray-900 leading-tight tracking-tight text-4xl sm:text-5xl md:text-[56px] lg:text-[72px]">
          {title}
        </h2>

        <p className="mt-5 p-4 text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto bg-white/10 backdrop-blur-2xl rounded-full">
          {subtitle}
        </p>

        <div className="mt-8 flex items-center justify-center">
          {/* Pill CTA */}
          <button
            type="button"
            className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-black text-white text-base font-medium shadow-lg hover:opacity-95 transition"
          >
            <span>{ctaText}</span>

            {/* small white circular icon with arrow (like the reference) */}
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-black"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h12" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
