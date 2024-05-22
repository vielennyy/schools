import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GetSubject } from '../../../TypesAndInterfaces'

const initialState: { data: GetSubject[] } = {
  data: [],
};

export const userSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    setCurrentSubject: (state, action:PayloadAction<GetSubject[]>)  => {
      state.data = action.payload
    },
  }
})

export const { setCurrentSubject } = userSlice.actions

export default userSlice.reducer