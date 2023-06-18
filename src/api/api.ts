import axios, { AxiosRequestConfig } from "axios";

const api_key = "G0RsOXyOU37gwV2J1TAe7lDz9DLOKEh9";

const api_url = "https://api.giphy.com/v1/gifs";

export const fetcher = (url: string, config?: AxiosRequestConfig) =>
  axios(url, {
    ...config,
    params: {
      api_key: api_key,
      ...config?.params,
    },
  }).then((res) => res.data?.data);

export const GET_GIPHY_URL = `${api_url}/trending`;
export const GET_SEARCH_GIPHY_URL = `${api_url}/search`;
