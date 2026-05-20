import { useEffect, useState } from 'react';
import { listWorkouts } from '@/features/workouts/services/workouts.service';

export function useWorkoutsList() {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await listWorkouts();

        if (!ignore) {
          setWorkouts(data);
        }
      } catch (err) {
        console.error(err);

        if (!ignore) {
          setError('Failed to load workouts');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    workouts,
    isLoading,
    error,
  };
}
