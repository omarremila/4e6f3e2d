const BASE_URL = 'https://aircall-api.onrender.com';
let AUTH_TOKEN = null;  // We'll store the token here

// Add function to set token
export const setAuthToken = (token) => {
  AUTH_TOKEN = token;
};

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
    alert('Failed to connect to the API. Please check your internet connection and try again.');
  }
};

// Add back the fetchCalls function that was missing
export const fetchCalls = async () => {
  try {
    const response = await fetch(`${BASE_URL}/activities`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
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
          'Authorization': `Bearer ${AUTH_TOKEN}`,  // Add auth header
        },
        body: JSON.stringify({ is_archived: true }),
      });
      // ... rest of function
    } catch (error) {
      console.error('Error in archiveCall:', error);
      throw error;
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error unarchiving call:', error);
    throw error;
  }
};

export const testGetSingleActivity = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/activities/${id}`);
      console.log('GET Single Activity Status:', response.status);
      const data = await response.json();
      console.log('GET Single Activity Data:', data);
      return data;
    } catch (error) {
      console.error('GET Single Activity Error:', error);
    }
  };