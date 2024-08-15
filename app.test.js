const request = require('supertest');
const app = require('./app');

describe('Book Collection API', () => {

    let token;

    beforeAll(async () => {
        const res = await request(app)
            .post('/login')
            .send({
                username: 'testuser',
                password: 'password'
            });
        token = res.body.token;
    });
    
    // Test GET all books
    it('should return all books', async () => {
        const res = await request(app).get('/books').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(30); // assuming no books have been added or deleted
    });

    // Test GET a book by ID
    it('should return a book by ID', async () => {
        const res = await request(app).get('/books/1').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', 1);
    });

    // Test GET a non-existent book
    it('should return 404 for a non-existent book', async () => {
        const res = await request(app).get('/books/999').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error', 'Book not found');
    });

    // Test POST a new book
    it('should create a new book', async () => {
        const newBook = {
            title: 'Test Book',
            author: 'Test Author',
            year: 2023
        };
        const res = await request(app)
            .post('/books')
            .set('Authorization', `Bearer ${token}`)
            .send(newBook);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toMatchObject(newBook);
    });

    // Test POST with missing fields
    it('should return 400 for missing fields when creating a book', async () => {
        const incompleteBook = {
            title: 'Incomplete Book'
        };
        const res = await request(app)
            .post('/books')
            .set('Authorization', `Bearer ${token}`)
            .send(incompleteBook);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'Title, author, and year are required');
    });

    // Test PUT (update) a book
    it('should update an existing book', async () => {
        const updatedBook = {
            title: 'Updated Book',
            author: 'Updated Author',
            year: 2024
        };
        const res = await request(app)
            .put('/books/1')
            .set('Authorization', `Bearer ${token}`)
            .send(updatedBook);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject(updatedBook);
    });

    // Test PUT for a non-existent book
    it('should return 404 for a non-existent book when updating', async () => {
        const updatedBook = {
            title: 'Non-Existent Book',
            author: 'Non-Existent Author',
            year: 2025
        };
        const res = await request(app)
            .put('/books/999')
            .set('Authorization', `Bearer ${token}`)
            .send(updatedBook);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error', 'Book not found');
    });

    // Test DELETE a book
    it('should delete an existing book', async () => {
        const res = await request(app).delete('/books/1').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toHaveProperty('id', 1);
    });

    // Test DELETE for a non-existent book
    it('should return 404 for a non-existent book when deleting', async () => {
        const res = await request(app).delete('/books/999').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error', 'Book not found');
    });
});

