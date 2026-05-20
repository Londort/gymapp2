import { Stack, Typography, CircularProgress, Box } from '@mui/material';

import WorkoutCard from '@/features/workouts/components/WorkoutCard';

export default function WorkoutsList({
  items = [],
  isLoading = false,
  error = null,
  onOpenWorkout,
}) {
  if (isLoading) {
    return (
      <Box
        sx={{
          py: 6,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (items.length === 0) {
    return (
      <Box sx={{ py: 6 }}>
        <Typography variant="h6" gutterBottom>
          No workouts yet
        </Typography>

        <Typography color="text.secondary">
          Create your first workout to get started.
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      {items.map((workout) => (
        <WorkoutCard
          key={workout.id}
          workout={workout}
          onOpen={onOpenWorkout}
        />
      ))}
    </Stack>
  );
}
