import { Box, Typography } from "@mui/material"

export const ContactPage = () => {
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '1000px', alignItems: 'center', padding: '30px 0', margin: '0 auto'}}>
            <Typography variant='h2' color='black' textAlign={'center'}>ЧЕРКАСЬКИЙ НАЦІОНАЛЬНИЙ УНІВЕРСИТЕТ ІМЕНІ БОГДАНА ХМЕЛЬНИЦЬКОГО</Typography>
            <Typography variant='h3' color='black'>Навчально-науковий інститут інформаційних та освітніх технологій</Typography>
            <Typography variant='h3' color='black'>Кафедра прикладної математики та інформатики</Typography>
            <Typography variant='h3' color='black'>Спеціальність 126 Інформаційні системи та технології</Typography>
            <Typography variant='h3' color='black'>Освітня програма Інтелектуальний аналіз даних</Typography>
            <Typography variant='h2' color='black' textAlign={'center'}>КВАЛІФІКАЦІЙНА РОБОТА</Typography>
            <Typography variant='h3' color='black'>Виконала:</Typography>
            <Typography variant='h3' color='black'>Студентка групи ІСТ-4</Typography>
            <Typography variant='h3' color='black'>Войціховська Л. І.</Typography>
            <Typography variant='h3' color='black'>Науковий керівник</Typography>
            <Typography variant='h3' color='black'>доц. к. т. н. викл., Дзюба В. А.</Typography>
        </Box>
    )
}