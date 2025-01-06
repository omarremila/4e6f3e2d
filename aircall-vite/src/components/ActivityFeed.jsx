import React, { useState, useEffect } from 'react';
import CallCard from './CallCard';
import { archiveCall, archiveAllCalls } from '../utils/api';

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch('https://aircall-api.onrender.com/activities');
      const data = await response.json();
      setActivities(data.filter(activity => !activity.is_archived));
      setError(null);
    } catch (err) {
      setError('Failed to load activities');
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async (id) => {
    try {
      await fetch(`https://aircall-api.onrender.com/activities/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_archived: true }),
      });
      setActivities(prev => prev.filter(activity => activity.id !== id));
    } catch (error) {
      console.error('Failed to archive call:', error);
    }
  };
const handleArchiveAll = async () => {
  try {
    await archiveAllCalls(activities);
    // Clear all activities after successful archival
    setActivities([]);
  } catch (error) {
    console.error('Failed to archive all calls:', error);
    alert('Failed to archive all calls. Please try again.');
  }
};

// Update the Archive All button to use this function
{activities.length > 0 && (
  <button 
    onClick={handleArchiveAll}
    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
  >
    Archive All
  </button>
)}

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Activity Feed</h2>
          <p className="text-gray-600 mt-1">{activities.length} active calls</p>
        </div>
        {activities.length > 0 && (
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200">
            Archive All
          </button>
        )}
      </div>

      <div className="space-y-4">
        {activities.map(activity => (
          <CallCard 
            key={activity.id}
            activity={activity}
            onAction={handleArchive}
            actionType="Archive"
          />
        ))}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">📥</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Active Calls</h3>
          <p className="text-gray-500">All calls have been archived</p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;