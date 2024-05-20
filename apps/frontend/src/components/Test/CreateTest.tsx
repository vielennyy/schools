import { Box, Button, Container, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { TestQuestion } from "../../TypesAndInterfaces"

export const CreateTest = () => {
    const [questions, setQuestions] = useState<number[]>([1]);
    const [editMode, setEditMode] = useState<boolean>(true)
    const [quizId, setQuizId] = useState<string>('1f620ffb-a354-41a9-91d4-2fbd53a2eeae')

    const handleClick = () => {
        setQuestions([...questions, questions.length + 1]);
    };

    const [title, setTitle] = useState('')

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const reqBody = {title: title}
        console.log(reqBody)
        const baseUrl = import.meta.env.VITE_BACKEND_API_URL;
        const response = await fetch(`${baseUrl}/quiz`, {
            method: "POST",
            credentials: "include",
            headers: {
                credentials: "include",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqBody),
            });

    console.log(response);

    if (response.ok) {
      setEditMode(false)
    } 
  };
    // }

    return (
        <Container sx={{ margin: '25px auto', maxWidth: '1200px' }}>
            <Typography variant='h2' color='black' sx={{ margin: '25px 0' }}>Створення тесту</Typography>
            {editMode ?
                <form onSubmit={handleSubmit}>
                <Typography variant='h3' color='black'>Назва тесту</Typography>
                <TextField
                            onChange={handleFormChange}
                            name='title'
                            id="outlined-multiline-flexible"
                            variant='outlined'
                            multiline
                            required
                            sx={{ margin: '25px 0',
                                width: '100%'
                            }}
                />
                <Button type='submit'>Створити</Button>
                </form>
                :
                <Typography variant='h3' color='black'>{title}</Typography>
            }
            
            {questions.map((question) => (
                <CreateQuestion counter={question} quizId={quizId} />
            ))}
            
            <Box sx={{gisplay: 'flex', }}>
                <Button onClick={handleClick} sx={{ width: '200px', backgroundColor: '#423A34', color: 'white', margin: '10px auto' }}>
                    Додати запитання
                </Button>
                <Button sx={{ width: '200px', backgroundColor: '#423A34', color: 'white', margin: '10px 20px' }}>Зберегти тест</Button>
            </Box>
            
        </Container>
    );
}

interface QuizItem {
    counter: number,
    quizId: string
}


export const CreateQuestion = (props:QuizItem) => {
    const counter = props.counter
    const quizID = props.quizId
    const [answArr, setAnswArr] = useState<string[]>([])
    const [answerOptionsArr, setAnswerOptionsArr] = useState<string[]>([])
    console.log(props)
    const [error, setError] = useState<string|null>(null)
    const [formState, setFormState] = useState<TestQuestion>({
        text: '',
        answer: '',
        answerOptions: '',
        questionType: '',
        quizId: '',
        score: '',
    });

    const [editMode, setEditMode] = useState<boolean>(true)

    const questionTypes = [
        'вибір однієї правильної відповіді',
        'вибір декількох відповідей',
        'власна відповідь',
    ];

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    const handleSelect = (event: SelectChangeEvent<string>) => {
        setFormState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleAddOption = () => {
        setAnswerOptionsArr([...answerOptionsArr, ''])
    };

    const handleRemoveOption = (index: number) => {
        const newOptions = [...answerOptionsArr];
        newOptions.splice(index, 1);
        setAnswerOptionsArr(newOptions);
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...answerOptionsArr];
        newOptions[index] = value;
        setAnswerOptionsArr(newOptions);
    };

    const handleAddAnswer = () => {
        setAnswArr([...answArr, '']);
    };

    const handleRemoveAnswer = (index: number) => {
        const newAnswers = [...answArr];
        newAnswers.splice(index, 1);
        setAnswArr(newAnswers);
    };

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answArr];
        newAnswers[index] = value;
        setAnswArr(newAnswers);
    };

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const baseUrl = import.meta.env.VITE_BACKEND_API_URL;

        const optionsToStr = answerOptionsArr.join('$')
        const answToStr = (answArr.length === 0) ? formState.answer : answArr.join('$')
        console.log(optionsToStr, answToStr)

        const { text, questionType, score, ...rest } = formState;

        const reqBody: TestQuestion = {
            text: text,
            answer: answToStr,
            answerOptions: optionsToStr,
            questionType: (questionType === 'вибір однієї правильної відповіді') ? 'SINGLE' : (questionType === 'вибір декількох відповідей') ? 'MULTIPLE' : 'FREE_ANSWER',
            quizId: quizID,
            score: score,
        }

        const response = await fetch(`${baseUrl}/quiz/question`, {
            method: "POST",
            credentials: "include",
            headers: {
                credentials: "include",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqBody),
            });

        console.log(response);

        if (response.ok) {
        setEditMode(false)
        setError(null)
        } else {
            setError(response.statusText)
        };
        
        console.log(reqBody)
    }

    return (
        <>
        
        <Container sx={{display: 'flex', flexDirection: 'row', maxWidth: '1200px', justifyContent: 'space-between', border: '1px solid gray', margin: '20px 0'}}>
            <Box sx={{backgroundColor: '#423A34', padding: '10px', color:'white', width: '50px', height: '50px', textAlign: 'center'}}>
                <Typography variant='h4' color='white'>{counter}.</Typography>
            </Box>

            <Box sx={{width: '1000px'}}>
                {editMode ? 
            <form onSubmit={handleSubmit}>
                <Typography variant='h4'>Питання тесту</Typography>
                <TextField
                    onChange={handleFormChange}
                    name='text'
                    id="outlined-multiline-flexible"
                    variant='outlined'
                    multiline
                    required
                    sx={{ margin: '25px 0',
                        width: '100%'
                     }}
                />
                <Typography variant='h4'>Вид тесту</Typography>
                <Select
                    value={formState.questionType}
                    name='questionType'
                    sx={{ margin: '25px 0',
                        width: '100%'
                    }}
                    onChange={handleSelect}
                >
                    {questionTypes.map((question) => (
                        <MenuItem key={question} value={question}>
                            {question}
                        </MenuItem>
                    ))}
                </Select>
                {(formState.questionType === 'вибір однієї правильної відповіді' || formState.questionType === 'вибір декількох відповідей') && (
                    <>
                        <Typography variant='h4'>Варіанти відповіді</Typography>
                        {answerOptionsArr.map((option, index) => (
                            <Box key={index} sx={{display: 'flex', alignItems: 'center'}}>
                                <TextField
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    name={`option-${index}`}
                                    id={`option-${index}`}
                                    label={`Варіант відповіді ${index + 1}`}
                                    variant='outlined'
                                    required
                                    sx={{ margin: '25px 0', width: '100%' }}
                                />
                                <Button sx={{borderRadius: '0px', width: '10px', heigth: '10px', backgroundColor: '#423A34', color: 'white', padding: '15px 0'}} onClick={() => handleRemoveOption(index)}>х</Button>
                            </Box>
                        ))}
                        <Button sx={{backgroundColor: '#423A34', color: 'white', margin: '25px 0'}} onClick={handleAddOption}>Додати варіант відповіді</Button>
                    </>
                )}
                <Typography variant='h4'>
                    Правильна відповідь
                </Typography>
                {(formState.questionType === 'вибір декількох відповідей' ? 
                    <>
                    {answArr.map((answer, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                value={answer}
                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                                name={`answer-${index}`}
                                id={`answer-${index}`}
                                label={`Правильна відповідь ${index + 1}`}
                                variant='outlined'
                                required
                                sx={{ margin: '25px 0', width: '100%' }}
                            />
                            <Button sx={{ borderRadius: '0px', width: '10px', height: '10px', backgroundColor: '#423A34', color: 'white', padding: '28px 0' }} onClick={() => handleRemoveAnswer(index)}>х</Button>
                        </Box>
                    ))}
                        <Button sx={{ backgroundColor: '#423A34', color: 'white', margin: '25px 0' }} onClick={handleAddAnswer}>Додати правильну відповідь</Button>

                    </>
                    :
                    <TextField
                                value={formState.answer}
                                onChange={handleFormChange}
                                name={`answer`}
                                id={`answer`}
                                variant='outlined'
                                required
                                sx={{ margin: '25px 0', width: '100%' }}
                            />
                    )}
                
                <Typography variant='h4'>Кількість балів</Typography>
                <TextField
                    name='score'
                    id='outlined-basic'
                    variant='outlined'
                    onChange={handleFormChange}
                    required
                    sx={{ margin: '25px 0', width: '100%' }}
                />
                <Button type='submit' sx={{width: '100%', backgroundColor: '#423A34', color:'white', borderRadius: '0px'}}>Зберегти</Button>
                {error && <Typography sx={{padding: '10px 0'}}>{error}</Typography>}
            </form> 
            :
            <Typography variant='h3' color='black' sx={{display: 'flex', height: '100%', alignItems: 'center', padding: '10px 20px'}}>{formState.text}</Typography>
            }
            </Box>
            
        </Container>
        
        </>
    );
};

