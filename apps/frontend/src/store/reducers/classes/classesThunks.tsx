import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCurrentClasses } from "./classesSlice";

export const getClassesData = createAsyncThunk('class', async (schoolId: string, { dispatch }) => {
    try {
        const baseUrl =  import.meta.env.VITE_BACKEND_API_URL
        const response = await fetch(`${baseUrl}/class/by-school/${schoolId}`, {
          method: "GET",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const res = await response.json();
  
        if (response.ok) {
            dispatch(setCurrentClasses([...res]));
        }
        else{
           dispatch(setCurrentClasses([]));
        }
      } catch (error) {
        dispatch(setCurrentClasses([]));
        console.log('Fetch error:', error);
      }
  });
  