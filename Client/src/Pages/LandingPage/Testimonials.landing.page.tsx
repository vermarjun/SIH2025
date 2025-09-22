import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const images = [
  "https://res.cloudinary.com/dkzeey5iq/image/upload/v1758484202/WhatsApp_Image_2025-09-22_at_00.30.41_tarcwt.jpg",
  "https://res.cloudinary.com/dkzeey5iq/image/upload/v1758484207/WhatsApp_Image_2025-09-22_at_00.30.40_kdvh2h.jpg",
  "https://res.cloudinary.com/dkzeey5iq/image/upload/v1758484202/WhatsApp_Image_2025-09-22_at_00.30.43_owefui.jpg",
  "https://res.cloudinary.com/dkzeey5iq/image/upload/v1758484202/WhatsApp_Image_2025-09-22_at_00.30.41_tarcwt.jpg",
  "https://res.cloudinary.com/dkzeey5iq/image/upload/v1758484207/WhatsApp_Image_2025-09-22_at_00.30.40_kdvh2h.jpg",
  "https://res.cloudinary.com/dkzeey5iq/image/upload/v1758484202/WhatsApp_Image_2025-09-22_at_00.30.43_owefui.jpg",
  "https://res.cloudinary.com/dkzeey5iq/image/upload/v1758484202/WhatsApp_Image_2025-09-22_at_00.30.41_tarcwt.jpg",
  "https://res.cloudinary.com/dkzeey5iq/image/upload/v1758484207/WhatsApp_Image_2025-09-22_at_00.30.40_kdvh2h.jpg",
  "https://res.cloudinary.com/dkzeey5iq/image/upload/v1758484202/WhatsApp_Image_2025-09-22_at_00.30.43_owefui.jpg",
  "https://res.cloudinary.com/dkzeey5iq/image/upload/v1758484202/WhatsApp_Image_2025-09-22_at_00.30.41_tarcwt.jpg",
  "https://res.cloudinary.com/dkzeey5iq/image/upload/v1758484207/WhatsApp_Image_2025-09-22_at_00.30.40_kdvh2h.jpg",
  "https://res.cloudinary.com/dkzeey5iq/image/upload/v1758484202/WhatsApp_Image_2025-09-22_at_00.30.43_owefui.jpg",
];

const firstRow = images.slice(0, 4);
const secondRow = images.slice(4, 8);
const thirdRow = images.slice(8, 12);

const ImageCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        "relative aspect-[16/9] w-60 md:w-80 cursor-pointer overflow-hidden rounded-xl border-2",
        "border-green-100 bg-white hover:bg-green-50 transition-all duration-300 shadow-sm hover:shadow-md hover:border-green-300"
      )}
    >
      <img
        loading="lazy"
        className="w-full h-full object-cover rounded-xl"
        alt=""
        src={img}
      />
    </figure>
  );
};

const VideoCard = ({ vid }: { vid: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {});
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.5 } // play only when at least 50% visible
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <figure
      className={cn(
        "relative aspect-[16/9] w-40 sm:w-60 md:w-80 lg:w-96 cursor-pointer overflow-hidden rounded-xl border-2",
        "border-green-100 bg-white hover:bg-green-50 transition-all duration-300 shadow-sm hover:shadow-md hover:border-green-300"
      )}
    >
      <video
        preload="none"
        ref={videoRef}
        loop
        muted // Added muted to help with autoplay restrictions
        autoPlay
        playsInline // Added for iOS compatibility
        className="w-full h-full object-cover rounded-xl"
        poster="https://dummyimage.com/400x300/e5e7eb/4ade80&text=Loading..."
        src={vid}
      />
    </figure>
  );
};

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
}

function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:0.5rem] gap-4 md:[--gap:1rem] md:gap-8", // Reduced gap from 1rem to 0.5rem and gap-16 to gap-4
        "flex-row",
        className
      )}
    >
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around gap-4 md:gap-8 flex-row", // Reduced gap from 16 to 4
              "animate-[marquee_var(--duration)_linear_infinite]",
              pauseOnHover && "group-hover:[animation-play-state:paused]",
              reverse && "[animation-direction:reverse]"
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

export function ProductVideos() {
  return (
    <div className="relative flex h-fit flex-col items-center justify-center overflow-hidden bg-white">
      <div className="w-full flex justify-center items-center pb-6"> {/* Reduced padding from pb-8 to pb-6 */}
        <div className="text-center">
          <div className="font-bold text-4xl md:text-7xl text-gray-900 mb-4">
            Testing
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto px-4">
            We tested our Sensor Nodes, Hubs, Transmitter and Recievers in real laboratories and farm fields. 
          </p>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - 0.5rem)); } /* Reduced gap from 1rem to 0.5rem */
        }
      `}</style>

      <Marquee className="[--duration:20s] mb-2"> {/* Reduced margin from mb-4 to mb-2 */}
        {firstRow.map((item, index) => {
          if (item.endsWith(".mp4")) {
            return <VideoCard key={`first-${index}`} vid={item} />;
          } else {
            return <ImageCard key={`first-${index}`} img={item} />;
          }
        })}
      </Marquee>

      <Marquee reverse className="[--duration:25s] mb-2"> {/* Reduced margin from mb-4 to mb-2 */}
        {secondRow.map((item, index) => {
          if (item.endsWith(".mp4")) {
            return <VideoCard key={`second-${index}`} vid={item} />;
          } else {
            return <ImageCard key={`second-${index}`} img={item} />;
          }
        })}
      </Marquee>

      <Marquee className="[--duration:30s]">
        {thirdRow.map((item, index) => {
          if (item.endsWith(".mp4")) {
            return <VideoCard key={`third-${index}`} vid={item} />;
          } else {
            return <ImageCard key={`third-${index}`} img={item} />;
          }
        })}
      </Marquee>
    </div>
  );
}

export default ProductVideos