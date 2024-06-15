import { Box, Button, Typography } from "@mui/material"
import { CreateSubject } from "./CreateSubject"
import { useEffect, useState, } from "react";
import { GetSubject } from "../../TypesAndInterfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getSchoolData } from "../../store/reducers/school/schoolThunks";
import { getTeacherSubjectData } from "../../store/reducers/subjects/subjectThunks";
import { getClassesData } from "../../store/reducers/classes/classesThunks";
import { useNavigate } from "react-router-dom";

export const Subjects = () => {
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL;

    const dispatch = useAppDispatch();
    const school = useAppSelector((state) => state.school.data) 
    const subjects = useAppSelector((state) => state.subject.data);
    const classes = useAppSelector((state) => state.class.data);
    // console.log(classes)
    // console.log(school?.id)


    useEffect(() => {
        dispatch(getSchoolData())
        dispatch(getTeacherSubjectData());
        if (school) dispatch(getClassesData(school.id));
    }, [dispatch]);

    // console.log(subjects)

    return (
        <Box sx={{width: '1000px'}}>
        {/* <Empty/> */}
        <CreateSubject subjectLength={subjects?.length}/>
        
        {subjects?.map((subject:GetSubject) => <SubjectItem subject={subject}/>)}
        </Box>
        
    )
}

const SubjectItem = ({subject}) => {

    const dispatch = useAppDispatch();
    const school = useAppSelector((state) => state.school.data) 
    const classes = useAppSelector((state) => state.class.data);

    const form = classes.find(obj => obj.id === subject.classId)
    // console.log(school, classes, form)



    useEffect(() => {
        dispatch(getSchoolData())
        if (school) dispatch(getClassesData(school.id));
    }, [dispatch]);

    // console.log(subject)

    const navigate = useNavigate()

    const handleRedirect = () => {
        navigate(`/subject/${subject.id}`)
    }

    return (
        <>
        <Box onClick={handleRedirect} sx={{borderRadius: '20px', border: '1px solid gray', padding: '30px', margin: '20px', width: '100%'}}>
            <Typography variant='h3' color='black'>{subject.title}</Typography>
            <Typography>{form?.title}</Typography>
        </Box>
        </>
    )
}

