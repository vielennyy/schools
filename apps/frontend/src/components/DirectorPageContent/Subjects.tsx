import { Box, Button, Typography } from "@mui/material"

export const Subjects = () => {
    return (
        <Empty/>
    )
}

export const Empty = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%', 
                margin: '0 50px'
            }}
        >
            <Box sx={{maxWidth: 800, width: '100%', margin: '0 auto', display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',}}>
                <Typography variant='h3' sx={{color: '#000', textAlign: 'center'}}>Жодного предмету поки що не створено</Typography>
                <Typography align="center" sx={{padding: '20px 0'}}>Ви можете створити власний предмет та приєднати до нього клас учнів, що вже існує в системі, для публікації завдань та тестів</Typography>
                <Button sx={{maxWidth: '210px', alignSelf: 'center', backgroundColor: '#423A34', borderRadius: '50px', color:'white', padding: '8px 30px', textTransform: 'none'}}>
                    <Typography>Додати предмет</Typography>
                </Button>
            </Box>
        </Box>
    )
}