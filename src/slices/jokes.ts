/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { API_BASE_URL } from '../constants'
import { AppDispatch } from '../store/index'
import { instanceAxios as axios } from '../utils/axios'

type InitialState = {
  list: {
    loading: boolean;
    data: any[];
    total: number,
    count: number
  };
  item: {
    loading: boolean | string;
    data: null | any;
  }
}

const initialState: InitialState = {
  list: {
    loading: false,
    data: [], // []
    total: 0,
    count: 0
  },
  item: {
    loading: false,
    data: null,
  },
}

const slice = createSlice({
  name: 'joke',
  initialState,
  reducers: {
    /** joke */
    getjokeItemRequest(joke) {
      joke.item = { ...initialState.item }
      joke.item.loading = true
    },
    getjokeItem(joke, action) {
      const { jokeData } = action.payload
      joke.item.data = jokeData
      joke.item.loading = false
    },
    getjokeError(joke) {
      joke.item.loading = 'reload'
    },
    /** jokes */
    getjokeListRequest(joke) {
      joke.list = { ...initialState.list }
      joke.list.loading = true
    },
    getjokeList(joke, action) {
      const { data } = action.payload
      joke.list = { ...initialState.list, ...data }
      joke.list.loading = false
    },
    deletejoke(joke, action) {
      const { jokeId } = action.payload
      joke.list.data = joke.list.data.filter((el) => el.id !== jokeId)
    },

  }
})

type Params = {
  language: string[];
  level: string[];
  limit: number;
  page: number;
  fromDashboard: boolean;
  // limit: number;
}
const filter = (params: Params) => {
  const f: any = { ...params }
  if (params?.language?.length) {
    f.language = JSON.stringify(params.language)
  }
  if (params?.level?.length) {
    f.level = JSON.stringify(params.level)
  }
  return f
}

// INSIDE
export const getjokeItem = (
  { jokeId }: {jokeId: string}
) => async (dispatch: AppDispatch) => {
  try {
    const jokeResponse = await axios.get(`${API_BASE_URL}/jokes/${jokeId}`)

    dispatch(slice.actions.getjokeItem({
      jokeData: jokeResponse.data.data
    }))
  } catch (error) {
    dispatch(slice.actions.getjokeError())
  }
}

// OUTSIDE
export const getjokeItemRequest = (
  { jokeId }: {jokeId: string}
) => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.getjokeItemRequest())
  dispatch(getjokeItem({ jokeId }))
}

// INSIDE
const getjokeList = (
  { params }: {params: Params}
) => async (dispatch: AppDispatch) => {
  const response = await axios.get(`${API_BASE_URL}/jokes`, {
    params: filter(params)
  }).catch(() => ({ data: null }))

  const { data } = response
  dispatch(slice.actions.getjokeList({ data }))
}

// OUTSIDE
export const getjokeListRequest = (
  { params }: {params: Params}
) => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.getjokeListRequest())
  dispatch(getjokeList({ params }))
}

export const { reducer } = slice
export default slice
