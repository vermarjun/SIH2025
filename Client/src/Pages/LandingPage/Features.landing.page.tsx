import { Timeline, type TimelineEntry } from "@/Components/ui/timeline";
import LazyWrapper from "./LazyWrapper.landing.page";
import { Suspense } from "react";

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

const sampleData: TimelineEntry[] = [
  {
    title: "Soil Health Monitoring",
    prompt: "Sensor Node with NPK, pH, Temprature and Humidity sensor monitor soil health for supporting crop growth. AI suggestions for optimized and reduced use of fertilizers",
    mediaSrc: ["https://res.cloudinary.com/dkzeey5iq/image/upload/v1758643986/Soil-NPK-Sensor-with-arduino-and-oled-display-display-nitrogen-phosphorus-and-potassium-on-oled-display-copy_aydwxk.jpg", "https://res.cloudinary.com/dloh4tkp5/image/upload/v1759615749/WhatsApp_Image_2025-09-24_at_08.32.44_bj4pnk.jpg", "https://res.cloudinary.com/dloh4tkp5/image/upload/v1759615748/WhatsApp_Image_2025-09-24_at_08.31.42_trxk5k.jpg", "https://res.cloudinary.com/dloh4tkp5/image/upload/v1759615748/WhatsApp_Image_2025-09-24_at_08.34.07_uq92mz.jpg"],
    alt: ["Drone monitoring crops from above","asd"]
  },
  {
    title: "Smart Irrigation",
    prompt: "Nodes with Soil moisture and water level sensors paired with crop intelligence database constantly monitor water requirements of soil for optimized use of water resource",
    mediaSrc: ["https://res.cloudinary.com/dloh4tkp5/image/upload/v1759616939/WhatsApp_Image_2025-09-28_at_00.07.26_jks0th.jpg","https://res.cloudinary.com/dloh4tkp5/image/upload/v1759615748/WhatsApp_Image_2025-09-24_at_08.34.07_uq92mz.jpg","https://res.cloudinary.com/dloh4tkp5/image/upload/v1759659278/WhatsApp_Image_2025-09-24_at_08.28.11_dyovsi.jpg", "https://res.cloudinary.com/dloh4tkp5/image/upload/v1759616765/WhatsApp_Image_2025-09-27_at_23.54.40_ao7w4d.jpg"],
    alt: ["Smart irrigation system in action","asd"]
  },
  {
    title: "No Internet Connectivity required",
    prompt: "Uses advanced low frequency technology to send data directly from farm to farmer's home without internet, supporting offline usage upto 10km.",
    mediaSrc: ["https://res.cloudinary.com/dkzeey5iq/image/upload/v1758644208/1_GV3v-fXxrJbRbPpNZ_rF7A_ijrwsz.png","https://res.cloudinary.com/dloh4tkp5/image/upload/v1759616230/20250928_185743_fqqg9o.jpg", "https://res.cloudinary.com/dloh4tkp5/image/upload/v1759615748/WhatsApp_Image_2025-09-24_at_08.29.44_zoe7it.jpg", "https://res.cloudinary.com/dloh4tkp5/image/upload/v1759616229/20250928_185715_rokos1.jpg"],
    alt: ["Abundant crop harvest showing yield prediction results","asd"]
  },
  {
    title: "Extremely low power consumptions",
    prompt: "Uses advanced sleep algorithm that reduces wake time and optimizes battery consumption of sensor nodes allowing longer battery life",
    mediaSrc: ["https://res.cloudinary.com/dkzeey5iq/image/upload/v1758642702/IMG-20250201-WA0047_wlaizu.jpg","https://res.cloudinary.com/dloh4tkp5/image/upload/v1759616231/20250928_185730_r8mlp1.jpg","https://res.cloudinary.com/dloh4tkp5/image/upload/v1759659646/ESP32-Power-Consumption-Modes_vyloel.jpg", "https://res.cloudinary.com/dloh4tkp5/image/upload/v1759616229/20250928_185715_rokos1.jpg"],
    alt: ["Abundant crop harvest showing yield prediction results","asd"]
  },
  {
    title: "Robust Software with scalable systems",
    prompt: "Home built IoT pipeline allows horizontal scaling without relying on 3rd party software. With easy to use web and app dashboards.",
    mediaSrc: ["https://res.cloudinary.com/dloh4tkp5/image/upload/v1759616228/20250928_185709_owg4mr.jpg","https://res.cloudinary.com/dkzeey5iq/image/upload/v1758642682/IMG-20250201-WA0018_ynr7pd.jpg","https://res.cloudinary.com/dloh4tkp5/image/upload/v1759616677/WhatsApp_Image_2025-09-27_at_23.25.20_cettol.jpg", "https://res.cloudinary.com/dloh4tkp5/image/upload/v1759616229/20250928_185715_rokos1.jpg"],
    alt: ["Abundant crop harvest showing yield prediction results","asd"]
  }
];

export default function TimelineDemo() {
  return (
    <div id="features" className="min-h-screen">
      <LazyWrapper fallback={<LoadingFallback />}>
        <Suspense fallback={<LoadingFallback />}>
          <Timeline data={sampleData} />
        </Suspense>
      </LazyWrapper>
    </div>
)};