/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { API_BASE_URL } from '../constants'
import { AppDispatch } from '../store/index'
import { instanceAxios as axios } from '../utils/axios'

type Item = {
  loading: boolean,
  categories?: [],
  created_at?: Date,
  icon_url?: string,
  id?: string,
  updated_at?: Date,
  url?: string,
  value?: string
}

interface InitialState {
  list: {
    data: any[];
  };
  item: Item
}

const initialState: InitialState = {
  list: {
    data: [],
  },
  item: {
    loading: false,
  },
}

const slice = createSlice({
  name: 'joke',
  initialState,
  reducers: {

    getjokeRequest(joke) {
      joke.item = { ...initialState.item }
      joke.item.loading = true
    },
    getjokeList(joke, action) {
      const { data } = action.payload
      console.log(data)
      joke.item = { ...initialState.item, ...data }
      joke.item.loading = false
    },

  }
})

// INSIDE
const getjokeList = () => async (dispatch: AppDispatch) => {
  const response = await axios.get(`${API_BASE_URL}`).catch(() => ({ data: null }))

  const { data } = response
  dispatch(slice.actions.getjokeList({ data }))
}

// OUTSIDE
export const getjokeRequest = () => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.getjokeRequest())
  dispatch(getjokeList())
}

export const { reducer } = slice
export default slice
