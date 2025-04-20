import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    author: '',
    isbn: '',
  });

  useEffect(() => {
    // Fetch book data by id and populate formData
    // Placeholder: replace with actual API call
    async function fetchBook() {
      // Example fetch logic here
      // const response = await api.get(`/books/${id}`);
      // setFormData(response.data);
      setFormData({
        title: 'Sample Book',
        author: 'Sample Author',
        isbn: '123456789X',
      });
    }
    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let valid = true;
    const newErrors = { title: '', author: '', isbn: '' };

    if (!formData.title) {
      newErrors.title = 'Title is required';
      valid = false;
    }
    if (!formData.author) {
      newErrors.author = 'Author is required';
      valid = false;
    }
    if (!formData.isbn) {
      newErrors.isbn = 'ISBN is required';
      valid = false;
    } else {
      const isbnPattern = /^(?:\d{9}[\dXx]|\d{13})$/;
      if (!isbnPattern.test(formData.isbn)) {
        newErrors.isbn = 'ISBN format is invalid';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Submit updated book data
      alert('Book updated: ' + JSON.stringify(formData));
      navigate('/book-management');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Edit Book
      </Typography>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
        <div>
          <label htmlFor="author" className="block mb-1 font-medium">
            Author
          </label>
          <input
            id="author"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.author ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author}</p>
          )}
        </div>
        <div>
          <label htmlFor="isbn" className="block mb-1 font-medium">
            ISBN
          </label>
          <input
            id="isbn"
            name="isbn"
            type="text"
            value={formData.isbn}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.isbn ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.isbn && (
            <p className="text-red-500 text-sm mt-1">{errors.isbn}</p>
          )}
        </div>
        <button
          onClick={handleSubmit}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors duration-200 w-full"
        >
          Update Book
        </button>
      </div>
    </Container>
  );
};

export default EditBook;
