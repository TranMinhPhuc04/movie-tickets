import api from "./apiService";
import API from "../constants/api";

const movieService = {
  getMovieById: (idFilm) => {
    return api.get(`${API.GET_MOVIE_BY_ID}?MaPhim=${idFilm}`);
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

  addFilm: (formData) => {
    return api.post(`${API.ADD_FILM}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3NSIsIkhldEhhblN0cmluZyI6IjE0LzA1LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NzE4MDgwMDAwMCIsIm5iZiI6MTcyMDg5MDAwMCwiZXhwIjoxNzQ3MzI4NDAwfQ.bqygxoVHbmcy6bdDT5IDHZGoA3eMAp4YV6_E_dO_XxI",
      },
    });
  },

  deleteFilm: (filmId) => {
    return api.delete(`/QuanLyPhim/XoaPhim?MaPhim=${filmId}`);
  },

  updateFilm: (formData) => {
    return api.post(`/QuanLyPhim/CapNhatPhimUpload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  createShowtime: (data) => {
    return api.post(`QuanLyDatVe/TaoLichChieu`, data);
  },
};

export default movieService;
