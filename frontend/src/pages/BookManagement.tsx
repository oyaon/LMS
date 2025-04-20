import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import FormInput from '../components/FormInput';
import BookCard from '../components/BookCard';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  status: 'available' | 'borrowed';
}

const initialBooks: Book[] = [
  { id: 1, title: 'Book One', author: 'Author A', isbn: '1234567890', status: 'available' },
  { id: 2, title: 'Book Two', author: 'Author B', isbn: '0987654321', status: 'borrowed' },
];

const BookManagement: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [formData, setFormData] = useState({ title: '', author: '', isbn: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (formData.title && formData.author && formData.isbn) {
      const newBook: Book = {
        id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1,
        title: formData.title,
        author: formData.author,
        isbn: formData.isbn,
        status: 'available',
      };
      setBooks([...books, newBook]);
      setFormData({ title: '', author: '', isbn: '' });
    }
  };

  const handleEdit = (book: Book) => {
    setEditingId(book.id);
    setFormData({ title: book.title, author: book.author, isbn: book.isbn });
  };

  const handleUpdate = () => {
    if (editingId !== null) {
      setBooks(books.map(book => book.id === editingId ? { ...book, ...formData } : book));
      setEditingId(null);
      setFormData({ title: '', author: '', isbn: '' });
    }
  };

  const handleDelete = (id: number) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Book Management
      </Typography>
      <div className="mb-4">
        <FormInput
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <FormInput
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
        <FormInput
          label="ISBN"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
        />
        {editingId === null ? (
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200 mt-2"
          >
            Add Book
          </button>
        ) : (
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 mt-2"
          >
            Update Book
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map(book => (
          <div key={book.id} className="border p-2 rounded">
            <BookCard
              title={book.title}
              author={book.author}
              isbn={book.isbn}
              status={book.status}
              onBorrow={() => {}}
            />
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleEdit(book)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book.id)}
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

export default BookManagement;
