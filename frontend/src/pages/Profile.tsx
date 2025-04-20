import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';

const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    username: 'current_user',
    email: 'user@example.com',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let valid = true;
    const newErrors = { username: '', email: '' };

    if (!formData.username) {
      newErrors.username = 'Username is required';
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else {
      const emailPattern = /\S+@\S+\.\S+/;
      if (!emailPattern.test(formData.email)) {
        newErrors.email = 'Email is invalid';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      alert('Profile updated: ' + JSON.stringify(formData));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Update Profile
      </Typography>
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1 font-medium">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 w-full"
        >
          Update
        </button>
      </div>
    </Container>
  );
};

export default Profile;
