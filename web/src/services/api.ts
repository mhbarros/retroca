import axios from 'axios';

interface ApiResponse {
  data: ApiData
}

interface ApiData {
  ok: boolean;
  reason?: string
  data?: object
}

const api = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true
});

export default api;
