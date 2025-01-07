import React from 'react';
import PropTypes from 'prop-types';

const CallCard = ({ activity, onAction, actionType, isLoading = false, onClick }) => {
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCallIcon = (type, direction) => {
    if (type === 'missed') return '❌';
    return direction === 'inbound' ? '📱 ↓' : '📱 ↑';
  };

  const validateActivity = () => {
    const requiredFields = ['id', 'call_type', 'direction', 'from', 'to', 'duration', 'via', 'created_at'];
    return requiredFields.every(field => activity.hasOwnProperty(field));
  };

  if (!validateActivity()) {
    console.error('Invalid activity data:', activity);
    return null;
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-6 cursor-pointer"
      onClick={() => onClick(activity.id)}
    >
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
          onClick={(e) => {
            e.stopPropagation();
            onAction(activity.id);
          }}
          disabled={isLoading}
          className={`px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-full transition-colors duration-200 text-sm font-medium ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            actionType
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-gray-600">
            <span className="font-medium">From:</span> {String(activity.from)}
          </div>
          <div className="text-gray-600">
            <span className="font-medium">To:</span> {String(activity.to)}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-gray-600">
            <span className="font-medium">Via:</span> {String(activity.via)}
          </div>
          <div className="text-gray-600">
            <span className="font-medium">Duration:</span> {formatDuration(activity.duration)}
          </div>
        </div>
      </div>
    </div>
  );
};

CallCard.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    call_type: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
    from: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    duration: PropTypes.number.isRequired,
    via: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    created_at: PropTypes.string.isRequired,
    is_archived: PropTypes.bool.isRequired
  }).isRequired,
  onAction: PropTypes.func.isRequired,
  actionType: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default CallCard;