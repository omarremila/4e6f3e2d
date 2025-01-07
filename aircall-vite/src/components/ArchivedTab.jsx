import React, { useEffect, useState } from 'react';
import CallCard from './CallCard';
import ActivityDetail from './ActivityDetail';
import { useCallsState } from '../hooks/useCallsState';

const ArchivedTab = () => {
  const { 
    calls: archivedActivities, 
    loading, 
    error, 
    actionInProgress,
    loadCalls,
    handleUnarchive,
    handleBulkUnarchive
  } = useCallsState(true);

  const [selectedActivityId, setSelectedActivityId] = useState(null);

  useEffect(() => {
    loadCalls();
  }, [loadCalls]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={loadCalls}
          className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
        >
          Retry
        </button>
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
          <button 
            onClick={handleBulkUnarchive}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
          >
            Unarchive All
          </button>
        )}
      </div>

      <div className="space-y-4">
        {archivedActivities.map((activity) => (
          <CallCard 
            key={activity.id}
            activity={activity}
            onAction={handleUnarchive}
            actionType="Unarchive"
            isLoading={actionInProgress[activity.id]}
            onClick={() => setSelectedActivityId(activity.id)}
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

      {selectedActivityId && (
        <ActivityDetail 
          id={selectedActivityId}
          onClose={() => setSelectedActivityId(null)}
        />
      )}
    </div>
  );
};

export default ArchivedTab;