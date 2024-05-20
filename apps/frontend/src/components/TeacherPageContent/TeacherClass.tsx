import { Container, Typography, Button } from "@mui/material";
import { SchoolClass } from "../../TypesAndInterfaces";
import MultipleValuesInput from "../DirectorPageContent/MultipleValuesInput";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getStudentsByClassId } from "../../store/reducers/student/studentThunks";
import TeacherCard from "../TeacherCard/TeacherCard";

interface TeacherClassProps {
  schoolClass: SchoolClass;
}

export const TeacherClass = ({ schoolClass }: TeacherClassProps) => {
  const [values, setValues] = useState<string[]>([]);
  const inviteStudents = async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL;
    const emails = values.map((v) => {
      return { userEmail: v, classId: schoolClass.id };
    });
    await fetch(`${baseUrl}/invite/student`, {
      method: "POST",
      body: JSON.stringify(emails),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => setValues([]));
  };


  const dispatch = useAppDispatch();
  const students = useAppSelector(state => state.students.data)
  useEffect(() => {
    dispatch(getStudentsByClassId(schoolClass.id))
  }, [dispatch])

  console.log(students)
  return (
    <Container>
      <Typography variant="h1" color="black">
        {schoolClass?.title}
      </Typography>
      <Typography variant='h3' color='black'>Запросіть учнів до класу</Typography>
      <MultipleValuesInput
        sxStyles={{ paddingTop: 4, paddingBottom: 2 }}
        values={values}
        setValues={setValues}
      />
      <Button variant="contained" onClick={() => inviteStudents()}>
        Додати учнів
      </Button>
      {students.length ? (
        students.map((student) => (
          <TeacherCard user={student.user} sxStyles={{ marginTop: 4 }} />
        ))
      ) : (
        <></>
      )}
    </Container>
  );
};
