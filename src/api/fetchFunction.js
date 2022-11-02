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

const getSearchMovies = async (query, page) => {
  const { data } = await axios.get(`${BASE_URL}search/movie`, {
    params: { api_key: API_KEY, query, page },
  });
  return data;
};

const getCast = async id => {
  const { data } = await axios.get(`${BASE_URL}movie/${id}/credits`, {
    params: { api_key: API_KEY, language: 'en-US' },
  });
  const filteredCast = data.cast.filter(item => item.popularity > 7);
  return filteredCast.sort(function (a, b) {
    if (a.popularity < b.popularity) {
      return 1;
    }
    if (a.popularity > b.popularity) {
      return -1;
    }
    return 0;
  });
};

const getReviews = async id => {
  const { data } = await axios.get(`${BASE_URL}movie/${id}/reviews`, {
    params: { api_key: API_KEY, language: 'en-US' },
  });

  const reviews =  data.results.map(item => ({
    id: item.id,
    author: item.author,
    content: item.content,
  }));
  return reviews;
};

export {
  getWeeklyTrending,
  getMovieDetail,
  getConfiguration,
  getSearchMovies,
  getCast,
  getReviews,
};
