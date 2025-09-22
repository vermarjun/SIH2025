import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface ChartData {
  month: string;
  value: number;
}

const Dashboard: React.FC = () => {
  // Sample data for soil moisture
  const soilMoistureData: ChartData[] = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 59 },
    { month: 'Mar', value: 78 },
    { month: 'Apr', value: 82 },
    { month: 'May', value: 57 },
    { month: 'Jun', value: 67 }
  ];

  // Sample data for temperature
  const temperatureData: ChartData[] = [
    { month: 'Jan', value: 22 },
    { month: 'Feb', value: 23 },
    { month: 'Mar', value: 26.5 },
    { month: 'Apr', value: 20.5 },
    { month: 'May', value: 24 }
  ];

  const ChartCard: React.FC<{
    title: string;
    data: ChartData[];
    lineColor: string;
    unit: string;
  }> = ({ title, data, lineColor, unit }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${lineColor === '#22c55e' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
          <span className="text-sm text-gray-600">{unit}</span>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={lineColor}
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 0, fill: lineColor }}
              activeDot={{ r: 6, strokeWidth: 0, fill: lineColor }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
      <div className="bg-transparent flex flex-col justify-center items-center">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-3xl font-bold text-black text-center">
                Soil Health <span className="text-green-600">Monitor</span>
              </h1>
              <p className="text-gray-600 mt-1">Real-time analysis of soil nutrient levels and agricultural conditions</p>
            </div>
          </div>
        </div>
      </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Current Moisture</p>
                <p className="text-2xl font-semibold text-gray-900">67%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Temperature</p>
                <p className="text-2xl font-semibold text-gray-900">24°C</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Avg Moisture</p>
                <p className="text-2xl font-semibold text-gray-900">68%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Avg Temp</p>
                <p className="text-2xl font-semibold text-gray-900">23.2°C</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <ChartCard
            title="Soil Moisture Trends"
            data={soilMoistureData}
            lineColor="#22c55e"
            unit="Soil Moisture %"
          />
          
          <ChartCard
            title="Temperature Analysis"
            data={temperatureData}
            lineColor="#3b82f6"
            unit="Temperature °C"
          />
        </div>

        {/* Additional Metrics */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">System Status</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Sensors</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Data Sync</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Update</span>
                <span className="text-gray-900 text-sm">2 min ago</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Alerts</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">Temperature rising</p>
                  <p className="text-xs text-gray-500">5 min ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">Moisture levels optimal</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
                Export Data
              </button>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                Generate Report
              </button>
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;