import axios from 'axios';

const API_KEY = 'df60f1682cfdb2a273d4df0e1e89ea6f';
const BASE_URL = 'https://api.themoviedb.org/3/';

const getWeeklyTrending = async (media_type, time_window) => {
  const response = await axios.get(
    `${BASE_URL}/trending/${media_type}/${time_window}`,
    { params: { api_key: API_KEY } }
  );
  return response;
};

export { getWeeklyTrending };
