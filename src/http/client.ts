import axios from "axios";

let store: any;
export const injectStore = (_store: any) => {
  store = _store;
};

const instance = axios.create({
  timeout: 15500,
  baseURL: "https://www.carmax.com/cars/api/",
});

// instance.interceptors.response.use(
//   (response) => {
//     if (response.data.IsFail === true) {
//       return Promise.reject(response.data.Messages);
//     } else {
//       return response.data;
//     }
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.request.use(
//   function (config) {
//     const state = store.getState();
//     const token = state.auth.token;
//     if (token) {
//       config.headers["Authorization"] = "Bearer " + token;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

export default instance;
