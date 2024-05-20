import { Box } from "@mui/material";import { useEffect, useState } from "react";
import { SchoolClass } from "../../TypesAndInterfaces";
import { CreateClass } from "./CreateClass";
import { TeacherClass } from "./TeacherClass";
export const Class = () => {
  return <Empty />;
};

export const Empty = () => {
  const [myClass, setMyClass] = useState<SchoolClass | null>(null);
  const baseUrl = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    fetch(`${baseUrl}/class`, {
      method: "GET",
      credentials: "include",
      headers: {
        credentials: "include",
        "Content-Type": "application/json",
      },
    }).then((r) => r.json().then((j) => setMyClass({ ...j })));
  }, []);

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
      {myClass ? <TeacherClass schoolClass={myClass}></TeacherClass> : <CreateClass /> }
    </Box>
  );
};
