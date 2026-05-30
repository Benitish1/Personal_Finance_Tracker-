/**
 * Data layer entry point:
 * A shared axios client centralizes base URL and timeout for all API calls.
 */
import axios from "axios";

export const BASE_URL = "https://67ac71475853dfff53dab929.mockapi.io/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
