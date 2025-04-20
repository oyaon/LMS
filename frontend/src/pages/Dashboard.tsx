import { useEffect, useState } from 'react';
import { getReports } from '../services';

const Dashboard = () => {
  const [mostBorrowed, setMostBorrowed] = useState([]);
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getReports();
        setMostBorrowed(response.data.mostBorrowed);
        setOverdueBooks(response.data.overdueBooks);
        setMessage('Reports fetched successfully!');
      } catch (error: any) {
        setMessage(error.response?.data?.message || 'Failed to fetch reports!');
      }
    };
    fetchReports();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {message && <p>{message}</p>}
      <div>
        <h2>Most Borrowed Books</h2>
        <ul>
          {mostBorrowed.map((book: any, index: number) => (
            <li key={index}>{book.title} by {book.author}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Overdue Books</h2>
        <ul>
          {overdueBooks.map((book: any, index: number) => (
            <li key={index}>{book.title} by {book.author}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;