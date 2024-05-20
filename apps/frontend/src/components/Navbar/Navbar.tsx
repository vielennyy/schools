import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useLocation } from 'react-router-dom';
import { AuthPopup } from '../AuthPopup/AuthPopup';
import Logo from '../../assets/img/Logo image.svg';
import UserImage from '../../assets/img/Account image.svg'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserData } from '../../store/reducers/user/userThunks';

export const Navbar = () => {
  const location = useLocation().pathname;

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.data)
  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])


  return (
    <AppBar position="static" color='transparent' sx={{height:'80px', margin: '0px auto', padding: '40px 0', alignItems:'center', justifyContent: 'center', 
    backgroundColor: location.includes("schools") || location.includes("blog") || location.includes("about") || location.includes("contacts") || location.includes("user")  ? "#998B71" : ''}}>
      <Container sx={{ zIndex:'2', display: 'flex', justifyContent:'space-between', fontSize: '20px', maxWidth: '1200px'}}>
        <Box sx={{ display: 'block', alignItems: 'center', justifyContent: 'center' }}>
          <Link to='/'>
          <img src={Logo} alt='Логотип "Освіта Онлайн"' />
          </Link>
        </Box>
    
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
          <Box sx={{ display: { xs: 'none', md: 'flex', flexDirection: 'raw', gap: '10px', marginRight: '50px' } }}>
            <Link to='/schools' style={{textDecoration: 'none'}}>
                <Typography variant='h3' textAlign="center" padding={'10px'}>Заклади освіти</Typography>
            </Link>
            <Link to='/blog' style={{textDecoration: 'none'}}>
                <Typography variant='h3' textAlign="center" padding={'10px'}>Блог</Typography>
            </Link>
            <Link to='/about' style={{textDecoration: 'none'}}>
                <Typography variant='h3' textAlign="center" padding={'10px'}>Про нас</Typography>
            </Link>
            <Link to='/contacts' style={{textDecoration: 'none'}}>
                <Typography variant='h3' textAlign="center" padding={'10px'}>Контакти</Typography>
            </Link>
          </Box>
          {user ? (
            <Link to='/user'>
            <img src={UserImage} alt="" style={{width: '35px', cursor: 'pointer'}}/>
            </Link>
          ) : 
          <AuthPopup/>
        }
        </Box>
      </Container>
    </AppBar>
  );
};
