import React, { useEffect, useState } from 'react';

import { fetchCalls, unarchiveCall } from '../utils/api.jsx'; 
const ArchivedTab = () => {
  const [archivedActivities, setArchivedActivities] = useState([]);

  useEffect(() => {
    const fetchArchived = async () => {
      const data = await fetchCalls();
      setArchivedActivities(data.filter(activity => activity.is_archived));
    };

    fetchArchived();
  }, []);

  const handleUnarchive = async (id) => {
    try {
      const result = await unarchiveCall(id);
      if (result && !result.is_archived) {
        // Only remove from list if successfully unarchived
        setArchivedActivities(archivedActivities.filter(activity => activity.id !== id));
      }
    } catch (error) {
      console.error('Failed to unarchive call:', error);
      alert('Failed to unarchive call. Please try again.');
    }
  };

  return (
    <div className="archived-tab">
      <h2>Archived Calls</h2>
      {archivedActivities.map((activity) => (
        <div key={activity.id} className="activity-item">
          <div>From: {activity.from}</div>
          <div>To: {activity.to}</div>
          <div>Duration: {activity.duration} seconds</div>
          <div>Call Type: {activity.call_type}</div>
          <button onClick={() => handleUnarchive(activity.id)}>Unarchive</button>
        </div>
      ))}
    </div>
  );
};

export default ArchivedTab;