import React from 'react';

interface BookCardProps {
  title: string;
  author: string;
  isbn: string;
  status: 'available' | 'borrowed';
  onBorrow: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ title, author, isbn, status, onBorrow }) => {
  return (
    <div className="border rounded-md p-4 shadow hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700 mb-1"><strong>Author:</strong> {author}</p>
      <p className="text-gray-700 mb-1"><strong>ISBN:</strong> {isbn}</p>
      <p className={`mb-3 font-semibold ${status === 'available' ? 'text-green-600' : 'text-red-600'}`}>
        Status: {status.charAt(0).toUpperCase() + status.slice(1)}
      </p>
      {status === 'available' ? (
        <button
          onClick={onBorrow}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 w-full"
          aria-label={`Borrow ${title}`}
        >
          Borrow
        </button>
      ) : (
        <button
          disabled
          className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed w-full"
          aria-label={`${title} not available`}
        >
          Not Available
        </button>
      )}
    </div>
  );
};

export default BookCard;
