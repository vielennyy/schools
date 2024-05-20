import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { School } from '../../../TypesAndInterfaces'

const initialState: { data: School | null } = {
  data: null,
};

export const userSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    setCurrentSchool: (state, action:PayloadAction<School| null>)  => {
      state.data = action.payload
    },
  }
})

export const { setCurrentSchool } = userSlice.actions

export default userSlice.reducer