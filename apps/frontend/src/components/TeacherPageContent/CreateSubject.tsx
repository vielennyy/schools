import { Box, Typography, Button, Modal, TextField, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import Close from "../../assets/img/Close icon.svg";
import { GetClass } from "../../TypesAndInterfaces";
import { useAppSelector } from "../../hooks";

interface Subject {
  title: string,
  classId: string,
}

export const CreateSubject = ({subjectLength}) => {
  const baseUrl = import.meta.env.VITE_BACKEND_API_URL;
  const user = useAppSelector((state) => state.user.data);

  const style = {
    borderRadius: "16px",
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const [classes, setClasses] = useState<GetClass[]>([])
  const [formState, setFormState] = useState<Subject>({
    title: '',
    classId: '',
  })

  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(()=> {
    const fetchData = async () => {
    try {
        const response = await fetch(`${baseUrl}/class/by-school${user?.schoolId}`, {
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
        setClasses(data)
        // console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }}
    fetchData();
    }, [baseUrl]);


  
  const handleCreate = async () => {
    console.log(formState)
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL;
    const response = await fetch(`${baseUrl}/subject`, {
      method: "POST",
      body: JSON.stringify({title: formState.title}),
      // JSON.stringify(formState),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      if(response.ok) {
      handleClose()
      window.location.reload()
    }
    console.log(response)

  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
      });
  }

  return (
    <>
      <Box
        sx={{
          maxWidth: 800,
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        { subjectLength === 0 
        && 
          <Box sx={{
            width: "100%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <Typography variant="h3" sx={{ color: "#000", textAlign: "center" }}>
              Жодного предмету поки що не створено
            </Typography>
            <Typography align="center" sx={{ padding: "20px 0" }}>
              Ви можете створити предмет,якщо його ще немає в системі та приєднати до
              нього клас учнів для подальшої публікації завдань та тестів
            </Typography>
          </Box>
        }
        
        <Button
          onClick={handleOpen}
          sx={{
            maxWidth: "210px",
            alignSelf: "center",
            backgroundColor: "#423A34",
            borderRadius: "50px",
            color: "white",
            padding: "8px 30px",
            textTransform: "none",
          }}
        >
          <Typography> + Додати предмет</Typography>
        </Button>
        </Box>

        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {classes.length === 0 ?
              <Typography>У цій школі не створено ще жодного класу. Спробуйте створити предмет пізніше</Typography>
              :
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    id="modal-modal-title"
                    variant="h3"
                    component="h2"
                    sx={{ color: "black" }}
                  >
                    Додати предмет
                  </Typography>
                  <Button onClick={handleClose}>
                    <img src={Close} alt="" width="20px" />
                  </Button>
                </Box>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Назва предмету
                </Typography>
              
                <TextField
                  sx={{ width: "100%" }}
                  onChange={handleFormChange}
                  size="small"
                  name='title'
                  />
                <TextField
                select
                value={formState.classId}
                name='classId'
                label="Клас"
                onChange={handleFormChange}
                sx={{ width: "100%", margin: '20px 0' }}

              >
                          {classes.map((cls) => (
                <MenuItem value={cls.id}>
                  {cls.title}
                </MenuItem>
              ))}
              </TextField>

                <Box
                  sx={{
                    display: "flex",
                    paddingTop: 2,
                    flexDirection: "row-reverse",
                  }}
                >
                  <Button variant="outlined" onClick={handleClose}>
                    Скасувати
                  </Button>
                  <Button
                    onClick={handleCreate}
                    sx={{ marginRight: 2 }}
                    variant="contained"
                  >
                    Зберегти
                  </Button>
                </Box>
            </Box>
            }
          </Box>
        </Modal>
    </>
  );
};
