import { useState } from "react";
import Sidebar from "./Sidebar.home";
import Dashboard from "./Dashboard.home";
import { useNavigate } from "react-router-dom";
import SettingsPage from "./Settings.home";
import SoilQualityDashboard from "./SoilQuality.home";
import IrrigationDashboard from "./Irrigation.home";
import ThreeDotLoader from "../LoadingScreens/ThreeDotLoader";
import AgroAI from "./AgroAI.home";
import Notification from "./Notification.home";
import SoilMoistureTemperature from "./SoilMoisture.home";

const Main = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [isLoading,] = useState(false);

  // Mock user data
  const user = JSON.parse(localStorage.getItem("user") || "");
  if (user.profilePhoto == "") {
    user.profilePhoto =
      "https://www.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png";
  }

  // Navigation handler
  // @ts-ignore
  const handleNavigation = (itemKey) => {
    setActiveItem(itemKey);
  };

  const navigate = useNavigate();

  // Content renderer based on active item
  const renderContent = () => {
    switch (activeItem) {
      case "home":
        return (
          <Dashboard
            user={user}
            onNavigate={handleNavigation}
          />
        );
      case "soilquality":
        return <SoilQualityDashboard user={user} onNavigate={handleNavigation} />;
      case "soilmoisture":
        return <SoilMoistureTemperature />;
      case "irrigation":
        return <IrrigationDashboard />;
      case "agroai":
        return <AgroAI />;
      case "notification":
        return <Notification />;
      case "settings":
        return <SettingsPage />;
      default:
        return (
          <Dashboard
            user={user}
            onNavigate={handleNavigation}
          />
        );
    }
  };

  return (
    <div className="flex h-screen">
      {isLoading ? (
        <ThreeDotLoader />
      ) : (
        <>
          {/* Sidebar */}
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            user={user}
            activeItem={activeItem}
            onNavigate={handleNavigation}
            navigate={navigate}
          />

          {/* Main Content */}
          <div className="flex-1 overflow-auto">{renderContent()}</div>
        </>
      )}
    </div>
  );
};

export default Main;
