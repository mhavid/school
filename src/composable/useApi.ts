import axios, { AxiosInstance } from 'axios'

import { useUserSession } from '/@src/stores/userSession'

let api: AxiosInstance

export function createApi() {
  // Here we set the base URL for all requests made to the api
  api = axios.create({
    // baseURL: import.meta.env.VITE_API_BASE_URL,
    baseURL:
      import.meta.env.VITE_PRODUCTION === 'true'
        ? import.meta.env.VITE_API_PROD_BASE_URL
        : import.meta.env.VITE_API_DEV_BASE_URL,
    params: {
      api_token: localStorage.token,
    }
  })

  // We set an interceptor for each request to
  // include Bearer token to the request if user is logged in
  api.interceptors.request.use((config) => {
    const userSession = useUserSession()

    if (userSession.isLoggedIn) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${userSession.token}`,
      }
    }

    return config
  })

    // Add a response interceptor
  api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if(response.data.meta.status == 401){
      window.location.href = '/auth/login'
    }
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  return api
}

export function useApi() {
  if (!api) {
    createApi()
  }
  return api
}
