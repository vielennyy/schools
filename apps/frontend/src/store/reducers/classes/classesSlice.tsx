import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GetClass } from '../../../TypesAndInterfaces'

const initialState: { data: GetClass[] } = {
  data: [],
};

export const userSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    setCurrentClasses: (state, action:PayloadAction<GetClass[]>)  => {
      state.data = action.payload
    },
  }
})

export const { setCurrentClasses } = userSlice.actions

export default userSlice.reducer