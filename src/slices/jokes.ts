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
}

interface InitialState {
  list: {
    data: any[];
  };
  item: Item & OptItem
}

const initialFavoriteJokes = localStorage.getItem('jokes')

const initialState: InitialState = {
  list: {
    data: initialFavoriteJokes ? JSON.parse(initialFavoriteJokes) : []
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
    getjokeItem(joke, action) {
      const { data } = action.payload
      joke.item = { ...initialState.item, ...data }
      joke.item.loading = false
    },

    likeJoke(joke) {
      const j = joke.item
      if (joke.list.data.length >= 10) {
        joke.list.data.shift()
      }
      joke.list.data.push(j)
      localStorage.setItem('jokes', JSON.stringify(joke.list.data))
    },
    unlikeJoke(joke, action) {
      const { id } = action.payload
      joke.list.data = joke.list.data.filter((j) => j.id !== id)
      localStorage.setItem('jokes', JSON.stringify(joke.list.data))
    },
    unlikeAll(joke) {
      joke.list.data = []
      localStorage.removeItem('jokes')
    }

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

export const likeJoke = () => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.likeJoke())
}

export const unlikeJoke = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.unlikeJoke({ id }))
}

export const unlikeAll = () => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.unlikeAll())
}

export const { reducer } = slice
export default slice
