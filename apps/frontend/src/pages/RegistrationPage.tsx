import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ActivateTeacher } from "../TypesAndInterfaces";
import { Navigate, useLocation } from "react-router-dom";

export const RegistrationPage = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const location = useLocation();
  
  useEffect(()=> {
    const queryParams = new URLSearchParams(location.search);
    const value = queryParams.get("token");
    if (!value) {
      return;
    }    

    setFormState({ ...formState, verificationToken: value })
  }, [])

  const [formState, setFormState] = useState<ActivateTeacher>({
    password: "",
    firstName: "",
    lastName: "",
    verificationToken: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL;
    const response = await fetch(`${baseUrl}/user/activate/teacher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });

    console.log(response);

    if (response.ok) {
      setSuccess(true);
      setError(null);
    } else {
      setError(response.statusText);
    }
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });

    console.log("Input!");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: 2,
        borderRadius: "50px",
        maxWidth: "1200px",
        margin: "50px auto",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
          handleSubmit(event)
        }
      >
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Пароль"
          type={"password"}
          onChange={handleFormChange}
          sx={{ marginTop: "25px" }}
        />
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="Ім'я"
          onChange={handleFormChange}
          sx={{ marginTop: "25px" }}
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Прізвище"
          onChange={handleFormChange}
          sx={{ marginTop: "25px" }}
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{
            width: 200,
            height: 40,
            margin: "25px 0",
            borderRadius: "10px",
          }}
        >
          Зареєструватись
        </Button>
      </form>
      {success ? (
        <Navigate replace to="/user" />
      ) : (
        <Typography>{error}</Typography>
      )}
    </Box>
  );
};
