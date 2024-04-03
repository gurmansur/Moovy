import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const pages = ['Search', 'My Library'];
const settings = ['Logout'];

const ResponsiveAppBar = ({ user, setUser, selectedTab, setSelectedTab }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    Cookies.remove('token');
    setUser({});
    setSelectedTab('');
    axios.defaults.headers.common['Authorization'] = '';
    navigate('/');
    handleCloseUserMenu();
  };

  const handleTabClick = (page) => {
    setSelectedTab(page);
  };

  return (
    <AppBar sx={{ bgcolor: '#dce0e2', color: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }} onClick={() => handleTabClick('')}>
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'orange',
                textDecoration: 'none',
              }}
            >
              Moovy
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            Moovy
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link
                to={`/${page.toLowerCase().replace(' ', '-')}`}
                style={{ textDecoration: 'none', color: 'black' }}
                onClick={() => handleTabClick(page)}
              >
                <Typography
                  variant="h6"
                  sx={{
                    ml: 7,
                    fontWeight: 700,
                    fontSize: 18,
                    color: selectedTab === page ? 'orange' : 'black',
                  }}
                >
                  {page}
                </Typography>
              </Link>
            ))}
            </Box>
          {/*User avatar*/}
          { Object.keys(user).length !== 0 && 
          <Tooltip title="Open settings">
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex', cursor: "pointer"}}} alignItems={"center"} onClick={handleOpenUserMenu}>
            <Typography variant="h6" sx={{ ml: 7, fontWeight: 700, fontSize: 18, color: 'black', mr: 2, cursor: "pointer"  }}>
              {user.username}
            </Typography>
            
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
              </Box>
            </Tooltip>}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={"logout"} onClick={logout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          {Object.keys(user).length === 0 && 
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, flexDirection: "row-reverse"}}>
              <Link to={`/login`} style={{textDecoration: 'none', color: 'black'}} onClick={() => handleTabClick('Login')}>
                <Typography variant="h6" sx={{ ml: 7, fontWeight: 700, fontSize: 18, color: selectedTab === 'Login' ? 'orange' : 'black' }}>
                  Login
                </Typography>
              </Link>
              <Link to={`/register`} style={{textDecoration: 'none', color: 'black'}} onClick={() => handleTabClick('Register')}>
                <Typography variant="h6" sx={{ ml: 7, fontWeight: 700, fontSize: 18, color: selectedTab === 'Register' ? 'orange' : 'black' }}>
                  Register
                </Typography>
              </Link>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;