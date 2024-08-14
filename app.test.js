const request = require('supertest');
const app = require('./app');

describe('Book Collection API', () => {
    let bookId;

    it('should add a new book', async () => {
        const res = await request(app)
            .post('/api/books')
            .send({ title: '1984', author: 'George Orwell', year: 1949 });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('title', '1984');
        bookId = res.body.id;
    });

    it('should retrieve all books', async () => {
        const res = await request(app).get('/api/books');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should retrieve a book by ID', async () => {
        const res = await request(app).get(`/api/books/${bookId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', bookId);
    });

    it('should update a book', async () => {
        const res = await request(app)
            .put(`/api/books/${bookId}`)
            .send({ title: 'Animal Farm' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'Animal Farm');
    });

    it('should delete a book', async () => {
        const res = await request(app).delete(`/api/books/${bookId}`);
        expect(res.statusCode).toEqual(200);
    });
});