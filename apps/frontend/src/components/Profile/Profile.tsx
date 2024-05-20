import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { deleteUserData } from "../../store/reducers/user/userThunks";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ChangeEvent, useState } from "react";
import { setCurrentUser } from "../../store/reducers/user/userSlice";
import { UserAvatar } from "./UserAvatar";
import {PatchUser} from "../../TypesAndInterfaces";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const handleExit = async () => {
    dispatch(deleteUserData());
    navigate('/')

  };
  const user = useAppSelector((state) => state.user.data);
  console.log(user)

  const baseUrl = import.meta.env.VITE_BACKEND_API_URL;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userData, setUserData] = useState<PatchUser>({});

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile!);
    const response = await fetch(`${baseUrl}/file/upload`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }
    return await response.json();
  };

  const handleSubmit = async () => {
    try {
    let updatedUserData = { ...userData};

      let uploadedFileName = null;
      if (selectedFile) {
        const uploadResponse = await uploadFile();
        uploadedFileName = uploadResponse.name;
        updatedUserData = { ...userData, avatarKey: uploadedFileName };

      }
  
  
      const response = await fetch(`${baseUrl}/user`, {
        method: "PATCH",
        body: JSON.stringify(updatedUserData),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
  
      const updatedUser = await response.json();
      setCurrentUser(updatedUser);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setSelectedFile(file);
    }
  };

  return (
    <>
      {user && (
        <Container sx={{padding: '20px'}}>
          <Typography variant="h4">Профіль</Typography>
          <Box
            sx={{
              boxShadow: "0px 4px 15px rgba(3, 2, 2, 0.25)",
              borderRadius: "15px",
            }}
            maxWidth={800}
            border={"none"}
            margin={"20px 0"}
            display="flex"
            flexDirection={"column"}
            justifyContent={"space-between"}
            padding={"30px"}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <UserAvatar
                selectedFile={selectedFile}
                handleFileChange={handleFileChange}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "10px 50px",
                }}
              >
                <Typography>Прізвище</Typography>
                <Typography>Ім'я</Typography>
                <Typography>По батькові</Typography>
                <Typography>Телефон</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                  defaultValue={user.lastName}
                  size="small"
                ></TextField>
                <TextField
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                  defaultValue={user.firstName}
                  size="small"
                ></TextField>
                <TextField
                  onChange={(e) =>
                    setUserData({ ...userData, surname: e.target.value })
                  }
                  defaultValue={user.surname ?? ""}
                  size="small"
                ></TextField>
                <TextField
                  onChange={(e) =>
                    setUserData({ ...userData, phoneNumber: e.target.value })
                  }
                  defaultValue={user.phoneNumber ?? ""}
                  size="small"
                ></TextField>{" "}
              </Box>
            </Box>

            <Button
              onClick={handleSubmit}
              sx={{
                marginTop: "8px",
                maxWidth: "210px",
                alignSelf: "flex-end",
                backgroundColor: "#423A34",
                borderRadius: "50px",
                color: "white",
                padding: "8px 30px",
                textTransform: "none",
              }}
            >
              <Typography>Зберегти</Typography>
            </Button>
            <Button
              onClick={handleExit}
              sx={{
                marginTop: "8px",
                maxWidth: "210px",
                alignSelf: "flex-end",
                backgroundColor: "#423A34",
                borderRadius: "50px",
                color: "white",
                padding: "8px 30px",
                textTransform: "none",
              }}
            >
              <Typography>Вихід</Typography>
            </Button>
          </Box>
        </Container>
      )}
    </>
  );
};