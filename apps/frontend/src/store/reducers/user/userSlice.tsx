import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../../../TypesAndInterfaces'

const initialState: { data: User | null } = {
  data: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action:PayloadAction<User| null>)  => {
      state.data = action.payload
    },
  }
})

export const { setCurrentUser } = userSlice.actions

export default userSlice.reducer