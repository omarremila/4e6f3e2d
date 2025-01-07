import { useState, useCallback } from 'react';
import { fetchCalls, archiveCall, unarchiveCall, archiveAllCalls, unarchiveAllCalls } from '../utils/api';

export const useCallsState = (isArchived = false) => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionInProgress, setActionInProgress] = useState({});

  const loadCalls = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchCalls();
      setCalls(data.filter(call => call.is_archived === isArchived));
      setError(null);
    } catch (err) {
      setError('Failed to load calls');
    } finally {
      setLoading(false);
    }
  }, [isArchived]);

  const handleArchive = useCallback(async (id) => {
    setActionInProgress(prev => ({ ...prev, [id]: true }));
    try {
      // Optimistic update
      setCalls(prev => prev.filter(call => call.id !== id));
      await archiveCall(id);
    } catch (error) {
      // Rollback on error
      const data = await fetchCalls();
      setCalls(data.filter(call => call.is_archived === isArchived));
      setError('Failed to archive call');
    } finally {
      setActionInProgress(prev => ({ ...prev, [id]: false }));
    }
  }, [isArchived]);

  const handleUnarchive = useCallback(async (id) => {
    setActionInProgress(prev => ({ ...prev, [id]: true }));
    try {
      // Optimistic update
      setCalls(prev => prev.filter(call => call.id !== id));
      await unarchiveCall(id);
    } catch (error) {
      // Rollback on error
      const data = await fetchCalls();
      setCalls(data.filter(call => call.is_archived === isArchived));
      setError('Failed to unarchive call');
    } finally {
      setActionInProgress(prev => ({ ...prev, [id]: false }));
    }
  }, [isArchived]);

  const handleBulkArchive = useCallback(async () => {
    try {
      // Optimistic update
      const callsToArchive = [...calls];
      setCalls([]);
      await archiveAllCalls(callsToArchive);
    } catch (error) {
      // Rollback on error
      const data = await fetchCalls();
      setCalls(data.filter(call => call.is_archived === isArchived));
      setError('Failed to archive all calls');
    }
  }, [calls, isArchived]);

  const handleBulkUnarchive = useCallback(async () => {
    try {
      // Optimistic update
      const callsToUnarchive = [...calls];
      setCalls([]);
      await unarchiveAllCalls(callsToUnarchive);
    } catch (error) {
      // Rollback on error
      const data = await fetchCalls();
      setCalls(data.filter(call => call.is_archived === isArchived));
      setError('Failed to unarchive all calls');
    }
  }, [calls, isArchived]);

  return {
    calls,
    loading,
    error,
    actionInProgress,
    loadCalls,
    handleArchive,
    handleUnarchive,
    handleBulkArchive,
    handleBulkUnarchive
  };
};