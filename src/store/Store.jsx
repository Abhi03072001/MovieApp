import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './Reducers/movieSlice'
import tvReducer from './Reducers/TvSlice'
import personReducer from './Reducers/PersonSlice'

export const store = configureStore({
  reducer: {
    movie:movieReducer,
    tv: tvReducer,
    person: personReducer,
  },
})