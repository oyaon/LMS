import React, { useState } from 'react';
import { deleteBook } from '../services';

const DeleteBook = () => {
  const [bookId, setBookId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await deleteBook(bookId);
      setMessage('Book deleted successfully!');
      console.log('Response:', response.data);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to delete book!');
    }
  };

  return (
    <div>
      <h1>Delete Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Book ID:</label>
          <input
            type="text"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            placeholder="Enter book ID"
            required
          />
        </div>
        <button type="submit">Delete Book</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteBook;