import Axios from 'axios';
import qs from 'qs';

const axios = Axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: true, // this prevents cors errors, they also could have called it 'withCors'
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});

// export const getAllBeers = (beer) => {
//   return axios({
//     method: 'GET',
//     url: 'beers',
//     data: qs.stringify(beer),
//   }).then((res) => {
//     res.status(200).json(res.data);
//   });
// };

export const getAllBeers = (beer) => {
  return axios({
    method: 'GET',
    url: 'beers',
    data: qs.stringify(beer),
  })
    .then((response) => {
      console.log('all beers response: ', response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getAllBeers;
