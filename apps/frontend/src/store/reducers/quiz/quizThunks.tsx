import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCurrentQuizes } from "./quizSlice";


export const getStudentQuiz = createAsyncThunk('user', async (id: string, { dispatch }) => {
    try {
        const baseUrl =  import.meta.env.VITE_BACKEND_API_URL
        const response = await fetch(`${baseUrl}/quiz/by-subject/${id}`, {
          method: "GET",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const res = await response.json();
  
        if (response.ok) {
            dispatch(setCurrentQuizes([...res]));
        }
        else{
           dispatch(setCurrentQuizes([]));
        }
      } catch (error) {
        dispatch(setCurrentQuizes([]));
        console.log('Fetch error:', error);
      }
  });
  
  