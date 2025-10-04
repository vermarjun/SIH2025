import { Card, CardContent } from "@/Components/ui/card";
import { useRef, useState, useEffect } from "react";

interface ImageCardProps {
  images: string[];
}

const ImageCard: React.FC<ImageCardProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = rect.height;
      // Calculate when the container is in the center of the viewport
      const containerCenter = rect.top + containerHeight / 2;
      const viewportCenter = windowHeight / 2;
      // Distance from viewport center (-windowHeight/2 to windowHeight/2)
      const distanceFromCenter = containerCenter - viewportCenter;
      // Convert to progress (0 to 1, where 1 is fully animated)
      const maxDistance = windowHeight * 0.6; // Animation completes when container is 60% of viewport height from center
      const progress = Math.max(
        0,
        Math.min(1, 1 - Math.abs(distanceFromCenter) / maxDistance)
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Easing function for smooth animation
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  const animatedProgress = easeOutCubic(scrollProgress);

  // Calculate transforms based on scroll progress
  const leftCardTransform = {
    x: -110 * animatedProgress, // Starts at 0, moves to -165%
    rotation: -8 * animatedProgress, // Starts at 0, rotates to -8deg
    scale: 0.95 + 0.05 * animatedProgress, // Starts smaller, scales to full size
    zIndex: 1,
  };

  const centerCardTransform = {
    x: 0,
    rotation: 0,
    scale: 0.95 + 0.05 * animatedProgress,
    zIndex: 10,
  };

  const rightCardTransform = {
    x: 110 * animatedProgress, // Starts at 0, moves to 65%
    rotation: 8 * animatedProgress, // Starts at 0, rotates to 8deg
    scale: 0.95 + 0.05 * animatedProgress,
    zIndex: 1,
  };

  const cardStyle = (transform: any) => ({
    transform: `translateX(${transform.x}%) rotate(${transform.rotation}deg) scale(${transform.scale})`,
    zIndex: transform.zIndex,
    transition: "none", // We handle animation via scroll
  });

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-[200px] md:h-[500px] overflow-hidden px-4 sm:px-8"
    >
      {/* Left Card */}
      <Card
        className="p-0 absolute left-1/2 -translate-x-1/2 shadow-2xl overflow-hidden rounded-xl sm:rounded-2xl w-[100px] sm:w-[280px] md:w-[350px] lg:w-[400px] h-[160px] sm:h-[340px] md:h-[390px] lg:h-[420px] origin-center"
        style={cardStyle(leftCardTransform)}
      >
        <CardContent className="p-0 w-full h-full">
          <img
            src={
              images[0] ||
              "https://res.cloudinary.com/dkzeey5iq/image/upload/v1758484202/WhatsApp_Image_2025-09-22_at_00.30.43_owefui.webp"
            }
            alt="left"
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </CardContent>
      </Card>

      {/* Center Card */}
      <Card
        className="p-0 absolute left-1/2 -translate-x-1/2 shadow-3xl overflow-hidden rounded-xl sm:rounded-2xl w-[100px] sm:w-[280px] md:w-[350px] lg:w-[400px] h-[180px] sm:h-[360px] md:h-[420px] lg:h-[450px] origin-center"
        style={cardStyle(centerCardTransform)}
      >
        <CardContent className="p-0 w-full h-full">
          <img
            src={
              images[1] ||
              "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=450&fit=crop"
            }
            alt="center"
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </CardContent>
      </Card>

      {/* Right Card */}
      <Card
        className="p-0 absolute left-1/2 -translate-x-1/2 shadow-2xl overflow-hidden rounded-xl sm:rounded-2xl w-[100px] sm:w-[280px] md:w-[350px] lg:w-[400px] h-[160px] sm:h-[340px] md:h-[390px] lg:h-[420px] origin-center"
        style={cardStyle(rightCardTransform)}
      >
        <CardContent className="p-0 w-full h-full">
          <img
            src={
              images[2] ||
              "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=420&fit=crop"
            }
            alt="right"
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </CardContent>
      </Card>
    </div>
  );
};

const BottomSection = () => {
    return (
        <div className="text-green-950 md:py-16 py-8 px-6 text-center">
        <h2 className="text-2xl md:text-6xl font-semibold max-w-full mx-auto mb-2 md:mb-6">
          We drive transformation through innovative technology and operational
          excellence,
        </h2>
        <p className="text-lg md:text-4xl text-green-800 max-w-5xl mx-auto mb-4 md:mb-10">
          ensuring profitable and sustainable solutions for farmers!
        </p>

        <div className="flex justify-center items-centers">
          <ImageCard
            images={[
              "https://res.cloudinary.com/dkzeey5iq/image/upload/f_auto,q_auto/v1758642696/IMG_8559_uyzkhr.webp", // left
              "https://res.cloudinary.com/dkzeey5iq/image/upload/f_auto,q_auto/v1758642702/IMG-20250201-WA0047_wlaizu.webp", // center
              "https://res.cloudinary.com/dkzeey5iq/image/upload/f_auto,q_auto/v1758642682/IMG-20250201-WA0018_ynr7pd.webp", // right
            ]}
          />
        </div>
      </div>
    )
}

export default BottomSection