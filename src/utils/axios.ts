import axios from 'axios'

type Err = {
  message: string;
  response: any;
}

const errorHandler = (err: Err) => {
  console.log(err.response.data)
  console.log(err.response.status, err.message)
  const message = err.response.data.error ? `${err.response.data.error}` : `${err.message}`
  return Promise.reject(message)
}

export const instanceAxios = axios.create({ withCredentials: true })

instanceAxios.interceptors.request.use((req) => req, errorHandler)
instanceAxios.interceptors.response.use((res) => res, errorHandler)

export default instanceAxios
