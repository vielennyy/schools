import { Box, Typography, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import Close from "../../assets/img/Close icon.svg";

export const CreateClass = () => {
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
  const [classTitle, setClassTitle] = useState<string>("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCreate = async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL;
    await fetch(`${baseUrl}/class`, {
      method: "POST",
      body: JSON.stringify({ title: classTitle }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => handleClose());
  };

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
        <Typography variant="h3" sx={{ color: "#000", textAlign: "center" }}>
          У Вас поки що немає класів
        </Typography>
        <Typography align="center" sx={{ padding: "20px 0" }}>
          Ви можете створити клас,якщо його ще немає в системі та приєднати до
          нього учнів. Якщо клас уже створено, ви можете додати свій предмет до
          у розділі "Предмети" для подальшої публікації завдань та тестів
        </Typography>
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
          <Typography>Створити клас</Typography>
        </Button>
      </Box>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              id="modal-modal-title"
              variant="h3"
              component="h2"
              sx={{ color: "black" }}
            >
              Створити клас
            </Typography>
            <Button onClick={handleClose}>
              <img src={Close} alt="" width="20px" />
            </Button>
          </Box>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Назва класу
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            onChange={(e) => {
              setClassTitle(e.target.value);
            }}
            size="small"
          ></TextField>
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
      </Modal>
    </>
  );
};
