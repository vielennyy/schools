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
import { SubjectPage } from './pages/SubjectPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';

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
        <BlogPage/>
    },
    {
        path: '/about',
        element: <AboutPage/>
    },
    {
        path: '/contacts',
        element: <ContactPage/>
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
        path: '/create-test/:subjectId?',
        element: <CreateTest/>
    },
    {
        path: '/subject/:subjectId?',
        element: <SubjectPage/>
    },
]

export default AppRoutes