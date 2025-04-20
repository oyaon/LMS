import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import './App.css';

// Placeholder pages
const Home = () => <div>Home Page</div>;
const Login = () => <div>Login Page</div>;
const BookSearch = () => <div>Book Search Page</div>;
const Dashboard = () => <div>Dashboard Page</div>;

function App() {
  return (
    <Router>
      <Container>
        <Typography variant="h1" align="center" gutterBottom>
          Library Management System
        </Typography>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book-search" element={<BookSearch />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
