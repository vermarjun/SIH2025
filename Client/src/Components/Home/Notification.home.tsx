import React, { useState, useMemo } from 'react';
import { Bell, Filter, Search, X, Calendar, AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'urgent' | 'success';
  timestamp: string;
  isRead: boolean;
  category: string;
}

interface Props {
  user?: any;
  onNavigate?: (itemKey: string) => void;
}

const NotificationDashboard: React.FC<Props> = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Soil Moisture Alert',
      message: 'Nitrogen levels in Field A have dropped below optimal range. Consider applying fertilizer within the next 48 hours.',
      type: 'warning',
      timestamp: '2024-12-15T10:30:00Z',
      isRead: false,
      category: 'soil-health'
    },
    {
      id: '2',
      title: 'System Maintenance Complete',
      message: 'All sensor calibrations have been completed successfully. System is now operating at full capacity.',
      type: 'success',
      timestamp: '2024-12-15T08:15:00Z',
      isRead: true,
      category: 'system'
    },
    {
      id: '3',
      title: 'Critical: Phosphorus Deficiency',
      message: 'Severe phosphorus deficiency detected in Field B. Immediate intervention required to prevent crop damage.',
      type: 'urgent',
      timestamp: '2024-12-15T07:45:00Z',
      isRead: false,
      category: 'soil-health'
    },
    {
      id: '4',
      title: 'Weather Advisory',
      message: 'Heavy rainfall expected in the next 24 hours. Consider adjusting irrigation schedules accordingly.',
      type: 'info',
      timestamp: '2024-12-14T16:20:00Z',
      isRead: true,
      category: 'weather'
    },
    {
      id: '5',
      title: 'Sensor Offline',
      message: 'Potassium sensor in Field C has been offline for 3 hours. Please check connection and battery status.',
      type: 'urgent',
      timestamp: '2024-12-14T14:30:00Z',
      isRead: false,
      category: 'system'
    },
    {
      id: '6',
      title: 'Weekly Report Available',
      message: 'Your weekly soil analysis report is now ready for download. View insights and recommendations for optimal crop yield.',
      type: 'info',
      timestamp: '2024-12-14T12:00:00Z',
      isRead: true,
      category: 'reports'
    },
    {
      id: '7',
      title: 'Optimal Nitrogen Levels',
      message: 'Nitrogen levels in Field D have reached optimal range. Great work on the recent fertilization program!',
      type: 'success',
      timestamp: '2024-12-13T15:45:00Z',
      isRead: false,
      category: 'soil-health'
    },
    {
      id: '8',
      title: 'Temperature Fluctuation',
      message: 'Unusual temperature variations detected. Monitor soil temperature sensors and adjust greenhouse settings if needed.',
      type: 'warning',
      timestamp: '2024-12-13T11:20:00Z',
      isRead: true,
      category: 'monitoring'
    }
  ]);

  const [filterType, setFilterType] = useState<'all' | 'read' | 'unread' | 'urgent'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'info':
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string, isRead: boolean) => {
    const baseColors = {
      urgent: 'bg-red-100 text-red-800 border-red-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      success: 'bg-green-100 text-green-800 border-green-200',
      info: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return baseColors[type as keyof typeof baseColors] || baseColors.info;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      // Filter by read/unread/urgent status
      if (filterType === 'read' && !notification.isRead) return false;
      if (filterType === 'unread' && notification.isRead) return false;
      if (filterType === 'urgent' && notification.type !== 'urgent') return false;
      
      // Filter by search query
      if (searchQuery && !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !notification.message.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by date
      if (dateFilter) {
        const notificationDate = new Date(notification.timestamp).toISOString().split('T')[0];
        if (notificationDate !== dateFilter) return false;
      }
      
      return true;
    });
  }, [notifications, filterType, searchQuery, dateFilter]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-start md:justify-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-black">
                  Notification <span className="text-blue-600">Center</span>
                </h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">Stay updated with important notices and system alerts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8 pb-8">
        {/* Controls Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">
                    Total: {filteredNotifications.length}
                  </span>
                  {unreadCount > 0 && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      {unreadCount} unread
                    </span>
                  )}
                </div>
                
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm w-full sm:w-auto justify-center"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search notifications..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Status Filter */}
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="all">All notifications</option>
                    <option value="unread">Unread only</option>
                    <option value="read">Read only</option>
                    <option value="urgent">Urgent only</option>
                  </select>

                  {/* Date Filter */}
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    {dateFilter && (
                      <button
                        onClick={() => setDateFilter('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Notifications</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredNotifications.length === 0 ? (
              <div className="p-6 sm:p-8 text-center">
                <Bell className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <p className="text-gray-500 text-sm sm:text-base">No notifications match your current filters.</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 sm:p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notification.isRead ? 'bg-blue-25' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3 sm:gap-4">
                    <div className={`flex-shrink-0 p-2 rounded-lg ${getNotificationColor(notification.type, notification.isRead)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-semibold text-sm sm:text-base truncate ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                            <span>{formatTimestamp(notification.timestamp)}</span>
                            <span className="capitalize">{notification.category.replace('-', ' ')}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          {notification.type === 'urgent' && (
                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                              Urgent
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDashboard;