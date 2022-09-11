import runtimeEnv from "@mars/heroku-js-runtime-env";
import axios from "axios";

function authHeaders() {
  return {
    auth: {
      username: "foo@test.com",
      password: "foobar",
    },
  };
}

function buildUrl(path) {
  const env = runtimeEnv();
  return `${env.REACT_APP_API_URL}${path}`;
}

class BaseApi {
  get(path) {
    return axios.get(buildUrl(path), authHeaders());
  }
  post(path, data) {
    return axios.post(buildUrl(path), data);
  }

  async login(path, username, password) {
    try {
      const response = await axios.post(buildUrl(path), { email: username, password });

      return { response, statusCode: response?.status };
    } catch (error) {
      return {
        error: true,
        message: error?.response?.data?.message || "Internal error",
        statusCode: error?.response?.status,
      };
    }
  }
}

const baseApi = new BaseApi();

export default baseApi;
