import type { User } from "@/State/Types"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface Props {
  user: User;
  onNavigate: (itemKey: string) => void;
}

interface SensorReading {
  timestamp: string;
  sensorType: string;
  reading: string;
  status: 'Optimal' | 'Monitor' | 'Good';
  change: string;
}

interface ChartData {
  time: string;
  value: number;
}

const NPKValues: React.FC = () => {
  // Sample data for charts
  const nitrogenData: ChartData[] = [
    { time: '00:00', value: 175 },
    { time: '04:00', value: 177 },
    { time: '08:00', value: 179 },
    { time: '12:00', value: 180 },
    { time: '16:00', value: 181 },
    { time: '20:00', value: 180 },
  ];

  const phosphorusData: ChartData[] = [
    { time: '00:00', value: 28.0 },
    { time: '04:00', value: 27.5 },
    { time: '08:00', value: 26.0 },
    { time: '12:00', value: 25.5 },
    { time: '16:00', value: 24.5 },
    { time: '20:00', value: 25.0 },
  ];

  const potassiumData: ChartData[] = [
    { time: '00:00', value: 235 },
    { time: '04:00', value: 237 },
    { time: '08:00', value: 239 },
    { time: '12:00', value: 241 },
    { time: '16:00', value: 240 },
    { time: '20:00', value: 239 },
  ];

  const sensorReadings: SensorReading[] = [
    {
      timestamp: '2023-10-15 14:30',
      sensorType: 'Nitrogen',
      reading: '180 mg/kg',
      status: 'Optimal',
      change: '+2.3%',
    },
    {
      timestamp: '2023-10-15 14:30',
      sensorType: 'Phosphorus',
      reading: '25 mg/kg',
      status: 'Monitor',
      change: '-1.5%',
    },
    {
      timestamp: '2023-10-15 14:30',
      sensorType: 'Potassium',
      reading: '240 mg/kg',
      status: 'Good',
      change: '+1.8%',
    },
  ];

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Optimal':
        return 'bg-green-100 text-green-800';
      case 'Monitor':
        return 'bg-yellow-100 text-yellow-800';
      case 'Good':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getChangeColor = (change: string): string => {
    return change.startsWith('+') ? 'text-green-600' : 'text-red-600';
  };

  const ChartCard: React.FC<{
    title: string;
    status: string;
    currentLevel: string;
    recommended: string;
    data: ChartData[];
    color: string;
  }> = ({ title, status, currentLevel, recommended, data, color }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm">
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
        <span className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
      
      <div className="h-24 sm:h-32 mb-3 sm:mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#6b7280' }}
            />
            <YAxis hide />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="space-y-1 sm:space-y-2">
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="text-gray-600">Current Level:</span>
          <span className="font-medium text-gray-900">{currentLevel}</span>
        </div>
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="text-gray-600">Recommended:</span>
          <span className="text-gray-500">{recommended}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Chart Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <ChartCard
            title="Nitrogen Levels"
            status="Optimal"
            currentLevel="180 mg/kg"
            recommended="150-200 mg/kg"
            data={nitrogenData}
            color="#10b981"
          />
          <ChartCard
            title="Phosphorus Levels"
            status="Monitor"
            currentLevel="25 mg/kg"
            recommended="30-40 mg/kg"
            data={phosphorusData}
            color="#f59e0b"
          />
          <ChartCard
            title="Potassium Levels"
            status="Good"
            currentLevel="240 mg/kg"
            recommended="200-250 mg/kg"
            data={potassiumData}
            color="#3b82f6"
          />
        </div>

        {/* Sensor Reading History Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Sensor Reading History</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sensor Type
                  </th>
                  <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reading
                  </th>
                  <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sensorReadings.map((reading, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                      {reading.timestamp}
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                      {reading.sensorType}
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                      {reading.reading}
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${getStatusColor(reading.status)}`}>
                        {reading.status}
                      </span>
                    </td>
                    <td className={`px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium ${getChangeColor(reading.change)}`}>
                      {reading.change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// @ts-ignore
const SoilQualityDashboard = ({ user, onNavigate }: Props) => {
  console.log(user);
  return (
    <div className="min-h-screen bg-gray-50">
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
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 p-4 sm:p-6">
        <NPKValues/>
      </div>
    </div>
  );
};

export default SoilQualityDashboard;