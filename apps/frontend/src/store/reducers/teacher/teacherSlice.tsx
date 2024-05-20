import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../../../TypesAndInterfaces'

const initialState: { data: User[] | [] } = {
  data: [],
};

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setCurrentTeachers: (state, action:PayloadAction<User[]| []>)  => {
      state.data = action.payload
    },
  }
})

export const { setCurrentTeachers } = teacherSlice.actions

export default teacherSlice.reducer