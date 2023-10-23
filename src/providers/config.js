import axios from 'axios';

//export const baseURL = 'https://goodcasting.herokuapp.com/api/v1';
//export const baseURL = 'http://3.140.205.170:8000/api/v1';
export const baseURL = 'https://api.goodcasting.pt/api/v1';

//export const baseURL = 'http://10.0.2.2:8000/api/v1';

export default axios.create({
  baseURL,
});
