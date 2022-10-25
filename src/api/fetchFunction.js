import axios from 'axios';

const API_KEY = 'df60f1682cfdb2a273d4df0e1e89ea6f';
const BASE_URL = 'https://api.themoviedb.org/3/';

const getWeeklyTrending = async (media_type, time_window) => {
  const response = await axios.get(
    `${BASE_URL}trending/${media_type}/${time_window}`,
    { params: { api_key: API_KEY } }
  );
  return response;
};

const getMovieDetail = async id => {
  const { data } = await axios.get(`${BASE_URL}movie/${id}`, {
    params: { api_key: API_KEY, language: 'en-US' },
  });
  return data;
};

const getConfiguration = async () => {
  const { data } = await axios.get(`${BASE_URL}configuration`, {
    params: { api_key: API_KEY },
  });
  return data.images;
};

const getSearchMovies = async query => {
  const { data } = await axios.get(`${BASE_URL}search/movie`, {
    params: { api_key: API_KEY, query },
  });
  return data;
};

export { getWeeklyTrending, getMovieDetail, getConfiguration, getSearchMovies };
