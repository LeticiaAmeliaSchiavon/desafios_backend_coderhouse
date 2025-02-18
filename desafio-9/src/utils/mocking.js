const { faker } = require('@faker-js/faker'); // Importação correta do faker

class Mocking {
    static generateMockProducts(count = 100) {
        const products = [];
        for (let i = 0; i < count; i++) {
            products.push({
                _id: faker.datatype.uuid(),
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                thumbnail: faker.image.imageUrl(),
                code: faker.datatype.uuid(),
                stock: faker.datatype.number({ min: 10, max: 100 }),
            });
        }
        return products;
    }
}

module.exports = Mocking;