import { Button, Container, MenuItem, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { ICreateSchool } from "../TypesAndInterfaces";
import { useNavigate } from "react-router-dom";

  
  

export const CreateSchool = () => {

  const districts = [
    'Вінницька',
    'Волинська',
    'Дніпропетровська',
    'Донецька',
    'Житомирська',
    'Закарпатська',
    'Запорізька',
    'Івано-Франківська',
    'Київська',
    'Кіровоградська',
    'Луганська',
    'Львівська',
    'Миколаївська',
    'Одеська',
    'Полтавська',
    'Рівненська',
    'Сумська',
    'Тернопільська',
    'Харківська',
    'Херсонська',
    'Хмельницька',
    'Черкаська',
    'Чернівецька',
    'Чернігівська',
    'АР Крим'
  ];

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL;
    try {
    const schoolData = { ...formState};
  
      const response = await fetch(`${baseUrl}/school`, {
        method: "POST",
        body: JSON.stringify(schoolData),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => navigate('/user'));
  
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [formState, setFormState] = useState<ICreateSchool>({
    title: '',
    description: '',
    district: '',
    city: '',
    index: '',
    phone: '',
    email: '',
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
      });
  }

  return(
    <>
      <Container sx={{ width: '70%', display: 'flex', flexDirection: 'column', margin: '50px auto'}}> 
        <Typography variant='h1' color='black' textAlign={'center'} margin='50px'>Реєстрація школи</Typography>
        <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmit(event)} style={{ maxWidth: '1200px', display: 'flex', flexDirection: 'column'}}>
          <TextField onChange={handleFormChange} name='title' id="outlined-basic" label="Назва навчального закладу" variant="outlined" required sx={{margin:'25px 0'}}/>
          <TextField onChange={handleFormChange} name='description' id="outlined-multiline-flexible" label="Опис" variant="outlined" required multiline sx={{margin:'25px 0'}}/>
          <TextField
            select
            value={formState.district}
            name='district'
            label="Область"
            onChange={handleFormChange}
          >
                      {districts.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
          </TextField>
          <TextField onChange={handleFormChange} name='city' id="outlined-basic" label="Населений пункт" variant="outlined" required sx={{margin:'25px 0'}}/>
          <TextField onChange={handleFormChange} name='index' id="outlined-basic" label="Індекс" variant="outlined" required sx={{margin:'25px 0'}}/>
          <TextField onChange={handleFormChange} name='phone' id="outlined-basic" label="Телефон контактної особи" variant="outlined" required sx={{margin:'25px 0'}}/>
          <TextField onChange={handleFormChange} name='email' id="outlined-basic" label="Електрона адреса школи" variant="outlined" required sx={{margin:'25px 0'}}/>
          <Button variant="contained" type="submit" sx={{margin:'25px 0'}}>Зареєструвати</Button>        
        </form>
      </Container>
    </>
  )
}