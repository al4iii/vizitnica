import axios from 'axios'
import api from '../constants/api'


const baseURL = api.backend_api

export const APIStatus = {
  Initial: 'Initial',
  Loading: 'Loading',
  Success: 'Success',
  Failure: 'Failure',
}

export const getCallAPI = () => props => async () => {
  const {
    url,
    payload,
    onSuccess,
    onError,
    config,
    includeHeaders,
    customBaseUrl,
    nestedResponseType = true,
  } = props
  let response
  console.log(props, 'props')
  try {
    const method = config?.method
    if (method && method.toLowerCase() === 'put') {
      response = await axios.put(
        (customBaseUrl || baseURL) + url, payload, config)
    } else if (method && method.toLowerCase() === 'get') {
      response = await axios.get((customBaseUrl || baseURL) + url, config)

    } else if (method && method.toLowerCase() === 'delete') {
      response = await axios.delete((customBaseUrl || baseURL) + url, config)
    } else {
      response = await axios.post(
        (customBaseUrl || baseURL) + url,
        payload,
        config,
      )
    }

    if (onSuccess) {
      console.log('success call api', response.data)
      onSuccess(response.data)
    } else {
      console.log('ошибка')
      if (onError) {
        onError(response)
      }

    }
  }
  catch (err) {
    console.log(err, 'erroraaa')
    if (onError) {
      onError(err)
    }
  }
}

export const callAPI = getCallAPI()
