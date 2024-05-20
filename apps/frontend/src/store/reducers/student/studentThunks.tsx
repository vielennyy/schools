import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCurrentStudents } from "./studentSlice";

export const getStudentsByClassId = createAsyncThunk('students', async (classId: string, { dispatch }) => {
        const baseUrl =  import.meta.env.VITE_BACKEND_API_URL
        const response = await fetch(`${baseUrl}/student/all-by-class/${classId}`, {
          method: "GET",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const res = await response.json();
  
        if (response.ok) {
            dispatch(setCurrentStudents([...res]));
        }
      });