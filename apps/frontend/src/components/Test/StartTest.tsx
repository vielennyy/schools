import { useEffect, useState } from 'react';
import { AnswerTest, AnswerQuestion } from '../../TypesAndInterfaces';
import { Box, Button, Checkbox, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export const StartTest = () => {
    const {testId} = useParams();

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
                const response = await fetch(`${baseUrl}/quiz/for-student/${testId}`, {
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
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [baseUrl]);

    // console.log(test)

    const handleSubmit = () => {
        event?.preventDefault()
        // const reqBody = {
        //     quizId: test?.id,
        //     answers: answers,
        // }
        console.log(answers)
        test?.questions.map(async (item) => {
            const reqBody = {quizId: testId, questionId: item.id, response: answers[item.id]};
            console.log(reqBody)
            try {
            const response = await fetch(`${baseUrl}/quiz/question/answer`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqBody),
            });
            if (response.ok) {
                console.log('Відповіді відправлено успішно:', response);
                // console.log()
              } 
        } catch (error) {
            console.error('Помилка при відправці відповідей:', error);
        }
        })
        // try {
        //     const response = await fetch(`${baseUrl}/quiz/submit`, {
        //         method: "GET",
        //         credentials: "include",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(reqBody),
        //     });
        //     if (response.ok) {
        //         console.log('Відповіді відправлено успішно:', response);
        //       } 
        // } catch (error) {
        //     console.error('Помилка при відправці відповідей:', error);
        // }
    };

    return (
        <Box sx={{padding: '50px', width: '1200px', margin: '0px auto'}}>
            <Typography variant='h2' color='black'>{test?.title}</Typography>
            {test?.questions.map((question, index) => <TestItem question={question} index={index} onAnswerChange={handleAnswerChange}/>)}
            <Button onClick={handleSubmit} variant="contained" color="primary">Відправити відповіді</Button>
        </Box>
    );
};
interface TestItemProps {
    question: AnswerQuestion,
    index: number,
    onAnswerChange: (questionId: string, answer: string | string[]) => void;
}
const TestItem = ({ question, index, onAnswerChange }: TestItemProps) => {
    
    const renderQuestionType = () => {
        switch (question.questionType) {
            case 'SINGLE':
                return <SingleChoiceQuestion question={question} index={index} onAnswerChange={onAnswerChange}/>;
            case 'MULTIPLE':
                return <MultipleChoiceQuestion question={question}  index={index} onAnswerChange={onAnswerChange}/>;
            case 'FREE_ANSWER':
                return <OpenEndedQuestion question={question} index={index} onAnswerChange={onAnswerChange} />;
            default:
                return null;
        }
    };
    return(
        <Box sx={{padding: '30px', margin: '20px 0', border: '2px solid #423a34'}}>
            <Typography variant='h3' color='black' fontWeight='500' sx={{marginBottom: '20px'}}>{`${index+1}. ${question.text}`}</Typography>
            <Box>
                {renderQuestionType()}
            </Box>

        </Box>
    )
}

const SingleChoiceQuestion = ({ question, onAnswerChange }: TestItemProps) => {
    const [selectedOption, setSelectedOption] = useState('');

    const options = question.answerOptions.split('$')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedOption(value);
        onAnswerChange(question.id, value);
    };

    return (
        <RadioGroup value={selectedOption} onChange={handleChange}>
            {options.map((option, index) => (
                <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
            ))}
        </RadioGroup>
    );
};

const MultipleChoiceQuestion = ({ question, onAnswerChange }: TestItemProps) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const options = question.answerOptions.split('$');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedOptions((prev) =>
            prev.includes(value) ? prev.filter((option) => option !== value) : [...prev, value]
        );
    };

    useEffect(() => {
        onAnswerChange(question.id, selectedOptions.join('$'));
    }, [selectedOptions, question.id, onAnswerChange]);

    return (
        <Box display="flex" flexDirection="column">
            {options.map((option, index) => (
                <FormControlLabel
                    key={index}
                    control={<Checkbox checked={selectedOptions.includes(option)} onChange={handleChange} value={option} />}
                    label={option}
                />
            ))}
        </Box>
    );
};


const OpenEndedQuestion = ({ question, onAnswerChange }: TestItemProps) => {
    const [answer, setAnswer] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setAnswer(value);
        onAnswerChange(question.id, value);
    };

    return (
        <TextField
            label="Ваша відповідь"
            variant="outlined"
            fullWidth
            multiline
            value={answer}
            onChange={handleChange}
            sx={{ marginTop: 2 }}
        />
    );
};
