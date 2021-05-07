/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { API_BASE_URL } from '../constants'
import { AppDispatch } from '../store/index'
import { instanceAxios as axios } from '../utils/axios'

type Item = {
  categories?: [],
  created_at?: Date,
  icon_url?: string,
  id?: string,
  updated_at?: Date,
  url?: string,
  value?: string
}

type OptItem = {
  loading: boolean,
  intervaled: boolean
}

interface InitialState {
  list: {
    data: any[];
  };
  item: Item & OptItem
}

const initialState: InitialState = {
  list: {
    data: [],
  },
  item: {
    intervaled: false,
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
    getjokeItem(joke, action) {
      const { data } = action.payload
      console.log(data)
      joke.item = { ...initialState.item, ...data }
      joke.item.loading = false
    },

  }
})

// INSIDE
const getjokeItem = () => async (dispatch: AppDispatch) => {
  const response = await axios.get(`${API_BASE_URL}`).catch(() => ({ data: null }))

  const { data } = response
  dispatch(slice.actions.getjokeItem({ data }))
}

// OUTSIDE
export const getJokeRequest = () => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.getjokeRequest())
  dispatch(getjokeItem())
}

export const { reducer } = slice
export default slice
