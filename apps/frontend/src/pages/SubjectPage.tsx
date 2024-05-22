import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getSubjectData } from "../store/reducers/subjects/subjectThunks";
import { ShowTest } from "../components/Test/ShowTest";

export const SubjectPage = () => {
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL;

    const subjectId:string = useParams<{ subject_id?: string }>().subjectId;
    const dispatch = useAppDispatch();
    const subjects = useAppSelector((state) => state.subject.data);
    const [quizes, setQuizes] = useState([])
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        dispatch(getSubjectData());
    }, [dispatch]);

    console.log(subjects)

    const subject = subjects.find(obj => obj.id === subjectId);

    useEffect(()=> {
        const fetchData = async () => {
        try {
            const response = await fetch(`${baseUrl}/quiz/by-subject/${subjectId}`, {
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
        const navigate = useNavigate();

        const handleClick = () => {
            navigate(`/create-test/${subjectId}`)
        }

        console.log(quizes)

    return(
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '30px 0'}}>
        <Typography variant="h2" color='black'>{subject?.title}</Typography>
        <Typography variant="h3" color='black'>{subject?.class || 'class'}</Typography>
        <Box sx={{width: '1000px', padding: '20px 0'}}>
            <Typography variant="h3" color='black'>Тести</Typography>
            <Button onClick={handleClick} sx={{ width: '200px', backgroundColor: '#423A34', color: 'white', margin: '20px auto' }}>
                    + Створити тест
                </Button>
            {quizes.length === 0 ?
                <Typography>Ви ще не публікували тести</Typography>
            :
                quizes.map((quiz) => <ShowTest quiz={quiz}/>)
            }
            <Typography variant="h3" color='black' sx={{marginTop: '30px'}}>Завдання</Typography>
            <Button onClick={handleClick} sx={{ width: '200px', backgroundColor: '#423A34', color: 'white', margin: '20px auto' }}>
                    + Створити завдання
            </Button>

        </Box>
        </Box>
    )
}