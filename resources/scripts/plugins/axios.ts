import Axios, { AxiosInstance } from 'axios'

const axios: AxiosInstance = Axios.create({
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

export default axios
