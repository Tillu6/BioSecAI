import axios from 'axios';

// VITE_API_URL comes from frontend/.env (must be prefixed VITE_)
// Falls back to localhost if you forget to set it.
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const postBiometric = (type, data) =>
  axios.post(`${BASE}/api/biometrics/${type}`, data);
