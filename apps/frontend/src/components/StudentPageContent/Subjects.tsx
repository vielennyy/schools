import { Box, Tooltip, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FC, useEffect, useState } from "react";
import { getStudentSubjectData } from "../../store/reducers/subjects/subjectThunks";
import { GetQuiz, GetSubject } from "../../TypesAndInterfaces";
import { useNavigate } from "react-router-dom";


export const Subjects = () => {

    const dispatch = useAppDispatch();
    const subjects = useAppSelector((state) => state.subject.data);
    console.log(subjects)

    useEffect(() => {
        dispatch(getStudentSubjectData());
    }, [dispatch]);
    return (
        <>
        <Typography variant='h4'>Предмети</Typography>
        {subjects.map(subject => <Subject subject={subject}/>)}
        <Box/>
        </>
    )
}

interface SubjectProps {
    subject: GetSubject,
}

const Subject = ({ subject }: SubjectProps)  => {
    const navigate = useNavigate()

    console.log(subject)
    const [quizes, setQuizes] = useState<GetQuiz[]>([])
    console.log(quizes)
    const baseUrl =  import.meta.env.VITE_BACKEND_API_URL

    useEffect(()=> {
        const fetchData = async () => {
        try {
            const response = await fetch(`${baseUrl}/quiz/by-subject/${subject.id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            setQuizes(data)
            // console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }}
        fetchData();
        }, [baseUrl]);

        const handleTestStart = (quizId:string) => {
            console.log(this)
            navigate(`/test/start/${quizId}`)
        }
  
    return (
        <Box>
            <Typography>{subject.title}</Typography>
            {quizes.length ? <Typography>Тести</Typography> : null}
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                {quizes.map(quiz => <Tooltip title={quiz.title}>
                    <Box onClick={() => handleTestStart(quiz.id)} sx={{borderRadius: '50%', backgroundColor: 'green', width: '50px', height: '50px', margin: '5px', cursor: 'pointer'}}></Box>
                    </Tooltip>)}
            </Box>
        </Box>
    )
}