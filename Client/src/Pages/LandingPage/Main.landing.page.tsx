import React, { Suspense, lazy } from "react";
import LazyWrapper from "./LazyWrapper.landing.page";
import GlassyNavbar from "./Navbar.landing.page";
import BottomSection from "./TiltCards.landing.page";

// Lazy load all components except Navbar (which should load immediately)
const Hero = lazy(() => import("./Hero.landing.page"));
const Features = lazy(() => import("./Features.landing.page"));
const Testimonials = lazy(() => import("./Testimonials.landing.page"));
const Footer = lazy(() => import("./Footer.landing.page"));
const EndPageCTA = lazy(() => import("./EndpageCTA.landing.page"));
const LocationComponent = lazy(()=> import ("./Location.landing.page"))

// Loading fallback component
const LoadingFallback: React.FC<{ height?: string }> = ({
  height = "h-64",
}) => (
  <div className={`${height} flex items-center justify-center`}>
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-gray-800 h-4 w-4"></div>
      <div className="rounded-full bg-gray-800 h-4 w-4"></div>
      <div className="rounded-full bg-gray-800 h-4 w-4"></div>
    </div>
  </div>
);

const LandingPage: React.FC = () => {
  return (
    <div className="">
      <div className="absolute w-screen">
        <GlassyNavbar />
      </div>
      <Hero />
      <LazyWrapper fallback={<LoadingFallback />}>
        <Suspense fallback={<LoadingFallback />}>
          <BottomSection/>
        </Suspense>
      </LazyWrapper>
      <Features />
      <Testimonials />
      <LocationComponent />
      <EndPageCTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
