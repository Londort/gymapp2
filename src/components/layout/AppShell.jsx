// src/components/layout/AppShell.jsx
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

function AppShell({ title = 'GymApp', children, actions = null }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <AppBar position="sticky" color="inherit">
        <Toolbar
          sx={{
            minHeight: 64,
            px: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" component="h1" fontWeight={700}>
            {title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {actions}
          </Box>
        </Toolbar>
      </AppBar>

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

export default AppShell;
