import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useSelector } from 'src/store/Store';
import img1 from 'src/assets/images/profile/user-1.jpg';
import { IconPower } from '@tabler/icons-react';
import { AppState } from 'src/store/Store';
import { Link } from 'react-router-dom';
import { getUserLocalStorage } from "src/context/autoProvider/auth";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import * as AuthService from "src/services/auth.service";


export const Profile = () => {
  const navigate = useNavigate();
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const [user, setUser] = useState(AuthService.getCurrentUser());

  useEffect(() => {

    getUserLocalStorage();
  
  });

  const logout = () =>{
    AuthService.logout()
    navigate("/auth/login");
  }

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >



      {!hideMenu ? (
        <>
          <Avatar alt="Remy Sharp" src={img1} />

          <Box>
            <Typography variant="h6">{user.userName} </Typography>
            {/* <Typography variant="caption">Designer</Typography> */}
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                onClick={()=>logout()} 
                aria-label="logout"
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
