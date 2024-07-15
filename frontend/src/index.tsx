import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const container = document.getElementById('root');
const root = createRoot(container!);

const theme = createTheme();

root.render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
);
