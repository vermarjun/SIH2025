import { useRef, useState, useEffect } from "react";

export interface TimelineEntry {
  title: string;
  prompt: string;
  mediaSrc: string[]; // Changed to expect single image (first item will be used)
  alt?: string[];
}

export interface TimelineProps {
  data: TimelineEntry[];
}

export const Timeline = ({ data }: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  const imageRefs = useRef<HTMLImageElement[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Use ResizeObserver for efficient height tracking
  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [data]);

  // Fixed scroll animation for the beam - centered on viewport
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress based on container position relative to viewport center
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const viewportCenter = windowHeight / 2;

      // Progress starts when container top reaches viewport center
      // Progress completes when container bottom reaches viewport center
      const startPoint = containerTop - viewportCenter;
      const endPoint = containerTop + containerHeight - viewportCenter;

      let progress;
      if (startPoint > 0) {
        // Container hasn't reached center yet
        progress = 0;
      } else if (endPoint < 0) {
        // Container has completely passed center
        progress = 1;
      } else {
        // Container is crossing the center - calculate progress
        progress = Math.abs(startPoint) / containerHeight;
      }

      progress = Math.min(1, Math.max(0, progress));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Lazy loading for images
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const image = entry.target as HTMLImageElement;
          if (entry.isIntersecting && !image.src && image.dataset.src) {
            image.src = image.dataset.src;
            image.classList.remove("opacity-0");
            image.classList.add("opacity-100");
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    imageRefs.current.forEach((image) => {
      if (image) observer.observe(image);
    });

    return () => {
      imageRefs.current.forEach((image) => {
        if (image) observer.unobserve(image);
      });
    };
  }, [data]);

  return (
    <div className="w-full font-sans min-h-screen" ref={containerRef}>
      {/* Heading Section */}
      <div className="w-full flex justify-center items-center pb-10 md:pb-16">
        <div className="text-center">
          <div className="font-bold text-4xl md:text-7xl text-gray-900 mb-4">
            Smart Features
          </div>
          <p className="text-md md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Revolutionizing agriculture with AI-powered solutions for
            sustainable farming
          </p>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="w-full relative pb-24">
        <div
          ref={ref}
          className="relative max-w-7xl mx-auto flex flex-col gap-12 md:gap-24"
        >
          {data.map((item, index) => (
            <div key={index} className="flex justify-start md:gap-12 relative">
              {/* Timeline Node */}
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-12 absolute left-3 md:left-3 w-12 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-gray-400" />
                </div>
                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-gray-900">
                  {item.title}
                </h3>
              </div>

              {/* Content */}
              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className="md:hidden block text-3xl mb-6 text-left font-bold text-gray-900">
                  {item.title}
                </h3>

                {/* Prompt Box */}
                <div className="mb-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {item.prompt}
                  </p>
                </div>

                {/* Single Full Width Image Display */}
                {/* Image Display - Single on mobile, 2x2 grid on md+ */}
                {item.mediaSrc && item.mediaSrc.length > 0 && (
                  <div>
                    {/* Mobile: Single Image */}
                    <div className="flex md:hidden w-full rounded-xl overflow-hidden bg-gray-100 shadow-lg">
                      <img
                        ref={(el) => {
                          if (el) {
                            imageRefs.current[index * 4] = el;
                          }
                        }}
                        src={item.mediaSrc[0]}
                        alt={item.alt?.[0] || `${item.title} feature image`}
                        className="w-full h-64 object-contain transition-all duration-500 hover:scale-3d"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23f8fafc'/%3E%3Ctext x='400' y='200' font-family='Arial, sans-serif' font-size='16' fill='%236b7280' text-anchor='middle' dy='.3em'%3EImage not available%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>

                    {/* Desktop: 2x2 Grid */}
                    <div className="hidden md:grid grid-cols-2 gap-4">
                      {item.mediaSrc.slice(0, 4).map((src, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="rounded-xl overflow-hidden bg-gray-100 shadow-lg"
                        >
                          <img
                            ref={(el) => {
                              if (el) {
                                imageRefs.current[index * 4 + imgIndex] = el;
                              }
                            }}
                            data-src={src}
                            alt={
                              item.alt?.[imgIndex] ||
                              `${item.title} feature image ${imgIndex + 1}`
                            }
                            className="w-full h-64 object-center opacity-0 transition-all duration-500 hover:scale-110"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23f8fafc'/%3E%3Ctext x='400' y='200' font-family='Arial, sans-serif' font-size='16' fill='%236b7280' text-anchor='middle' dy='.3em'%3EImage not available%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Animated Timeline Beam - Fixed calculation */}
          {height > 0 && (
            <div
              style={{ height: `${height}px` }}
              className="absolute md:left-9 left-9 top-0 overflow-hidden w-[3px] bg-gradient-to-b from-transparent via-gray-200 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
            >
              <div
                style={{
                  height: `${scrollProgress * 100}%`,
                }}
                className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-t from-blue-500 via-blue-400 to-blue-300 rounded-full shadow-lg transition-all duration-100"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
