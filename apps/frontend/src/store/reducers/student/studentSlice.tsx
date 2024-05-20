import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Student } from '../../../TypesAndInterfaces'

const initialState: { data: Student[] | [] } = {
  data: [],
};

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setCurrentStudents: (state, action:PayloadAction<Student[] | []>)  => {
      state.data = action.payload
    },
  }
})

export const { setCurrentStudents } = studentSlice.actions

export default studentSlice.reducer