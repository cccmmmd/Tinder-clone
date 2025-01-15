//const BASE_URL = '/api';
const BASE_URL = import.meta.env.MODE === "dev" ? "http://localhost:3000/api" : "/api";

const fetchInstance = async (endpoint, options = {}) => {
  const defaultOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return fetch(`${BASE_URL}${endpoint}`, { 
    ...defaultOptions,
    ...options 
  });
};

export { fetchInstance };