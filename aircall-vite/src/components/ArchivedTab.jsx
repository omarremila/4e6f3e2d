import React, { useState, useEffect } from 'react';
import CallCard from './CallCard';
import { unarchiveCall, unarchiveAllCalls } from '../utils/api';

const ArchivedTab = () => {
  const [archivedActivities, setArchivedActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArchived();
  }, []);

  const fetchArchived = async () => {
    try {
      const response = await fetch('https://aircall-api.onrender.com/activities');
      const data = await response.json();
      setArchivedActivities(data.filter(activity => activity.is_archived));
      setError(null);
    } catch (err) {
      setError('Failed to load archived activities');
    } finally {
      setLoading(false);
    }
  };

  const handleUnarchive = async (id) => {
    try {
      await fetch(`https://aircall-api.onrender.com/activities/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_archived: false }),
      });
      setArchivedActivities(prev => prev.filter(activity => activity.id !== id));
    } catch (error) {
      console.error('Failed to unarchive call:', error);
    }
  };
const handleUnarchiveAll = async () => {
  try {
    await unarchiveAllCalls(archivedActivities);
    // Clear all archived activities after successful unarchival
    setArchivedActivities([]);
  } catch (error) {
    console.error('Failed to unarchive all calls:', error);
    alert('Failed to unarchive all calls. Please try again.');
  }
};

// Update the Unarchive All button to use this function
{archivedActivities.length > 0 && (
  <button 
    onClick={handleUnarchiveAll}
    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
  >
    Unarchive All
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
          <h2 className="text-2xl font-bold text-gray-900">Archived Calls</h2>
          <p className="text-gray-600 mt-1">{archivedActivities.length} archived calls</p>
        </div>
        {archivedActivities.length > 0 && (
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200">
            Unarchive All
          </button>
        )}
      </div>

      <div className="space-y-4">
        {archivedActivities.map(activity => (
          <CallCard 
            key={activity.id}
            activity={activity}
            onAction={handleUnarchive}
            actionType="Unarchive"
          />
        ))}
      </div>

      {archivedActivities.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">📂</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Archived Calls</h3>
          <p className="text-gray-500">Your archive is empty</p>
        </div>
      )}
    </div>
  );
};

export default ArchivedTab;