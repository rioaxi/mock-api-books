const chance = require("chance").Chance();

module.exports = () => {
    return {
        bookId: chance.integer({ min: 1, max: 30 }),
        title: chance.word({ length: 10, capitalize: true }),
        author: chance.name({}),
        year: chance.year({ min:1900, max: 2024}),
    };
};