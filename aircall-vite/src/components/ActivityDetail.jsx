import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchCallById } from '../utils/api.jsx';

const ActivityDetail = ({ id, onClose }) => {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const data = await fetchCallById(id);
        setActivity(data);
      } catch (err) {
        setError('Failed to load activity details');
      } finally {
        setLoading(false);
      }
    };
    loadActivity();
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
          <p className="text-red-500">{error}</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded">Close</button>
        </div>
      </div>
    );
  }

  if (!activity) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold">Call Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Call Type</p>
            <p>{activity.call_type}</p>
          </div>
          <div>
            <p className="font-semibold">Direction</p>
            <p>{activity.direction}</p>
          </div>
          <div>
            <p className="font-semibold">From</p>
            <p>{activity.from}</p>
          </div>
          <div>
            <p className="font-semibold">To</p>
            <p>{activity.to}</p>
          </div>
          <div>
            <p className="font-semibold">Duration</p>
            <p>{activity.duration} seconds</p>
          </div>
          <div>
            <p className="font-semibold">Via</p>
            <p>{activity.via}</p>
          </div>
          <div>
            <p className="font-semibold">Created At</p>
            <p>{new Date(activity.created_at).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

ActivityDetail.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ActivityDetail;