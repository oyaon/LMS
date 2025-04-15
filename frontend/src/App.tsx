import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import './App.css';

function App() {
  return (
    <Router>
      <Container>
        <Typography variant="h1" align="center" gutterBottom>
          Library Management System
        </Typography>
        <Routes>
          <Route path="/" element={<Typography>Home Page</Typography>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
