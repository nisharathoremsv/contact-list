import axios from 'axios';

export const getContactList = () => {
  return axios.get(`https://reqres.in/api/users`)
}