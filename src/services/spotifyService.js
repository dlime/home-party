import axios from "axios";

axios.defaults.baseURL = "https://api.spotify.com/v1/";

function setToken(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (expectedError) {
    console.error(
      "Unexpected error: " +
        (error.response && error.response.data).error.message
    );
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  put: axios.put,
  setToken,
};
