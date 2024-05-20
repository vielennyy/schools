import  {useState} from "react";
import Close from '../../assets/img/Close icon.svg'
import {
  Box,
  Dialog,
  Button,
  Typography
} from '@mui/material';
import { LoginPopup } from "./LoginPopup";
import { RegisterPopup } from "./RegisterPopup";



export const AuthPopup = () => {
  const [open, setOpen] = useState(false);
  const [loginPopup, setLoginPopup] = useState(true);
  const [registerPopup, setRegisterPopup] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegisterPopupOpen = () => {
    setRegisterPopup(true)
    setLoginPopup(false)
  }
  const handleLoginPopupOpen = () => {
    setLoginPopup(true)
    setRegisterPopup(false)
  }

 return(
  <Box>
    <Button 
      onClick={handleClickOpen}
      sx={{maxWidth: '210px', backgroundColor: '#423A34', borderRadius: '50px', color:'white', padding: '18px 84px', textTransform: 'none'}}>
      <Typography variant='h3'>Вхід</Typography>
    </Button> 
    <Dialog open={open} 
            onClose={handleClose}>
      <Box sx={{
          position: 'relative',
          width: 400,
          padding: '30px'
          }}>
        <Button onClick={handleClose} sx={{
            position: 'absolute',
            right: 30,
            minWidth: 20,
            color: "inherit"
          }}>
          <img src={Close} alt="" width='20px' />
        </Button>
          <Box>
            <Typography variant='h3' sx={{fontSize: 16, color: '#000', fontWeight: 500}}>{loginPopup ? 'Вхід' : registerPopup ? 'Реєстрація': 'Заміна паролю'}</Typography>
            {loginPopup ? 
              <>
                  <LoginPopup/>
                  <Typography textAlign={'center'}>Не маєте акаунту? <Button onClick={handleRegisterPopupOpen}>Реєстрація</Button></Typography>
              </> 
              : 
              <>
                  <RegisterPopup backToLoginPopup={handleLoginPopupOpen}/>
                  <Typography textAlign={'center'}>Вже маєте акаунт? <Button onClick={handleLoginPopupOpen}>Увійти</Button></Typography>
              </>
            }
          </Box>
        </Box>
    </Dialog>
  </Box>
 )
}