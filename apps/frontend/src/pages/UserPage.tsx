import { Box, Button, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../hooks";
import {DirectorVerticalTabs} from "../components/DirectorPageContent/TabPannel";
import {StudentVerticalTabs} from "../components/StudentPageContent/TabPanel";
import { TeacherVerticalTabs } from "../components/TeacherPageContent/TabPanel";



export const UserPage = () => {
    // const dispatch = useAppDispatch();
    
    const user = useAppSelector((state) => state.user.data);
    console.log(user?.userRoles.map((role) => role.role).includes('DIRECTOR'))

    
    return(
        <>
        {user?.userRoles.map((role) => role.role).includes('DIRECTOR') ?
        <DirectorVerticalTabs/>
        : user?.userRoles.map((role) => role.role).includes('STUDENT') ?
            <StudentVerticalTabs/>
            : <TeacherVerticalTabs/>
        }
        </>
    )
}