import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import BookCard from '../components/BookCard';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  status: 'available' | 'borrowed';
  fine?: number;
}

const BorrowingHistory: React.FC = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.get('/api/transactions/user');
        const books = response.data.map((transaction: unknown) => ({
          _id: (transaction as any).bookId._id,
          title: (transaction as any).bookId.title,
          author: (transaction as any).bookId.author,
          isbn: (transaction as any).bookId.isbn,
          status: (transaction as any).status === 'overdue' ? 'borrowed' : 'borrowed',
          fine: (transaction as any).fine || 0,
        }));
        setBorrowedBooks(books);
      } catch {
        toast.error('Failed to fetch borrowing history');
      }
    };
    fetchBorrowedBooks();
  }, []);

  const handleReturn = async (id: string) => {
    try {
      await axios.post(`/api/transactions/return/${id}`);
      toast.success('Book returned successfully');
      setBorrowedBooks(borrowedBooks.filter(book => book._id !== id));
    } catch {
      toast.error('Failed to return book');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Borrowing History
      </Typography>
      {borrowedBooks.length === 0 ? (
        <Typography>No borrowed books.</Typography>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {borrowedBooks.map(book => (
            <BookCard
              key={book._id}
              title={book.title}
              author={book.author}
              isbn={book.isbn}
              status={book.status}
              fine={book.fine}
              onReturn={() => handleReturn(book._id)}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

export default BorrowingHistory;
