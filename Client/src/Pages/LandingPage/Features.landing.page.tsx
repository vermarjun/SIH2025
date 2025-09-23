import { Timeline, type TimelineEntry } from "@/Components/ui/timeline";


const sampleData: TimelineEntry[] = [
  {
    title: "Soil Health Monitoring",
    prompt: "Sensor Node with NPK, pH, Temprature and Humidity sensor monitor soil health for supporting crop growth. AI suggestions for optimized and reduced use of fertilizers",
    mediaSrc: ["https://res.cloudinary.com/dkzeey5iq/image/upload/v1758643986/Soil-NPK-Sensor-with-arduino-and-oled-display-display-nitrogen-phosphorus-and-potassium-on-oled-display-copy_aydwxk.jpg"],
    alt: ["Drone monitoring crops from above"]
  },
  {
    title: "Smart Irrigation",
    prompt: "Nodes with Soil moisture and water level sensors paired with crop intelligence database constantly monitor water requirements of soil for optimized use of water resource",
    mediaSrc: ["https://res.cloudinary.com/dkzeey5iq/image/upload/v1758484207/WhatsApp_Image_2025-09-22_at_00.30.40_kdvh2h.jpg"],
    alt: ["Smart irrigation system in action"]
  },
  {
    title: "Automated irrigation",
    prompt: "Custom built Smart valve using solenoid controls the water flow to farm based on requirements of the soil (decided using the LIVE data recieved from sensor nodes) preventing over or under irrigation. Supporting both Auto & Manual modes.",
    mediaSrc: ["https://res.cloudinary.com/dkzeey5iq/image/upload/v1758484202/WhatsApp_Image_2025-09-22_at_00.30.43_owefui.jpg"],
    alt: ["Abundant crop harvest showing yield prediction results"]
  },
  {
    title: "No Internet Connectivity required",
    prompt: "Uses advanced low frequency technology to send data directly from farm to farmer's home without internet, supporting offline usage upto 10km.",
    mediaSrc: ["https://res.cloudinary.com/dkzeey5iq/image/upload/v1758644208/1_GV3v-fXxrJbRbPpNZ_rF7A_ijrwsz.png"],
    alt: ["Abundant crop harvest showing yield prediction results"]
  },
  {
    title: "Extremely low power consumptions",
    prompt: "Uses advanced sleep algorithm that reduces wake time and optimizes battery consumption of sensor nodes allowing longer battery life",
    mediaSrc: ["https://res.cloudinary.com/dkzeey5iq/image/upload/v1758642702/IMG-20250201-WA0047_wlaizu.jpg"],
    alt: ["Abundant crop harvest showing yield prediction results"]
  },
  {
    title: "Robust Software with scalable systems",
    prompt: "Home built IoT pipeline allows horizontal scaling without relying on 3rd party software. With easy to use web and app dashboards.",
    mediaSrc: ["https://res.cloudinary.com/dkzeey5iq/image/upload/v1758642682/IMG-20250201-WA0018_ynr7pd.jpg"],
    alt: ["Abundant crop harvest showing yield prediction results"]
  }
];

// Demo component
export default function TimelineDemo() {
  return (
    <div className="min-h-screen">
      <Timeline data={sampleData} />
    </div>
)};