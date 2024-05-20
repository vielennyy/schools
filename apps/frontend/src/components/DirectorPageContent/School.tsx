import { Box, Button, Container, Typography } from "@mui/material";import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";
import { getSchoolData } from "../../store/reducers/school/schoolThunks";
import MultipleValuesInput from "./MultipleValuesInput";
import TeacherCard from "../TeacherCard/TeacherCard";
import { getTeachersBySchoolId } from "../../store/reducers/teacher/teacherThunks";

export const School = () => {
  const dispatch = useAppDispatch();
  const school = useAppSelector((state) => state.school.data);

  useEffect(() => {
    dispatch(getSchoolData());
  }, [dispatch]);

  return <>{!school ? <Empty></Empty> : <InfoBlock></InfoBlock>}</>;
};

export const Empty = () => {
  const navigate = useNavigate();
    return (
        <Box
            sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        margin: "0 50px",
            }}
        >
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
          Школа не зареєстрована
        </Typography>
        <Typography align="center" sx={{ padding: "20px 0" }}>
          Ви можете створити школу в системі та запросити до неї викладачів.
          Вони в свою чергу створюють класи та предмети та завдання для учнів.
        </Typography>
        <Button
          onClick={() => {
            navigate("/create-school");
          }}
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
                    <Typography>Зареєструвати школу</Typography>
                </Button>
            </Box>
        </Box>
  );
};

export const InfoBlock = () => {
  const school = useAppSelector((state) => state.school.data);
  const teachers = useAppSelector((state) => state.teachers.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (school) {
      dispatch(getTeachersBySchoolId(school.id));
    }
  }, [dispatch]);

  const [values, setValues] = useState<string[]>([]);

  const inviteTeachers = async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL;
    const emails = values.map(v => { return {email: v}})
    await fetch(`${baseUrl}/user/create/teacher`, {
      method: "POST",
      body: JSON.stringify(emails),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => setValues([]));
  };
    return (
        <Container>
      <Typography variant="h1" color="black">
        {school?.title}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", margin: "25px 0" }}>
        <Typography width="150px" color="black">
          Телефон контактної особи:
        </Typography>
        <Typography color="black">{school?.phone}</Typography>
            </Box>
      <Box sx={{ display: "flex", flexDirection: "row", margin: "25px 0" }}>
        <Typography width="150px" color="black">
          Електронна пошта:
        </Typography>
        <Typography color="black">{school?.email}</Typography>
            </Box>
      <Box sx={{ display: "flex", flexDirection: "row", margin: "25px 0" }}>
        <Typography width="150px" color="black">
          Область
        </Typography>
        <Typography color="black">{school?.district}</Typography>
            </Box>
      <Box sx={{ display: "flex", flexDirection: "row", margin: "25px 0" }}>
        <Typography width="150px" color="black">
          Населений пункт
        </Typography>
        <Typography color="black">{school?.city}</Typography>
            </Box>
      <Box sx={{ display: "flex", flexDirection: "row", margin: "25px 0" }}>
        <Typography width="150px" color="black">
          Індекс
        </Typography>
        <Typography color="black">{school?.index}</Typography>
            </Box>
      <Box sx={{ display: "flex", flexDirection: "row", margin: "25px 0" }}>
        <Typography width="150px" color="black">
          Опис
        </Typography>
        <Typography width="800px" color="black">
          {school?.description}
                </Typography>
            </Box>

      <MultipleValuesInput
        sxStyles={{ paddingTop: 4, paddingBottom: 2 }}
        values={values}
        setValues={setValues}
      />
      <Button variant="contained" onClick={() => inviteTeachers()}>
        {" "}
        Додати викладачів
      </Button>

      {teachers.length ? (
        teachers.map((t) => (
          <TeacherCard user={t} sxStyles={{ marginTop: 4 }} />
        ))
      ) : (
        <></>
      )}
        </Container>
  );
};
