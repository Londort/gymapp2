import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from '@mui/material';

export default function WorkoutFormDialog({
  open,
  onClose,
  onSubmit,
  isLoading = false,
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setName('');
      setDescription('');
      setErrors({});
    }
  }, [open]);

  function handleSubmit() {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Workout name is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onSubmit({
      name: name.trim(),
      description: description.trim(),
    });
  }

  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      {/* <DialogTitle>Create Workout</DialogTitle> */}

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Workout Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name}
            required
            autoFocus
            fullWidth
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
