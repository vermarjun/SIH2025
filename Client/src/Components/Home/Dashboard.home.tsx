import React from "react";
import {
  HelpCircle,
  Sun, Cloud, CloudRain, AlertTriangle, Info, CheckCircle, Zap, Droplets, Thermometer
} from "lucide-react";
import { useState } from "react";

// Mock types since we don't have access to the original types
interface User {
  username: string;
}

interface Props {
  user: User;
  onNavigate: (itemKey: string) => void;
}

interface WeatherDay {
  day: string;
  icon: 'sunny' | 'cloudy' | 'rain';
  temp: string;
  condition: string;
}

interface WeatherAlert {
  type: 'warning' | 'info';
  title: string;
  description: string;
}

interface SensorProps {
  name: string;
  status: 'Active' | 'Inactive' | 'Calibrating' | 'Error';
}

const SensorStatus: React.FC<SensorProps> = ({ name, status }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Active':
        return {
          dotColor: 'bg-green-500',
          textColor: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-100'
        };
      case 'Calibrating':
        return {
          dotColor: 'bg-blue-500',
          textColor: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-100'
        };
      case 'Error':
        return {
          dotColor: 'bg-red-500',
          textColor: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-100'
        };
      default:
        return {
          dotColor: 'bg-red-400',
          textColor: 'text-red-400',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-100'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className={`flex items-center justify-between ${config.bgColor} ${config.borderColor} border rounded-xl px-3 py-2 transition-all hover:shadow-sm`}>
      <div className="flex items-center space-x-2">
        <div className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`}></div>
        <span className="text-xs font-medium text-black truncate">{name}</span>
      </div>
      <span className={`text-xs font-semibold ${config.textColor} px-1.5 py-0.5 rounded-full ${config.bgColor}`}>
        {status}
      </span>
    </div>
  );
};

const SensorStatusHeader = ({ testing }: { testing: boolean }) => {
  
  const sensors = [
    { name: 'Sensor Node 1', status: (!testing)?'Inactive':'Active' as const },
    { name: 'Sensor Node 2', status: (!testing)?'Inactive':'Active' as const },
    { name: 'Sensor Node 3', status: (!testing)?'Inactive':'Active' as const },
    { name: 'Sensor Node 4', status: (!testing)?'Inactive':'Active' as const },
    { name: 'Hub', status: (!testing)?'Inactive':'Active' as const },
    { name: 'Home Router', status: testing?'Calibrating':'Inactive' as const },
    { name: 'NPK Sensor', status: testing?'Calibrating':'Inactive' as const },
    { name: 'pH Sensor', status: testing?'Calibrating':'Inactive' as const },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg sm:text-xl font-semibold text-black mb-4 sm:mb-6">Sensor Network Status</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {sensors.map((sensor, index) => (
          <SensorStatus 
            key={index}
            name={sensor.name}
            // @ts-ignore
            status={sensor.status}
          />
        ))}
      </div>
    </div>
  );
};

const WeatherDashboard: React.FC = () => {
  const forecast: WeatherDay[] = [
    { day: 'Mon', icon: 'sunny', temp: '24°C', condition: 'Sunny' },
    { day: 'Tue', icon: 'cloudy', temp: '22°C', condition: 'Cloudy' },
    { day: 'Wed', icon: 'rain', temp: '20°C', condition: 'Rain' },
    { day: 'Thu', icon: 'sunny', temp: '23°C', condition: 'Sunny' },
    { day: 'Fri', icon: 'cloudy', temp: '21°C', condition: 'Cloudy' },
    { day: 'Sat', icon: 'sunny', temp: '25°C', condition: 'Sunny' },
    { day: 'Sun', icon: 'sunny', temp: '26°C', condition: 'Sunny' },
  ];

  const alerts: WeatherAlert[] = [
    {
      type: 'warning',
      title: 'Heat Stress Advisory',
      description: 'High temperatures expected on Saturday. Consider additional irrigation for optimal crop health.',
    },
    {
      type: 'info',
      title: 'Rainfall Forecast',
      description: 'Light rain predicted for Wednesday. Adjust field operations and irrigation schedule accordingly.',
    },
  ];

  const getWeatherIcon = (iconType: string, size: string = 'w-6 h-6 sm:w-8 sm:h-8') => {
    switch (iconType) {
      case 'sunny':
        return <Sun className={`${size} text-yellow-500`} />;
      case 'cloudy':
        return <Cloud className={`${size} text-gray-500`} />;
      case 'rain':
        return <CloudRain className={`${size} text-blue-500`} />;
      default:
        return <Sun className={`${size} text-yellow-500`} />;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Current Weather & Impact Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
        {/* Current Weather */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold text-black mb-4 sm:mb-6">Current Weather Conditions</h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-50 p-3 sm:p-4 rounded-2xl">
                <Sun className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500" />
              </div>
              <div>
                <div className="text-3xl sm:text-5xl font-bold text-black mb-1">24°C</div>
                <div className="text-gray-600 text-sm sm:text-lg">Sunny & Clear</div>
              </div>
            </div>
            <div className="text-center sm:text-right space-y-1 sm:space-y-2">
              <div className="flex items-center gap-2 text-gray-600 justify-center sm:justify-end">
                <Droplets className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">Humidity: 65%</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 justify-center sm:justify-end">
                <span className="text-xs sm:text-sm">Wind: 12 km/h NW</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 justify-center sm:justify-end">
                <span className="text-xs sm:text-sm">Pressure: 1015 hPa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Agricultural Impact */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold text-black mb-4 sm:mb-6">Crop Impact Assessment</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 rounded-xl">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-700">Optimal growing conditions</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-50 rounded-xl">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-700">Low disease risk</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-yellow-50 rounded-xl">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-700">Monitor irrigation needs</span>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg sm:text-xl font-semibold text-black mb-4 sm:mb-6">7-Day Weather Forecast</h2>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-4">
          {forecast.map((day, index) => (
            <div
              key={index}
              className="text-center p-2 sm:p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100"
            >
              <div className="text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-3">{day.day}</div>
              <div className="flex justify-center mb-2 sm:mb-3">
                {getWeatherIcon(day.icon, 'w-5 h-5 sm:w-6 sm:h-6')}
              </div>
              <div className="text-sm sm:text-lg font-bold text-black mb-1">{day.temp}</div>
              <div className="text-xs text-gray-500 truncate">{day.condition}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Alerts */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg sm:text-xl font-semibold text-black mb-4 sm:mb-6">Weather Advisories</h2>
        <div className="space-y-3 sm:space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`rounded-xl p-3 sm:p-4 border-2 ${
                alert.type === 'warning'
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-1.5 sm:p-2 rounded-full ${
                  alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  {alert.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                  ) : (
                    <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className={`font-semibold mb-1 text-sm sm:text-base ${
                    alert.type === 'warning' ? 'text-yellow-800' : 'text-blue-800'
                  }`}>
                    {alert.title}
                  </div>
                  <div className={`text-xs sm:text-sm ${
                    alert.type === 'warning' ? 'text-yellow-700' : 'text-blue-700'
                  }`}>
                    {alert.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  status: 'good' | 'warning' | 'info';
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, status, icon }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'good':
        return {
          textColor: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconBg: 'bg-green-100'
        };
      case 'warning':
        return {
          textColor: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          iconBg: 'bg-yellow-100'
        };
      case 'info':
        return {
          textColor: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconBg: 'bg-blue-100'
        };
      default:
        return {
          textColor: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          iconBg: 'bg-gray-100'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide truncate">{title}</h3>
        <div className={`${config.iconBg} p-1.5 sm:p-2 rounded-xl`}>
          <div className={`${config.textColor} w-4 h-4 md:w-5 md:h-5`}>
            {React.cloneElement(icon as React.ReactElement )}
          </div>
        </div>
      </div>
      <div className="space-y-1 sm:space-y-2">
        <p className="text-xl sm:text-3xl font-bold text-black">{value}</p>
        {change && (
          <p className="text-xs sm:text-sm text-gray-500 truncate">{change}</p>
        )}
      </div>
    </div>
  );
};

const DashboardHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
      <MetricCard
        title="Soil Moisture"
        value="67%"
        change="+2.5% from last reading"
        status="info"
        icon={<Droplets />}
      />
      
      <MetricCard
        title="Temperature"
        value="24°C"
        change="Optimal range"
        status="good"
        icon={<Thermometer />}
      />
      
      <MetricCard
        title="pH Level"
        value="6.8"
        change="Within normal range"
        status="info"
        icon={<HelpCircle />}
      />
      
      <MetricCard
        title="NPK Status"
        value="Good"
        change="All nutrients balanced"
        status="good"
        icon={<CheckCircle />}
      />
    </div>
  );
};

// @ts-ignore
const Dashboard = ({ user, onNavigate = () => {} }: Partial<Props>) => {
  const [testing, ] = useState(true);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col justify-center items-center bg-transparent">
        <div className="w-full max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
          <h1 className="text-xl sm:text-3xl font-bold text-black text-center">
            Welcome back, <span className="text-green-600">{user?.username}</span>
          </h1>
          <p className={`${testing?"text-gray-600":"text-red-500"} mt-1 sm:mt-2 text-center text-sm sm:text-base`}>
            {
              testing?
              "Sensors are connected, displaying live fetched data from Reciever.":
              "Sensors are not connected, displaying old Data"
            }
            
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 space-y-4 sm:space-y-8 pb-6 sm:pb-8">
        <DashboardHeader/>
        <SensorStatusHeader testing={testing}/>
        <WeatherDashboard />
      </div>
    </div>
  );
};

export default Dashboard;