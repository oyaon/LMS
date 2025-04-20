import React, { useState } from 'react';
import { returnBook } from '../services';

const ReturnBook = () => {
  const [bookId, setBookId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [fine, setFine] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await returnBook({ bookId, memberId, fine });
      setMessage('Book returned successfully!');
      console.log('Response:', response.data);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to return book!');
    }
  };

  return (
    <div>
      <h1>Return Book</h1>
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
        <div>
          <label>Member ID:</label>
          <input
            type="text"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder="Enter member ID"
            required
          />
        </div>
        <div>
          <label>Fine:</label>
          <input
            type="number"
            value={fine}
            onChange={(e) => setFine(Number(e.target.value))}
            placeholder="Enter fine amount"
          />
        </div>
        <button type="submit">Return Book</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReturnBook;