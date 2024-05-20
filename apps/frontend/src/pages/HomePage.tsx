import { Box, Button, Typography } from '@mui/material';
import Logo from '../assets/img/Logo.jpg'

export const HomePage = ():JSX.Element => {
    return(
        <Box style={{width: '100%', height: '100vh', position: 'absolute', top: '0px', overflow: "hidden", backgroundColor: 'black'}}>
            <img src={Logo} style={{width: '100%', top: '0px'}}/>
            <Button sx={{position: 'absolute', top: '70vh', right: '10vw', maxWidth: '340px', backgroundColor: '#F5DD84', borderRadius: '50px', padding: '25px 52px'}}>
                <Typography variant='h2' sx={{textTransform: 'none'}}>
                Приєднатися
                </Typography>
            </Button>
        </Box>
    )
};
