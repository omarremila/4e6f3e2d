import React, { useEffect, useState } from 'react';
import { fetchCalls, archiveCall, testGetSingleActivity } from '../utils/api.jsx';

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const data = await fetchCalls();
      setActivities(data.filter(activity => !activity.is_archived));
    };

    fetchActivities();
  }, []);

  const handleArchive = async (id) => {
    try {
      // First test if we can GET the activity
      console.log('Testing GET for activity:', id);
      const testGet = await testGetSingleActivity(id);
      console.log('GET test result:', testGet);
  
      // Then try to archive it
      const result = await archiveCall(id);
      if (result && result.is_archived) {
        setActivities(activities.filter(activity => activity.id !== id));
      }
    } catch (error) {
      console.error('Failed to archive call:', error);
      alert('Failed to archive call. Please try again.');
    }
  };
  return (
    <div className="activity-feed">
      <h2>Activity Feed</h2>
      {activities.map((activity) => (
        <div key={activity.id} className="activity-item">
          <div>From: {activity.from}</div>
          <div>To: {activity.to}</div>
          <div>Duration: {activity.duration} seconds</div>
          <div>Call Type: {activity.call_type}</div>
          <button onClick={() => handleArchive(activity.id)}>Archive</button>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;