import React from 'react';

const CallCard = ({ activity, onAction, actionType }) => {
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCallIcon = (type, direction) => {
    if (type === 'missed') return '❌';
    return direction === 'inbound' ? '📱 ↓' : '📱 ↑';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-xl">{getCallIcon(activity.call_type, activity.direction)}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {activity.call_type.charAt(0).toUpperCase() + activity.call_type.slice(1)} Call
            </h3>
            <p className="text-sm text-gray-500">{new Date(activity.created_at).toLocaleString()}</p>
          </div>
        </div>
        <button
          onClick={() => onAction(activity.id)}
          className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-full transition-colors duration-200 text-sm font-medium"
        >
          {actionType}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-gray-600">
            <span className="font-medium">From:</span> {activity.from}
          </div>
          <div className="text-gray-600">
            <span className="font-medium">To:</span> {activity.to}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-gray-600">
            <span className="font-medium">Via:</span> {activity.via}
          </div>
          <div className="text-gray-600">
            <span className="font-medium">Duration:</span> {formatDuration(activity.duration)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallCard;