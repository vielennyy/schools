import { Box, Button, Container, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { School, School } from "../TypesAndInterfaces"
import location from '../assets/img/location1.png'


export const SchoolsPage = () => {
    const [schools, setSchools] = useState<School[]>([]);
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL;
    
    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await fetch(`${baseUrl}/school/all`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setSchools(data);
                    console.log(data)
                } else {
                    console.error('Error fetching schools:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        };

        fetchSchools();
    }, [baseUrl]);

    

    return (
        <Container sx={{width: '1200px', margin: '0 auto', padding: '30px 0' }}>
        <Typography variant='h2' color='black' sx={{margin: '20px 0'}}>Вони вже з нами!</Typography>
        {schools && schools.map((school) => <SchoolItem school={school}/>)}
        
        </Container>
    )
}

interface SchoolProps {
    school: School;
}

export const SchoolItem: React.FC<SchoolProps> = ({school}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Box sx={{border: '1px solid gray', borderRadius: '20px', padding: '20px'}}>
            <Typography variant='h3' color='black'>{school.title}</Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', padding: '10px 0'}}>
                <img src={location} style={{width:'20px'}}/>
                <Typography color='gray'>{school.district + ', ' + school.city}</Typography>
            </Box>
            <Typography sx={{overflow: 'hidden', whiteSpace: isExpanded ? 'normal': 'nowrap', textOverflow: 'ellipsis', maxWidth: '900px',}}>{school.description}</Typography>
            <Button onClick={handleToggleExpand}>{isExpanded ? 'Приховати' : 'Детальніше'}</Button>
        </Box>
    )
}