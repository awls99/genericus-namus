import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import CssBaseline from '@mui/material/CssBaseline';
// import App from './App';
import Roster from './Components/Roster';
import reportWebVitals from './reportWebVitals';
import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import TopBar from './Components/TopBar';
import About from './Components/About';


const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: grey[900],
    },
    secondary: {
      main: grey[700],
    },
  },
});



ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <TopBar/>
      <About/>
      <Roster />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
