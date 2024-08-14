const express = require('express');
const app = express();

app.use(express.json());

let books = [
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
    { id: 2, title: '1984', author: 'George Orwell', year: 1949 },
    { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813 },
    { id: 4, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
    { id: 5, title: 'Moby-Dick', author: 'Herman Melville', year: 1851 },
    { id: 6, title: 'War and Peace', author: 'Leo Tolstoy', year: 1869 },
    { id: 7, title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 1951 },
    { id: 8, title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937 },
    { id: 9, title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', year: 1866 },
    { id: 10, title: 'Anna Karenina', author: 'Leo Tolstoy', year: 1877 },
    { id: 11, title: 'The Adventures of Huckleberry Finn', author: 'Mark Twain', year: 1884 },
    { id: 12, title: 'Brave New World', author: 'Aldous Huxley', year: 1932 },
    { id: 13, title: 'Jane Eyre', author: 'Charlotte Brontë', year: 1847 },
    { id: 14, title: 'Wuthering Heights', author: 'Emily Brontë', year: 1847 },
    { id: 15, title: 'Norwegian Wood', author: 'Haruki Murakami', year: 1987 },
    { id: 16, title: 'Les Misérables', author: 'Victor Hugo', year: 1862 },
    { id: 17, title: 'IT', author: 'Stephen King', year: 1986 },
    { id: 18, title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', year: 1880 },
    { id: 19, title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', year: 1967 },
    { id: 20, title: 'The Divine Comedy', author: 'Dante Alighieri', year: 1320 },
    { id: 21, title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', year: 1890 },
    { id: 22, title: 'Madame Bovary', author: 'Gustave Flaubert', year: 1856 },
    { id: 23, title: 'Don Quixote', author: 'Miguel de Cervantes', year: 1605 },
    { id: 24, title: 'Frankenstein', author: 'Mary Shelley', year: 1818 },
    { id: 25, title: 'The Count of Monte Cristo', author: 'Alexandre Dumas', year: 1844 },
    { id: 26, title: 'The Grapes of Wrath', author: 'John Steinbeck', year: 1939 },
    { id: 27, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', year: 1954 },
    { id: 28, title: 'Dracula', author: 'Bram Stoker', year: 1897 },
    { id: 29, title: 'The Metamorphosis', author: 'Franz Kafka', year: 1915 },
    { id: 30, title: 'The Old Man and the Sea', author: 'Ernest Hemingway', year: 1952 }
];


// List all books
app.get('/books', (req, res) => {
    res.json(books);
});


// GET a book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
});


// Add a new book (ID, title, author, year)
app.post('/books', (req, res) => {
    const { title, author, year } = req.body;

    if (!title || !author || !year) {
        return res.status(400).json({ error: 'Title, author, and year are required' });
    }

    const newBook = {
        id: books.length + 1,
        title,
        author,
        year
    };
    books.push(newBook);
    res.status(201).json(newBook);
});


// Update a book by ID
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    const { title, author, year } = req.body;
    if (!title && !author && !year) {
        return res.status(400).json({ error: 'At least one of title, author, or year must be provided to update' });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.year = year || book.year;

    res.json(book);
});


// Delete a book by ID
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    const deletedBook = books.splice(bookIndex, 1);
    res.json(deletedBook);
});


// Handle undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});


// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Book Collection API is running on http://localhost:${port}`);
});

module.exports = app;