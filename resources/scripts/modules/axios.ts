import axios from 'axios'

export default axios.create({
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  timeout: 4000,
})
