import { useState } from 'react';
import { borrowBook } from '../services';

const BorrowBook = () => {
  const [bookId, setBookId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await borrowBook({ bookId, memberId });
      setMessage('Book borrowed successfully!');
      console.log('Response:', response.data);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to borrow book!');
    }
  };

  return (
    <div>
      <h1>Borrow Book</h1>
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
        <button type="submit">Borrow Book</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BorrowBook;