import { useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import { Context as AuthContext } from '../context/AuthContext';

const Login = () => {
  const { state, signin } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signin({ email: data.get('email'), password: data.get('password') });
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src="/toothmate_logo.png" alt="logo" width={'90%'}/>
          <Typography component="h1" variant="h5" sx={{mt: 2}}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{backgroundColor: '#2a2a51'}}
              sx={{ mt: 2, mb: 4 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        {state.errorMessage && <Alert severity="error">{state.errorMessage}</Alert>}
      </Container>
    </div>
  );
};

export default Login;