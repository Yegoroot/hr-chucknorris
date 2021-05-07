import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  TypedUseSelectorHook
} from 'react-redux'
import { RootState, AppDispatch } from './index'

export const useDispatch = () => useReduxDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
