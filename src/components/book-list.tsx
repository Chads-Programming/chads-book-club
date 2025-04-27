import { OpenLibraryBook } from "@/api/types/open-library-book.type";
import React from "react";

interface BookListProps {
  books: OpenLibraryBook[];
  onBookClick: (book: OpenLibraryBook) => void;
}

interface BookListItemProps {
  book: OpenLibraryBook;
}

const BookListItem = ({ book }: BookListItemProps) => {
  return (
    <article>
      <header>
        <h3>{book.title}</h3>
        <p>{book.author_name?.join(", ")}</p>
      </header>
      <div>♥️♥️♥️♥️♥️</div>
    </article>
  );
};

export const BookList = ({ books, onBookClick }: BookListProps) => {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.key} onClick={() => onBookClick(book)}>
          <BookListItem book={book} />
        </li>
      ))}
    </ul>
  );
};
