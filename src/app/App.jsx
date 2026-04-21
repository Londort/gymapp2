// src/App.jsx
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import AppShell from '@/components/layout/AppShell';

function App() {
  return (
    <AppShell title="GymApp" actions={<Button variant="text">Action</Button>}>
      <Stack spacing={2}>
        <Typography variant="h4">Home placeholder</Typography>

        <Card>
          <CardContent>
            <Typography variant="h6">Workout card example</Typography>
            <Typography variant="body2" color="text.secondary">
              This is temporary content to verify theme and spacing.
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">Another block</Typography>
            <Typography variant="body2" color="text.secondary">
              Mobile spacing should look comfortable without horizontal
              overflow.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </AppShell>
  );
}

export default App;
