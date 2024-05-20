import { Box, Button, TextField } from "@mui/material";
import { UserLogInValues } from "../../TypesAndInterfaces";
import { useState } from "react";

export const LoginPopup = () => {
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);

  const [formState, setFormState] = useState<UserLogInValues>({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL;
    const response = await fetch(`${baseUrl}/auth/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        credentials: "include",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });

    console.log(response);

    if (response.ok) {
      window.location.reload();
    } 
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "email") {
      setIsValidEmail(/@/.test(event.target.value));
    }

    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });

    console.log("Input!");
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: 2,
          borderRadius: "50px",
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
            error={!isValidEmail}
            fullWidth
            id="email"
            name="email"
            label="Електронна пошта"
            sx={{ marginTop: "25px" }}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Пароль"
            type={"password"}
            sx={{ marginTop: "25px" }}
            onChange={handleFormChange}
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
            Увійти
          </Button>
        </form>
      </Box>
    </Box>
  );
};
