import { Box, Typography } from "@mui/material"


export const Subjects = () => {

    return (
        <>
        <Typography variant='h4'>Предмети</Typography>
        <Subject/>
        <Box/>
        </>
    )
}

const Subject = () => {
    const arr = [1,2,3,4,5]
    return (
        <Box>
            <Typography>Математика</Typography>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                {arr.map(item => <Box sx={{borderRadius: '50%', backgroundColor: 'green', width: '50px', height: '50px', margin: '5px'}}></Box>)}
            </Box>
        </Box>
    )
}