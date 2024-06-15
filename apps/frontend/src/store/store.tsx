import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/user/userSlice'
import schoolSlice from './reducers/school/schoolSlice'
import teacherSlice from './reducers/teacher/teacherSlice'
import studentSlice from './reducers/student/studentSlice'
import subjectSlice from './reducers/subjects/subjectSlice'
import classesSlice from './reducers/classes/classesSlice'
import quizSlice from './reducers/quiz/quizSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    school: schoolSlice,
    teachers: teacherSlice,
    students: studentSlice,
    subject: subjectSlice,
    class: classesSlice,
    quiz: quizSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch