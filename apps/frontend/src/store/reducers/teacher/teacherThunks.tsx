import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCurrentTeachers } from "./teacherSlice";

export const getTeachersBySchoolId = createAsyncThunk('user', async (id: string, { dispatch }) => {
    try {
        const baseUrl =  import.meta.env.VITE_BACKEND_API_URL
        const response = await fetch(`${baseUrl}/school/teachers/by-school/${id}`, {
          method: "GET",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const res = await response.json();
        
        if (response.ok) {
            dispatch(setCurrentTeachers([...res]));
        }
      } catch (error) {
        console.log('Fetch error:', error);
      }
  });

  