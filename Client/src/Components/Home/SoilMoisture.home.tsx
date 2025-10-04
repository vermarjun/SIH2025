import { Droplet, Droplets, GlassWater, Sun } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface ChartData {
  month: string;
  value: number;
}

interface LiveData {
  soilMoisture: number;
  waterLevel: number;
  humidity: number;
  temperature: number;
}

const Dashboard: React.FC = () => {
  const [liveData, setLiveData] = useState<LiveData>({
    soilMoisture: 2,
    waterLevel: 5,
    humidity: 62,
    temperature: 24
  });

  const [demoState, setDemoState] = useState<'connecting' | 'water-demo' | 'soil-demo' | 'complete'>('connecting');
  const [showConnecting, setShowConnecting] = useState(true);

  const [chartModes, setChartModes] = useState({
    soilMoisture: 'live' as 'live' | 'monthly',
    waterLevel: 'live' as 'live' | 'monthly',
    humidity: 'live' as 'live' | 'monthly',
    temperature: 'live' as 'live' | 'monthly'
  });

  // Sample data for charts
  const soilMoistureData: ChartData[] = [
    { month: 'Jan', value: 0 },
    { month: 'Feb', value: 0 },
    { month: 'Mar', value: 0 },
    { month: 'Apr', value: 0 },
    { month: 'May', value: 0 },
    { month: 'Jun', value: 0 },
    { month: 'Jul', value: 0 },
    { month: 'Aug', value: 0 },
    { month: 'Sept', value: 10 },
    { month: 'Oct', value: 0 },
    { month: 'Nov', value: 0 },
    { month: 'Dec', value: 0 },
  ];

  const waterLevelData: ChartData[] = [
    { month: 'Jan', value: 0 },
    { month: 'Feb', value: 0 },
    { month: 'Mar', value: 0 },
    { month: 'Apr', value: 0 },
    { month: 'May', value: 0 },
    { month: 'Jun', value: 0 },
    { month: 'Jul', value: 0 },
    { month: 'Aug', value: 0 },
    { month: 'Sept', value: 100 },
    { month: 'Oct', value: 0 },
    { month: 'Nov', value: 0 },
    { month: 'Dec', value: 0 },
  ];

  useEffect(() => {
    // Demo sequence
    const sequence = async () => {
      // Phase 1: Start at 0, Show connecting for 2 seconds
      setTimeout(() => {
        setShowConnecting(false);
        setDemoState('water-demo');
      }, 2000);

      // wait for 1 seconds and do nothing in these 1 seconds (at 3 seconds total)
      setTimeout(() => {
        console.log("waiting after connecting");
      }, 3000);

      // Phase 2: Water level demo (starts at 3 seconds, runs for 10 seconds)
      setTimeout(() => {
        let progress = 0;
        const waterInterval = setInterval(() => {
          progress += 1;
          const newWaterLevel = 5 + (95 * progress / 10); // From 5% to 100% over 10 steps (10 seconds)
          
          setLiveData(prev => ({
            ...prev,
            waterLevel: Math.min(100, newWaterLevel)
          }));

          if (progress >= 10) {
            clearInterval(waterInterval);
          }
        }, 1000); // Update every 1000ms for 10 seconds total
      }, 3000);

      // start at 13 seconds and wait for 3 seconds and do nothing in these 3 seconds
      setTimeout(() => {
        console.log("waiting before soil demo");
        setDemoState('soil-demo');
      }, 13000);

      // Phase 3: Soil moisture demo (starts at 16 seconds, runs for 10 seconds)
      setTimeout(() => {
        let progress = 0;
        const soilInterval = setInterval(() => {
          progress += 1;
          const newSoilMoisture = 2 + (93 * progress / 10); // From 2% to 95% over 10 steps (10 seconds)
          
          setLiveData(prev => ({
            ...prev,
            soilMoisture: Math.min(95, newSoilMoisture)
          }));

          if (progress >= 10) {
            clearInterval(soilInterval);
            setDemoState('complete');
          }
        }, 1000); // Update every 1000ms for 10 seconds total
      }, 16000);
    };

    sequence();
  }, []);


  const toggleChartMode = (chartType: keyof typeof chartModes) => {
    setChartModes(prev => ({
      ...prev,
      [chartType]: prev[chartType] === 'live' ? 'monthly' : 'live'
    }));
  };

  // Gauge Component
  const GaugeChart: React.FC<{ value: number; title: string; unit: string; color: string }> = ({ 
    value, title, unit, color 
  }) => {
    const radius = 80;
    const strokeWidth = 12;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;
    
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative">
          <svg width="180" height="180" className="transform -rotate-90">
            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-200 ease-in-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">{Math.round(value)}</span>
            <span className="text-sm text-gray-600">{unit}</span>
          </div>
        </div>
      </div>
    );
  };

  // Big Number Component
  const BigNumber: React.FC<{ value: number; unit: string; title: string }> = ({ 
    value, unit, title 
  }) => (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-6xl font-bold text-gray-900 mb-2">
        {typeof value === 'number' ? Math.round(value * 10) / 10 : value}
      </div>
      <div className="text-xl text-gray-600">{unit}</div>
    </div>
  );

  // Enhanced Chart Card Component
  const ChartCard: React.FC<{
    title: string;
    chartType: keyof typeof chartModes;
    data: ChartData[];
    lineColor: string;
    unit: string;
    liveValue: number;
  }> = ({ title, chartType, data, lineColor, unit, liveValue }) => {
    const isLive = chartModes[chartType] === 'live';
    
    const renderLiveContent = () => {
      if (chartType === 'soilMoisture' || chartType === 'waterLevel') {
        return (
          <GaugeChart 
            value={liveValue} 
            title={title} 
            unit={unit}
            color={lineColor}
          />
        );
      } else {
        return (
          <BigNumber 
            value={liveValue} 
            unit={unit}
            title={title}
          />
        );
      }
    };

    return (
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => toggleChartMode(chartType)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                isLive 
                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              {isLive ? 'Live Data' : 'Monthly Data'}
            </button>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                lineColor === '#22c55e' ? 'bg-green-500' : 
                lineColor === '#3b82f6' ? 'bg-blue-500' :
                lineColor === '#f59e0b' ? 'bg-amber-500' : 'bg-purple-500'
              }`}></div>
              <span className="text-xs sm:text-sm text-gray-600">{unit}</span>
            </div>
          </div>
        </div>
        
        <div className="h-48 md:h-64">
          {isLive ? (
            renderLiveContent()
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#64748b' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#64748b' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={lineColor}
                  strokeWidth={2}
                  dot={{ r: 3, strokeWidth: 0, fill: lineColor }}
                  activeDot={{ r: 5, strokeWidth: 0, fill: lineColor }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-2 md:px-6">
      {/* Connecting Overlay */}
      {showConnecting && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-xs bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connecting Sensors</h3>
              <p className="text-gray-600 mb-4">Fetching latest data...</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-transparent flex flex-col justify-center items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-black text-center">
                  Soil Health <span className="text-green-600">Monitor</span>
                </h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base text-center">Real-time analysis of soil nutrient levels and agricultural conditions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Updated with live data */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-4">
          <div className="bg-white rounded-xl p-3 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
                <Droplet/>
              </div>
              <div className="ml-2 sm:ml-4">
                <p className="text-xs sm:text-sm text-gray-600">Current Moisture</p>
                <p className="text-lg sm:text-2xl font-semibold text-gray-900">{Math.round(liveData.soilMoisture)}%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
                <Sun/>
              </div>
              <div className="ml-2 sm:ml-4">
                <p className="text-xs sm:text-sm text-gray-600">Temperature</p>
                <p className="text-lg sm:text-2xl font-semibold text-gray-900">{Math.round(liveData.temperature * 10) / 10}°C</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-amber-100 rounded-lg">
                <Droplets/>
              </div>
              <div className="ml-2 sm:ml-4">
                <p className="text-xs sm:text-sm text-gray-600">Humidity</p>
                <p className="text-lg sm:text-2xl font-semibold text-gray-900">{Math.round(liveData.humidity)}%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-purple-100 rounded-lg">
                <GlassWater/>
              </div>
              <div className="ml-2 sm:ml-4">
                <p className="text-xs sm:text-sm text-gray-600">Water Level</p>
                <p className="text-lg sm:text-2xl font-semibold text-gray-900">{Math.round(liveData.waterLevel)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts - Now with 4 charts in 2x2 grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4">
          <ChartCard
            title="Soil Moisture"
            chartType="soilMoisture"
            data={soilMoistureData}
            lineColor="#22c55e"
            unit="%"
            liveValue={liveData.soilMoisture}
          />
          
          <ChartCard
            title="Water Level"
            chartType="waterLevel"
            data={waterLevelData}
            lineColor="#3b82f6"
            unit="%"
            liveValue={liveData.waterLevel}
          />
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">System Status</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-600">Sensors</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-600">Data Sync</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-600">Last Update</span>
                <span className="text-gray-900 text-xs sm:text-sm">
                  {demoState === 'connecting' ? 'Connecting...' : 'Just now'}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Alerts</h4>
            <div className="space-y-2 sm:space-y-3">
              {demoState === 'water-demo' && (
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-1.5 sm:mt-2 animate-pulse"></div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-900">Water level increasing</p>
                    <p className="text-xs text-gray-500">Live</p>
                  </div>
                </div>
              )}
              {demoState === 'soil-demo' && (
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mt-1.5 sm:mt-2 animate-pulse"></div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-900">Soil moisture increasing</p>
                    <p className="text-xs text-gray-500">Live</p>
                  </div>
                </div>
              )}
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mt-1.5 sm:mt-2"></div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-900">Temperature stable</p>
                  <p className="text-xs text-gray-500">5 min ago</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h4>
            <div className="space-y-2 sm:space-y-3">
              <button className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs sm:text-sm font-medium">
                Export Data
              </button>
              <button className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs sm:text-sm font-medium">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;