import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCurrentSubject } from "./subjectSlice";

export const getSubjectData = createAsyncThunk('user', async (_void, { dispatch }) => {
    try {
        const baseUrl =  import.meta.env.VITE_BACKEND_API_URL
        const response = await fetch(`${baseUrl}/subject`, {
          method: "GET",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const res = await response.json();
  
        if (response.ok) {
            dispatch(setCurrentSubject([...res]));
        }
        else{
           dispatch(setCurrentSubject([]));
        }
      } catch (error) {
        dispatch(setCurrentSubject([]));
        console.log('Fetch error:', error);
      }
  });
  