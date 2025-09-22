import { Timeline, type TimelineEntry } from "@/Components/ui/timeline";


const sampleData: TimelineEntry[] = [
  {
    title: "Soil Health Monitoring",
    prompt: "Sensor Node with NPK, pH, Temprature and Humidity sensor monitor soil health for supporting crop growth. AI suggestions for optimized and reduced use of fertilizers",
    mediaSrc: ["https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop"],
    alt: ["Drone monitoring crops from above"]
  },
  {
    title: "Smart Irrigation",
    prompt: "Nodes with Soil moisture and water level sensors paired with crop intelligence database constantly monitor water requirements of soil for optimized use of water resource",
    mediaSrc: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop"],
    alt: ["Smart irrigation system in action"]
  },
  {
    title: "Automated irrigation",
    prompt: "Custom built Smart valve using solenoid controls the water flow to farm based on requirements of the soil (decided using the LIVE data recieved from sensor nodes) preventing over or under irrigation. Supporting both Auto & Manual modes.",
    mediaSrc: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop"],
    alt: ["Abundant crop harvest showing yield prediction results"]
  },
  {
    title: "No Internet Connectivity required",
    prompt: "Uses advanced low frequency technology to send data directly from farm to farmer's home without internet, supporting offline usage upto 10km.",
    mediaSrc: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop"],
    alt: ["Abundant crop harvest showing yield prediction results"]
  },
  {
    title: "Extremely low power consumptions",
    prompt: "Uses advanced sleep algorithm that reduces wake time and optimizes battery consumption of sensor nodes allowing longer battery life",
    mediaSrc: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop"],
    alt: ["Abundant crop harvest showing yield prediction results"]
  },
  {
    title: "Robust Software with scalable systems",
    prompt: "Home built IoT pipeline allows horizontal scaling without relying on 3rd party software. With easy to use web and app dashboards.",
    mediaSrc: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop"],
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