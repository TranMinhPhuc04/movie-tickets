import api from "./apiService";
import API from "../constants/api";

const userService = {
  login: (userLogin) => {
    return api.post(API.GET_LOGIN, userLogin);
  },
  register: (userRegister) => {
    return api.post(API.POST_REGISTER, userRegister);
  },
};

export default userService;
