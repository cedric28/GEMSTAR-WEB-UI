import axios from 'axios';

export const axiosInstance = (method, url, data) => {
  const requestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };
  return axios({
    method: method,
    url: `${process.env.REACT_APP_API_ENDPOINT}${url}`,
    data: data,
    ...requestConfig
  });
};
