import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';

interface LoginProps {
  onLogin: (role: 'admin' | 'member' | 'guest') => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [role, setRole] = useState<'admin' | 'member' | 'guest'>('guest');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!role) {
      setError('Please select a role');
      return;
    }
    setError('');
    onLogin(role);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Select Role to Login
      </Typography>
      <div>
        <label htmlFor="role-select" className="block mb-1 font-medium">
          Role
        </label>
        <select
          id="role-select"
          value={role}
          onChange={(e) => setRole(e.target.value as 'admin' | 'member' | 'guest')}
          className={`w-full p-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="guest">Guest</option>
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      <button
        onClick={handleLogin}
        className="w-full p-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
      >
        Login
      </button>
    </Container>
  );
};

export default Login;
