import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/useAuth';
import { createWorkout } from '@/features/workouts/services/workouts.service';
import { Box, Container, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import AppShell from '@/components/layout/AppShell';

import WorkoutsList from '@/features/workouts/components/WorkoutsList';
import WorkoutFormDialog from '@/features/workouts/components/WorkoutFormDialog';
import { useWorkoutsList } from '@/features/workouts/hooks/useWorkoutsList';

export default function HomePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);
  const { workouts, isLoading, error, addWorkout } = useWorkoutsList();

  function handleOpenWorkout(workoutId) {
    navigate(`/workouts/${workoutId}`);
  }

  async function handleCreateWorkout(payload) {
    try {
      setIsCreating(true);
      const createdWorkout = await createWorkout({
        userId: user.id,
        name: payload.name,
        description: payload.description,
      });

      setIsDialogOpen(false);
      addWorkout(createdWorkout);
    } catch (err) {
      console.log(err);
    } finally {
      setIsCreating(false);
    }
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
        <Fab color="primary" onClick={() => setIsDialogOpen(true)}>
          <AddIcon />
        </Fab>
      </Box>
      <WorkoutFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleCreateWorkout}
        isLoading={isCreating}
      />
    </AppShell>
  );
}
