import Axios from 'axios';
import qs from 'qs';

const axios = Axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: true,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});

export const getAllBeers = (beer) => {
  return axios({
    method: 'GET',
    url: 'beers',
    data: qs.stringify(beer),
  }).then((response) => {
    setUser(response.data);
  });
};
