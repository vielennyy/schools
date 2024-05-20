import { CreateTaskPage } from './pages/CreateTaskPage';
import { HomePage } from './pages/HomePage';
import { RegistrationPage } from './pages/RegistrationPage';
import { SchoolsPage } from './pages/SchoolsPage';
import { UserPage } from './pages/UserPage';
import { CreateSchool } from './pages/CreateShoolPage';
import { CreateTest } from './components/Test/CreateTest';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { StartTest } from './components/Test/StartTest';

const AppRoutes = [
    {
        index: true,
        element: <HomePage/> 
    },
    {
        path: '/schools',  
        element: <SchoolsPage/>
    },
    {
        path: '/blog',
        element: 
        <></>
    },
    {
        path: '/about',
        element: <AboutPage/>
    },
    {
        path: '/contacts',
        element: <></>
    },
    {
        path: '/create-task',
        element: <CreateTaskPage/>
    },
    {
        path: '/user',
        element: <UserPage/>
    },
    {
        path: '/admin',
        element: <AdminPage/>
    },
    {
        path: '/registration',
        element: <RegistrationPage/>
    },
    {
        path: '/start-test',
        element: <StartTest/>
    },
    // {
    //     path: '/director-page',
    //     element: <DirectorTabs/>
    // },
    {
        path: '/create-school',
        element: <CreateSchool/>
    },
    {
        path: '/create-test',
        element: <CreateTest/>
    },
]

export default AppRoutes