import axios from 'axios';

export const apiAdapter = (baseURL: string) => {
  return axios.create({
    baseURL: baseURL
  });
}
