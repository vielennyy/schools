import { Box, Tooltip, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FC, useEffect, useState } from "react";
import { getStudentSubjectData } from "../../store/reducers/subjects/subjectThunks";
import { GetQuiz, GetSubject } from "../../TypesAndInterfaces";
import { useNavigate } from "react-router-dom";
import { getStudentQuiz } from "../../store/reducers/quiz/quizThunks";


export const Subjects = () => {

    const dispatch = useAppDispatch();
    const subjects = useAppSelector((state) => state.subject.data);
    // console.log(subjects)

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

interface QuizStatus {
    quizId: string;
    answered: boolean;
}

interface QuizScore {
    quizId: string;
    score: number; // або будь-який інший тип даних для оцінки
}

interface StudentQuizes {
    quizes: GetQuiz[];
    answered: QuizStatus[];
    score: QuizScore[];
}

const Subject = ({ subject }: SubjectProps) => {
    const navigate = useNavigate();
    const [studentQuizes, setStudentQuizes] = useState<StudentQuizes | null>(null);
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL;

    useEffect(() => {
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

                const quizes: GetQuiz[] = await response.json();

                // Отримання статусу для кожного квізу
                const statusPromises = quizes.map(async (quiz) => {
                    const statusResponse = await fetch(`${baseUrl}/quiz/answered/${quiz.id}`, {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (!statusResponse.ok) {
                        throw new Error(`HTTP error! status: ${statusResponse.status}`);
                    }

                    const statusData = await statusResponse.json();
                    return { quizId: quiz.id, answered: statusData };
                });

                // Отримання оцінок для кожного квізу
                const scorePromises = quizes.map(async (quiz) => {
                    const scoreResponse = await fetch(`${baseUrl}/quiz/quiz-score/${quiz.id}`, {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (!scoreResponse.ok) {
                        throw new Error(`HTTP error! status: ${scoreResponse.status}`);
                    }

                    const scoreData = await scoreResponse.json();
                    return { quizId: quiz.id, score: scoreData };
                });

                const answered = await Promise.all(statusPromises);
                const score = await Promise.all(scorePromises);

                setStudentQuizes({
                    quizes,
                    answered,
                    score,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [baseUrl, subject.id]);

    const handleTestStart = (quizId: string) => {
        navigate(`/test/start/${quizId}`);
    };

    return (
        <Box>
            <Typography>{subject.title}</Typography>
            {studentQuizes?.quizes.length ? <Typography>Тести</Typography> : null}
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                {studentQuizes?.quizes.map((quiz) => {
                    const status = studentQuizes.answered.find((status: QuizStatus) => status.quizId === quiz.id);
                    const score = studentQuizes.score.find((score: QuizScore) => score.quizId === quiz.id);
                    return (
                        <Tooltip title={`${quiz.title} - Score: ${score?.score}`} key={quiz.id}>
                            <Box
                                onClick={() => handleTestStart(quiz.id)}
                                sx={{
                                    borderRadius: '50%',
                                    backgroundColor: status?.answered ? 'gray' : 'green',
                                    width: '50px',
                                    height: '50px',
                                    margin: '5px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 'bold',
                                }}
                            >
                                {score?.score}
                            </Box>
                        </Tooltip>
                    );
                })}
            </Box>
        </Box>
    );
};