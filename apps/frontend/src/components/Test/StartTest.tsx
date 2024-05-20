import { useEffect, useState } from 'react';
import { Test, TestQuestion } from '../../TypesAndInterfaces';
import { Box, Checkbox, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';

export const StartTest = () => {
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL;
    const [test, setTest] = useState<Test>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/quiz/for-student/1f620ffb-a354-41a9-91d4-2fbd53a2eeae`, {
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
    console.log(test)
    return (
        <Box sx={{padding: '50px', width: '1200px', margin: '0px auto'}}>
            <Typography variant='h2' color='black'>{test?.title}</Typography>
            {test?.questions.map((question, index) => <TestItem question={question} index={index}/>)}
        </Box>
    );
};
interface TestItemProps {
    question: TestQuestion,
    index: number,
}
const TestItem = (props:TestItemProps) => {
    const number = props.index
    const question = props.question
    console.log(question)

    const renderQuestionType = () => {
        switch (question.questionType) {
            case 'SINGLE':
                return <SingleChoiceQuestion question={question} />;
            case 'MULTIPLE':
                return <MultipleChoiceQuestion question={question} />;
            // case 'FREE_ANSWER':
            //     return <OpenEndedQuestion question={question} />;
            default:
                return null;
        }
    };
    return(
        <Box sx={{padding: '30px', margin: '20px 0', border: '2px solid #423a34'}}>
            <Typography variant='h3' color='black' fontWeight='500' sx={{marginBottom: '20px'}}>{`${number+1}. ${question.text}`}</Typography>
            <Box>
                {renderQuestionType()}
            </Box>
        </Box>
    )
}

interface QuestionProps {
    question: TestQuestion
}

const SingleChoiceQuestion = (question:QuestionProps) => {
    const [selectedOption, setSelectedOption] = useState('');

    const options = question.question.answerOptions.split('$')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    return (
        <RadioGroup value={selectedOption} onChange={handleChange}>
            {options.map((option, index) => (
                <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
            ))}
        </RadioGroup>
    );
};

const MultipleChoiceQuestion = (question:QuestionProps) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const options = question.question.answerOptions.split('$')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedOptions((prev) =>
            prev.includes(value) ? prev.filter((option) => option !== value) : [...prev, value]
        );
    };

    return (
        <>
        <Box display="flex" flexDirection="column">
            {options.map((option, index) => (
                <FormControlLabel
                    key={index}
                    control={<Checkbox checked={selectedOptions.includes(option)} onChange={handleChange} value={option} />}
                    label={option}
                />
            ))}
        </Box>
            
        </>
    );
};

// const OpenEndedQuestion = (question:QuestionProps) => {
//     const [answer, setAnswer] = useState('');

//     const handleChange = (event) => {
//         setAnswer(event.target.value);
//     };

//     return (
//         <TextField
//             label="Ваша відповідь"
//             variant="outlined"
//             fullWidth
//             multiline
//             value={answer}
//             onChange={handleChange}
//             sx={{ marginTop: 2 }}
//         />
//     );
// };
