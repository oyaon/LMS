import React, { useState } from 'react';
import { searchBooks } from '../services';

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('title');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await searchBooks(searchTerm, filter);
      setResults(response.data);
      setMessage('Search completed successfully!');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Search failed!');
    }
  };

  return (
    <div>
      <h1>Book Search</h1>
      <form onSubmit={handleSearch}>
        <div>
          <label>Search:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for books"
            required
          />
        </div>
        <div>
          <label>Filter By:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            title="Filter books by"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="genre">Genre</option>
            <option value="status">Status</option>
          </select>
        </div>
        <button type="submit">Search</button>
      </form>
      {message && <p>{message}</p>}
      <ul>
        {results.map((book: any, index: number) => (
          <li key={index}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookSearch;