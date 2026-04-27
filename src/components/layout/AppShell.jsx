// src/components/layout/AppShell.jsx
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

export default function AppShell({
  title = 'GymApp',
  children,
  actions = null,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  function handleMenuOpen(e) {
    setAnchorEl(e.currentTarget);
  }
  function handleMenuClose() {
    setAnchorEl(null);
  }

  const theme = useTheme();
  console.log(theme);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        position: 'relative',
      }}
    >
      <AppBar position="sticky" color="inherit">
        <Toolbar
          sx={{
            minHeight: 56,
            px: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'background.default',
          }}
        >
          <Typography
            variant="h6"
            component="h1"
            fontWeight={700}
            sx={{
              color: 'text.secondary',
            }}
          >
            {title}
          </Typography>

          <IconButton sx={{ color: 'primary.light' }} onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            tranformOrigin={{
              vertical: 'top',
              horisontal: 'right',
            }}
          >
            <MenuItem onClick={handleMenuClose}>Profilo</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {menuOpen && (
        <Box
          onClick={handleMenuClose}
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(0, 0, 0, 0.55)',
            zIndex: 1,
          }}
        />
      )}

      <Container
        maxWidth="sm"
        sx={{
          py: 2,
          px: {
            xs: 2,
            sm: 3,
          },
        }}
      >
        {children}
      </Container>
    </Box>
  );
}

// export default AppShell;
