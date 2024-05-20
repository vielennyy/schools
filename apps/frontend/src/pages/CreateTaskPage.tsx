import { Button, Container, TextField, Typography, } from "@mui/material"
import styled from 'styled-components'


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


export const CreateTaskPage = () => {
    return (
        <Container sx={{ maxWidth: '1200px', display: 'flex', flexDirection: 'column', margin: '50px auto'}}> 
        <Typography variant='h4' textAlign={'center'} margin='50px'>Створення завдання</Typography>
            <form style={{ maxWidth: '1200px', display: 'flex', flexDirection: 'column'}}>
            <TextField id="outlined-basic" label="Тема" variant="outlined" required sx={{margin:'25px'}}/>
            <TextField id="outlined-multiline-flexible" label="Опис" variant="outlined" required multiline sx={{margin:'25px'}}/>
            <TextField id="outlined-basic" label="Посилання на відео" variant="outlined" sx={{margin:'25px'}}/>
            <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      sx={{maxWidth:'250px', margin:'25px auto'}}
    >
      Завантажити файл
      <VisuallyHiddenInput type="file" />
    </Button>    
    <Button variant="contained" sx={{margin:'25px'}}>Опублікувати</Button>        
            </form>
        </Container>
    )
}