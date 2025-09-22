import React from "react";
import { ShimmerButton } from "@/Components/magicui/shimmer-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { StarHalf, Star } from "lucide-react";
import { LineShadowText } from "@/Components/ui/line-shadow-text";
import { Card, CardContent } from "@/Components/ui/card";
import { useEffect, useRef, useState } from "react";
import ProductOfTheDay from "/ProductOfTheDay.png";
import { useNavigate } from "react-router-dom";
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
        className="absolute left-1/2 -translate-x-1/2 shadow-2xl overflow-hidden rounded-xl sm:rounded-2xl w-[100px] sm:w-[280px] md:w-[350px] lg:w-[400px] h-[160px] sm:h-[340px] md:h-[390px] lg:h-[420px] origin-center"
        style={cardStyle(leftCardTransform)}
      >
        <CardContent className="p-0 w-full h-full">
          <img
            src={
              images[0] ||
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=420&fit=crop"
            }
            alt="left"
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </CardContent>
      </Card>

      {/* Center Card */}
      <Card
        className="absolute left-1/2 -translate-x-1/2 shadow-3xl overflow-hidden rounded-xl sm:rounded-2xl w-[100px] sm:w-[280px] md:w-[350px] lg:w-[400px] h-[180px] sm:h-[360px] md:h-[420px] lg:h-[450px] origin-center"
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
        className="absolute left-1/2 -translate-x-1/2 shadow-2xl overflow-hidden rounded-xl sm:rounded-2xl w-[100px] sm:w-[280px] md:w-[350px] lg:w-[400px] h-[160px] sm:h-[340px] md:h-[390px] lg:h-[420px] origin-center"
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

interface UserRatingCardProps {
  className?: string;
}

const UserRatingCard: React.FC<UserRatingCardProps> = ({ className = "" }) => {
  const avatars = [
    {
      src: "https://github.com/shadcn.png",
      alt: "@shadcn",
      fallback: "CN",
    },
    {
      src: "https://github.com/leerob.png",
      alt: "@leerob",
      fallback: "LR",
    },
    {
      src: "https://github.com/evilrabbit.png",
      alt: "@evilrabbit",
      fallback: "ER",
    },
    {
      src: "https://github.com/vercel.png",
      alt: "@vercel",
      fallback: "V",
    },
    {
      src: "https://github.com/nextjs.png",
      alt: "@nextjs",
      fallback: "N",
    },
  ];

  // Generate stars for 4.8 rating
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < 4) {
        // Full stars
        stars.push(
          <Star key={i} className="w-7 h-7 fill-yellow-400 text-yellow-400" />
        );
      } else {
        // 0.8 partial star (appears as full for simplicity)
        stars.push(
          <StarHalf
            key={i}
            className="w-7 h-7 fill-yellow-400 text-yellow-400"
          />
        );
      }
    }
    return stars;
  };

  return (
    <div
      className={`md:flex md:bg-white/10 md:backdrop-blur-xl md:p-2 md:rounded-full items-center gap-2 rounded-lg ${className}`}
    >
      {/* Overlapping Avatars */}
      <div className="flex -space-x-4">
        {avatars.map((avatar, index) => (
          <Avatar key={index} className="w-12 h-12 border-2 border-neutral-300">
            <AvatarImage loading="lazy" src={avatar.src} alt={avatar.alt} />
            <AvatarFallback className="bg-neutral-300 text-gray-200">
              {avatar.fallback}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>

      {/* Rating and Text */}
      <div className="flex flex-col md:items-start justify-center items-center gap-2">
        {/* Stars */}
        <div className="flex ">{renderStars()}</div>

        {/* User count text */}
        <p className="text-gray-300 text-xs font-medium text-left">
          10+ Active users
        </p>
      </div>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full bg-white">
      {/* Top Section with Full Screen Height */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-16">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dkzeey5iq/image/upload/v1758490233/img_0008jpg_me9jp0.webp"
            alt="Farm Landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-black/20"></div>
        </div>
        {/* Content with Higher Z-index */}
        <div className="relative z-10 max-w-4xl text-center justify-center items-center">
          <div className="flex justify-center items-center">
            <img
              loading="lazy"
              src={ProductOfTheDay}
              alt=""
              className="max-h-26"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-800 leading-tight">
            Building The{" "}
            <LineShadowText
              className="italic text-green-800"
              shadowColor={"black"}
            >
              FUTURE
            </LineShadowText>
            <br /> of Precision Farming.
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
            Smart farming for a smarter future. Lorem ipsum something should
            come here, our tag line brand line will add later
          </p>
          <div onClick={() => navigate("/home")} className="w-full flex flex-col justify-center items-center -mb-1 -z-20">
            <ShimmerButton className="rounded-full md:px-14 px-7 py-4 text-base font-mediumm mb-10 bg-green-600">
              Get Started Now!
            </ShimmerButton>
            <UserRatingCard />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-black text-white py-16 px-6 text-center">
        <h2 className="text-2xl md:text-6xl font-semibold max-w-full mx-auto mb-6">
          We drive transformation through innovative technology and operational
          excellence,
        </h2>
        <p className="text-lg md:text-4xl text-gray-300 max-w-5xl mx-auto mb-10">
          ensuring profitable and sustainable solutions for farmers!
        </p>

        <div className="flex justify-center items-centers bg-black">
          <ImageCard
            images={[
              "https://picsum.photos/id/237/400/500", // left
              "https://picsum.photos/id/238/400/500", // center
              "https://picsum.photos/id/239/400/500", // right
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
