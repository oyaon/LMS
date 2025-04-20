import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import FormInput from '../components/FormInput';
import BookCard from '../components/BookCard';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  status: 'available' | 'borrowed';
}

const BookSearch: React.FC = () => {
  const [filters, setFilters] = useState({
    title: '',
    author: '',
  });

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params: Record<string, string> = {};
        if (filters.title) params.search = filters.title;
        if (filters.author) params.search = filters.author;
        const response = await axios.get('/api/books', { params });
        setBooks(response.data);
      } catch {
        toast.error('Failed to fetch books');
      }
    };
    fetchBooks();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleBorrow = async (id: string) => {
    try {
      await axios.post('/api/transactions/borrow', { bookId: id });
      toast.success('Book borrowed successfully');
      setBooks(books.map(book => book._id === id ? { ...book, status: 'borrowed' } : book));
    } catch {
      toast.error('Failed to borrow book');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Book Search
      </Typography>
      <form className="mb-4">
        <FormInput
          label="Title"
          name="title"
          value={filters.title}
          onChange={handleFilterChange}
        />
        <FormInput
          label="Author"
          name="author"
          value={filters.author}
          onChange={handleFilterChange}
        />
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map(book => (
          <BookCard
            key={book._id}
            title={book.title}
            author={book.author}
            isbn={book.isbn}
            status={book.status}
            onBorrow={() => handleBorrow(book._id)}
          />
        ))}
      </div>
    </Container>
  );
};

export default BookSearch;
