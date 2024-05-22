import { useEffect, useState } from "react";
import { AnswerTest } from "../../TypesAndInterfaces";
import { Typography } from "@mui/material";

export const ShowTest = ({quiz}:any) => {

    const baseUrl = import.meta.env.VITE_BACKEND_API_URL;
    const [test, setTest] = useState<AnswerTest>()

    const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});

    const handleAnswerChange = (questionId: string, answer: string | string[]) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/quiz/for-student/${quiz.id}`, {
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
                setTest(data)
                // console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [baseUrl]);

    console.log(quiz)
    return(
        <>
            <Typography sx={{cursor:'pointer'}}>{quiz.title}</Typography>
        </>
    )
}