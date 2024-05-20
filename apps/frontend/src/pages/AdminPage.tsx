import { AdminTabs } from "../components/AdminPageContent/AdminTabs";
import { Login } from "../components/AdminPageContent/Login";
import { useAppSelector } from "../hooks";

export const AdminPage = () => {

    const user = useAppSelector((state) => state.user.data);
    console.log(user?.userRoles.map((role) => role.role).includes('ADMIN')) 
    
    return(
        <>
        {
          user?.userRoles.map((role) => role.role).includes('ADMIN') ?
          <AdminTabs/>
          :
          <Login/>  
        }
        </>
    )
}