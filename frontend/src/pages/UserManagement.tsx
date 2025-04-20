import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import FormInput from '../components/FormInput';

interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'member' | 'guest';
}

const initialUsers: User[] = [
  { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin' },
  { id: 2, username: 'member1', email: 'member1@example.com', role: 'member' },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [formData, setFormData] = useState({ username: '', email: '', role: 'member' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let valid = true;
    const newErrors = { username: '', email: '', role: '' };

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
    if (!formData.role) {
      newErrors.role = 'Role is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleAdd = () => {
    if (validate()) {
      const newUser: User = {
        id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
        username: formData.username,
        email: formData.email,
        role: formData.role as 'admin' | 'member' | 'guest',
      };
      setUsers([...users, newUser]);
      setFormData({ username: '', email: '', role: 'member' });
    }
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setFormData({ username: user.username, email: user.email, role: user.role });
  };

  const handleUpdate = () => {
    if (validate() && editingId !== null) {
      setUsers(users.map(user => user.id === editingId ? { ...user, ...formData, role: formData.role as 'admin' | 'member' | 'guest' } : user));
      setEditingId(null);
      setFormData({ username: '', email: '', role: 'member' });
    }
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        User Management
      </Typography>
      <div className="mb-4">
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
        <div>
          <label htmlFor="role-select" className="block mb-1 font-medium">
            Role
          </label>
          <select
            id="role-select"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.role ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="guest">Guest</option>
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role}</p>
          )}
        </div>
        {editingId === null ? (
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200"
          >
            Add User
          </button>
        ) : (
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Update User
          </button>
        )}
      </div>
      <div className="space-y-4">
        {users.map(user => (
          <div key={user.id} className="border p-2 rounded flex justify-between items-center">
            <div>
              <Typography variant="subtitle1">{user.username} ({user.role})</Typography>
              <Typography variant="body2">{user.email}</Typography>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(user)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default UserManagement;
