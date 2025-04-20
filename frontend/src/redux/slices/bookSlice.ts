import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  status: 'available' | 'borrowed';
}

interface BooksState {
  books: Book[];
}

const initialState: BooksState = {
  books: [],
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<Book[]>) {
      state.books = action.payload;
    },
    borrowBook(state, action: PayloadAction<number>) {
      const book = state.books.find(b => b.id === action.payload);
      if (book && book.status === 'available') {
        book.status = 'borrowed';
      }
    },
    returnBook(state, action: PayloadAction<number>) {
      const book = state.books.find(b => b.id === action.payload);
      if (book && book.status === 'borrowed') {
        book.status = 'available';
      }
    },
  },
});

export const { setBooks, borrowBook, returnBook } = bookSlice.actions;
export default bookSlice.reducer;
