import api from "./apiService";

const theaterService = {
  getTheaterSystems: () => {
    return api.get(`/QuanLyRap/LayThongTinHeThongRap`);
  },
  getTheatersBySystem: (maHeThongRap) => {
    return api.get(
      `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
    );
  },
};

export default theaterService;
