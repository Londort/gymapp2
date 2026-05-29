import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Stack,
} from '@mui/material';

export default function WorkoutCard({ workout, onOpen }) {
  console.log(workout);
  return (
    <Card
      sx={{
        minHeight: '100px',
      }}
      variant="outlined"
    >
      <CardActionArea onClick={() => onOpen(workout.id)}>
        <CardContent>
          <Stack spacing={0.75}>
            <Typography
              sx={{
                color: 'text.secondary',
                textAlign: 'left',
                textTransform: 'capitalize',
              }}
              variant="h6"
              component="h2"
              fontWeight={700}
            >
              {workout.name}
            </Typography>

            {workout.description && (
              <Typography
                sx={{
                  textAlign: 'left',
                }}
                variant="body2"
                color="text.secondary"
              >
                {workout.description}
              </Typography>
            )}

            {/* {workout.updated_at && (
              <Typography variant="caption" color="text.secondary">
                Updated: {new Date(workout.updated_at).toLocaleDateString()}
              </Typography>
            )} */}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
