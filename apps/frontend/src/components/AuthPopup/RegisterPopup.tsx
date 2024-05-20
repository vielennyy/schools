import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { UserRegisterValues } from "../../TypesAndInterfaces";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";

interface RegisterPopupProps {
  backToLoginPopup: () => void;
}

export const RegisterPopup = ({ backToLoginPopup }: RegisterPopupProps) => {
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
  const [isSuccessReg, setIsSuccessReg] = useState<boolean>(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [iamDirector, setIamDirector] = useState(false);

  const [formState, setFormState] = useState<UserRegisterValues>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIamDirector(checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL;
    const link =
      baseUrl + (iamDirector ? "/auth/signup/director" : "/auth/signup");

    event.preventDefault();
    const response = await fetch(link, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });

    console.log(response);

    if (response.ok) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        backToLoginPopup();
      }, 1000);
    } else {
      setError(true);
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

    console.log(event.target.value);
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
            fullWidth
            error={!isValidEmail}
            id="email"
            name="email"
            label="Електронна пошта"
            onChange={handleFormChange}
            sx={{ marginTop: "25px" }}
          />

          <OutlinedInput
            id="OutlinedInput"
            name="OutlinedInput"
            type={showPassword ? "text" : "password"}
            sx={{ marginTop: "25px",  width: "100%"}}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            id="password"
            name="password"
            label="Password"
            onChange={handleFormChange}
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
          <FormControlLabel
            control={<Checkbox checked={iamDirector} onChange={handleChange} />}
            label="Я директор"
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
      </Box>
    </Box>
  );
};
