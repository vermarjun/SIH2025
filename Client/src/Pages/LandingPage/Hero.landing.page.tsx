import React from "react";
import { ShimmerButton } from "@/Components/magicui/shimmer-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { StarHalf, Star } from "lucide-react";
import { LineShadowText } from "@/Components/ui/line-shadow-text";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import ProductOfTheDay from "/ProductOfTheDay.png";
import { useNavigate } from "react-router-dom";
import { motion, MotionValue } from "framer-motion";

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const VideoCard = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="md:w-full w-screen bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="h-full md:w-full w-screen overflow-hidden rounded-2xl dark:bg-zinc-900 md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
};

// Container Scroll Components
export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="flex items-center justify-center relative"
      ref={containerRef}
    >
      <div
        className="md:w-full w-screen relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <VideoCard rotate={rotate} translate={translate} scale={scale}>
          {children}
        </VideoCard>
      </div>
    </div>
  );
};

const VideoElement: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isVisible) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isVisible]);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      loop
      preload="none"
      poster="https://dummyimage.com/400x300/1a1a1a/ffffff&text=Loading..."
      className="w-full h-full object-cover rounded-2xl aspect-video"
    >
      <source
        src="https://res.cloudinary.com/dloh4tkp5/video/upload/v1759602464/videoplayback_wyclji.webm"
        type="video/webm"
      />
      <source
        src="https://res.cloudinary.com/dloh4tkp5/video/upload/v1759602464/videoplayback_wyclji.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
};

interface UserRatingCardProps {
  className?: string;
}

const UserRatingCard: React.FC<UserRatingCardProps> = ({ className = "" }) => {
  const avatars = [
    {
      src: "https://res.cloudinary.com/dkzeey5iq/image/upload/f_auto,q_auto/v1758644633/WhatsApp_Image_2025-09-23_at_21.04.38_m3ihhc.webp",
      alt: "@nextjs",
      fallback: "N",
    },
    {
      src: "https://res.cloudinary.com/dkzeey5iq/image/upload/f_auto,q_auto/v1758644634/WhatsApp_Image_2025-09-23_at_21.53.11_l76uxt.webp",
      alt: "@nextjs",
      fallback: "N",
    },
    {
      src: "https://res.cloudinary.com/dkzeey5iq/image/upload/f_auto,q_auto/v1758644633/WhatsApp_Image_2025-09-23_at_21.34.36_ltaqz1.webp",
      alt: "@vercel",
      fallback: "V",
    },
    {
      src: "https://res.cloudinary.com/dkzeey5iq/image/upload/f_auto,q_auto/v1758644633/WhatsApp_Image_2025-09-23_at_21.19.27_pn4taz.webp",
      alt: "@evilrabbit",
      fallback: "ER",
    },
    {
      src: "https://res.cloudinary.com/dkzeey5iq/image/upload/f_auto,q_auto/v1758644633/WhatsApp_Image_2025-09-23_at_21.52.37_bmf62k.webp",
      alt: "@leerob",
      fallback: "LR",
    },
    {
      src: "https://res.cloudinary.com/dkzeey5iq/image/upload/f_auto,q_auto/v1758644633/WhatsApp_Image_2025-09-23_at_21.40.52_sfvxvo.webp",
      alt: "@shadcn",
      fallback: "CN",
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
      className={`md:flex md:bg-white/10 md:backdrop-blur-xl md:p-2 md:rounded-full items-center gap-2 rounded-lg mb-6 ${className}`}
    >
      {/* Overlapping Avatars */}
      <div className="flex -space-x-4">
        {avatars.map((avatar, index) => (
          <Avatar key={index} className="w-12 h-12 border-2 border-neutral-300">
            <AvatarImage
              className="object-cover"
              loading="lazy"
              src={avatar.src}
              alt={avatar.alt}
            />
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
    <section
      id="home"
      className="relative w-full h-full z-10 md:px-4 rounded-b-2xl"
    >
      <div className="absolute inset-0 z-0 md:h-9/12 h-screen">
        <img
          src="https://res.cloudinary.com/dkzeey5iq/image/upload/f_auto,q_auto/v1758490233/img_0008jpg_me9jp0.webp"
          alt="Farm Landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-black/20"></div>
      </div>
      <div className="pt-20 px-12">
        {/* Container Scroll Section */}
        <ContainerScroll
          titleComponent={
            <>
              <div className="rrelative text-center justify-center items-center">
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
                  We bring smart irrigation, crop health monitoring, and real
                  time insights together in one system
                </p>
                <div
                  onClick={() => navigate("/home")}
                  className="w-full flex flex-col justify-center items-center -mb-1 -z-20"
                >
                  <ShimmerButton className="rounded-full md:px-14 px-7 py-4 text-base font-mediumm mb-10 bg-green-600">
                    Get Started Now!
                  </ShimmerButton>
                  <UserRatingCard />
                </div>
              </div>
            </>
          }
        >
          {/* This is where you'll add your video */}
          <div className="flex items-center justify-center h-full w-full">
            <div className="w-full h-full flex items-center justify-center rounded-2xl">
              <VideoElement />
            </div>
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
};

export default HeroSection;
