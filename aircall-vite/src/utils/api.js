const BASE_URL = 'https://aircall-api.onrender.com';

export const testAPI = async () => {
  try {
    const response = await fetch(`${BASE_URL}/activities`);
    const data = await response.json();

    if (response.ok) {
      console.log('API test successful. Response:', data);
    } else {
      console.error('API test failed. Status:', response.status);
    }
  } catch (error) {
    console.error('Error during API test:', error);
    // Display a user-friendly error message
    alert('Failed to connect to the API. Please check your internet connection and try again.');
  }
};

export const fetchCalls = async () => {
  try {
    const response = await fetch(`${BASE_URL}/activities`);
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      console.error('Error fetching calls. Status:', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error fetching calls:', error);
    return [];
  }
};

export const archiveCall = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_archived: true }),
    });

    if (!response.ok) {
      console.error('Error archiving call. Status:', response.status);
    }
  } catch (error) {
    console.error('Error archiving call:', error);
  }
};

export const unarchiveCall = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_archived: false }),
    });

    if (!response.ok) {
      console.error('Error unarchiving call. Status:', response.status);
    }
  } catch (error) {
    console.error('Error unarchiving call:', error);
  }
};