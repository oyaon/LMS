import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Authentication APIs
export const login = (credentials: { email: string; password: string }) =>
  API.post('/auth/login', credentials);

export const register = (userData: { email: string; password: string }) =>
  API.post('/auth/register', userData);

// Book Management APIs
export const addBook = (bookData: { title: string; author: string; genre: string }) =>
  API.post('/books', bookData);

export const editBook = (bookId: string, bookData: { title: string; author: string; genre: string }) =>
  API.put(`/books/${bookId}`, bookData);

export const deleteBook = (bookId: string) => API.delete(`/books/${bookId}`);

// Borrowing/Returning APIs
export const borrowBook = (transactionData: { bookId: string; memberId: string }) =>
  API.post('/transactions/borrow', transactionData);

export const returnBook = (transactionData: { bookId: string; memberId: string; fine: number }) =>
  API.post('/transactions/return', transactionData);

// Search and Reports APIs
export const searchBooks = (query: string, filter: string) =>
  API.get(`/books/search?query=${query}&filter=${filter}`);

export const getReports = () => API.get('/reports');