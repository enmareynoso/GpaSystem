import React from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';

const LoginPage = () => {
  const handleSubmit = (values) => {
    console.log('Login form values:', values);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <Formik initialValues={{ username: '', password: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              label="Username"
              name="username"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Field
              as={TextField}
              label="Password"
              type="password"
              name="password"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ backgroundColor: 'black', color: 'white' }}
              disabled={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginPage;