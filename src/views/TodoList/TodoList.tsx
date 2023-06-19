import React, {
  FC, ReactNode, useState, FormEvent, useEffect,
} from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import {
  Box, Snackbar, Alert, Checkbox,
} from '@mui/material';
import { useTodoListContract } from 'hooks';

interface HomeProps {
  children?: ReactNode;
}

export const TodoList: FC<HomeProps> = () => {
  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>('');
  const {
    taskList,
    taskListSuccess,
    addTask,
    completeTask,
    completeTaskLoading,
    error,
  } = useTodoListContract();

  useEffect(() => {
    if (error) setErrorOpen(true);
  }, [error]);

  const handleAddTrack = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask?.(newTask);
  };

  return (
    <Box>
      <Box>
        <Typography component="h1" variant="h2" color="textPrimary" gutterBottom>
          Todo list
        </Typography>

        {!taskList.length && taskListSuccess && (
        <Typography fontStyle="italic">No tasks to display, please create your first Todo task</Typography>
        )}

        {
          taskList.map(({ task, completed }, idx) => (
            <Box
              display="flex"
              alignItems="center"
              key={task}
            >
              <Checkbox
                checked={completed}
                onChange={() => completeTask(BigInt(idx))}
                disabled={completed || completeTaskLoading}
              />
              <Typography>{task}</Typography>
            </Box>
          ))
        }

        <form onSubmit={handleAddTrack}>
          <FormGroup sx={{ padding: 2, marginTop: 4 }}>
            <TextField
              sx={{ paddingBottom: 2 }}
              name="specs"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              variant="outlined"
              placeholder="What should I remember to do?"
            />
            <Button type="submit" variant="outlined">Add Task</Button>
          </FormGroup>
        </form>

        <Snackbar
          open={errorOpen}
          autoHideDuration={6000}
          onClose={() => setErrorOpen(false)}
        >
          <Alert onClose={() => setErrorOpen(false)} severity="error" sx={{ width: '100%' }}>
            {error?.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};
