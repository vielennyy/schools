import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GetQuiz } from '../../../TypesAndInterfaces'

const initialState: { data: GetQuiz[] } = {
  data: [],
};

export const userSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setCurrentQuizes: (state, action:PayloadAction<GetQuiz[]>)  => {
      state.data = action.payload
    },
  }
})

export const { setCurrentQuizes } = userSlice.actions

export default userSlice.reducer