import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCurrentSchool } from "./schoolSlice";

export const getSchoolData = createAsyncThunk('user', async (_void, { dispatch }) => {
    try {
        const baseUrl =  import.meta.env.VITE_BACKEND_API_URL
        const response = await fetch(`${baseUrl}/school`, {
          method: "GET",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const res = await response.json();
  
        if (response.ok) {
            dispatch(setCurrentSchool({...res}));
        }
        else{
           dispatch(setCurrentSchool(null));
        }
      } catch (error) {
        dispatch(setCurrentSchool(null));
        console.log('Fetch error:', error);
      }
  });
  