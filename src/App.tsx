import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './routes/Navbar';
import Home from './pages/Home';
import APIComponent from './routes/APIComponent';
import ZodForm from './routes/ZodForm';

const theme = createTheme({
  palette: { mode: 'light' },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api" element={<APIComponent />} />
          <Route path="/form" element={<ZodForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
