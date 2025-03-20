class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}

const errorDictionary = {
    PRODUCT_NOT_FOUND: {
        message: 'Produto não encontrado.',
        statusCode: 404,
    },
    INVALID_PRODUCT_DATA: {
        message: 'Dados do produto inválidos.',
        statusCode: 400,
    },
    CART_NOT_FOUND: {
        message: 'Carrinho não encontrado.',
        statusCode: 404,
    },
    OUT_OF_STOCK: {
        message: 'Produto fora de estoque.',
        statusCode: 400,
    },
};

module.exports = { CustomError, errorDictionary };