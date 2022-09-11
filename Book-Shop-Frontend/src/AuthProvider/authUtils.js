import axios from "axios";

const setupAuthHeaderForServiceCalls = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Basic ${token}`;

    return {};
  }

  return delete axios.defaults.headers.common.Authorization;
};

export const setupAuthExceptionHandler = (logoutUser) => {
  const UNAUTHORIZED = 401;
  const FORBIDDEN = 403;

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED || error?.response?.status === FORBIDDEN) {
        setTimeout(() => logoutUser(), 3 * 1000);
      }

      return Promise.reject(error);
    }
  );
};

export default setupAuthHeaderForServiceCalls;
