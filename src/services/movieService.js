import api from "./apiService";
import API from "../constants/api";

const movieService = {
  getMovieById: (id) => {
    return api.get(`${API.GET_MOVIE_BY_ID}?MaPhim=${id}`);
  },
  getDetailMovie: (id) => {
    return api.get(`${API.GET_DETAIL_MOVIE}?MaPhim=${id}`);
  },
  getMoviesSeatById: (id) => {
    return api.get(`${API.GET_LIST_SEAT}?MaLichChieu=${id}`);
  },
  getFilmList: () => {
    return api.get(`${API.GET_FILM_LIST}`);
  },
  deleteFilm: (filmId) => {
    return api.delete(`${API.DELETE_FILM}?MaPhim=${filmId}`);
  },

  addFilm: (formData) => {
    return api.post(`${API.ADD_FILM}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3NSIsIkhldEhhblN0cmluZyI6IjE0LzA1LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NzE4MDgwMDAwMCIsIm5iZiI6MTcyMDg5MDAwMCwiZXhwIjoxNzQ3MzI4NDAwfQ.bqygxoVHbmcy6bdDT5IDHZGoA3eMAp4YV6_E_dO_XxI",
      },
    });
  },
};

export default movieService;
