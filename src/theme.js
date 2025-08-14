import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4b91',
    },
    secondary: {
      main: '#fdbf33',
    },
    background: {
      default: '#2a1233',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Comic Sans MS", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          padding: '12px 30px',
        },
      },
    },
  },
});

export default theme;