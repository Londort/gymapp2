import { useNavigate } from 'react-router-dom';
import { Box, Container, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import AppShell from '@/components/layout/AppShell';

import WorkoutsList from '@/features/workouts/components/WorkoutsList';
import { useWorkoutsList } from '@/features/workouts/hooks/useWorkoutsList';

export default function HomePage() {
  const navigate = useNavigate();

  const { workouts, isLoading, error } = useWorkoutsList();

  function handleOpenWorkout(workoutId) {
    navigate(`/workouts/${workoutId}`);
  }

  function handleCreateWorkout() {
    console.log('Create workout');
  }

  return (
    <AppShell title="GymApp">
      <Container
        maxWidth="sm"
        sx={{
          py: 2,
        }}
      >
        <WorkoutsList
          items={workouts}
          isLoading={isLoading}
          error={error}
          onOpenWorkout={handleOpenWorkout}
        />
      </Container>

      <Box
        sx={{
          position: 'fixed',
          right: 16,
          bottom: 16,
        }}
      >
        <Fab color="primary" onClick={handleCreateWorkout}>
          <AddIcon />
        </Fab>
      </Box>
    </AppShell>
  );
}
