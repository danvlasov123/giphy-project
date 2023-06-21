import axios, { AxiosRequestConfig } from "axios";
import { setAuthLocal } from "../utils/authStorage";

const api_key = "G0RsOXyOU37gwV2J1TAe7lDz9DLOKEh9";

export const api_url = "https://api.giphy.com/v1/gifs";

const location_url = "http://localhost:3000";

export const fetcher = async (url: string, config?: AxiosRequestConfig) => {
  return await axios(url, {
    ...config,
    params: {
      api_key: api_key,
      ...config?.params,
    },
  }).then((res) => res.data);
};

export const GET_GIPHY_URL = `${api_url}/trending`;
export const GET_SEARCH_GIPHY_URL = `${api_url}/search`;
export const GET_USER_BY_EMAIL = `${location_url}/users`;
export const FAVORITES_URL = `${location_url}/favorites_db`;

export const fetchLogin = async (email: string, password: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await axios.get<any[]>(
      `${location_url}/users?email=${email}`
    );

    if (response.data.length) {
      const userData = response.data[0];

      if (userData.password === password) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...other } = userData;

        setAuthLocal({ ...other });
        return { ...other };
      }

      throw new Error("Incorrect password");
    }

    throw new Error("This account does not exist!");
  } catch (error) {
    return {
      error,
    };
  }
};

export const fetchRegister = async (data: any) => {
  try {
    const isSomeUser = await axios.get(
      `${location_url}/users?email=${data?.email}`
    );

    if (isSomeUser.data.length) {
      throw new Error("An account with this email exists!");
    }

    const response = await axios.post(`${location_url}/users`, {
      ...data,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...other } = response.data;

    setAuthLocal({ ...other });

    return response.data;
  } catch (error) {
    return {
      error,
    };
  }
};
