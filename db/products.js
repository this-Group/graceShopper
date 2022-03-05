const { client } = require("./client");

async function getAllProducts() {
    try {
      const { rows: products } = await client.query(
        `
        SELECT *
        FROM products;
        `
      );
      return products;
    } catch (error) {
      throw error;
    }
  }
  
  async function getProductById(productId) {
    try {
      const {
        rows: [product],
      } = await client.query(
        `
        SELECT *
        FROM products
        WHERE id = $1;
        `,
        [productId]
      );
      return product;
    } catch (error) {
      throw error;
    }
  }

  async function getProductByGenre(genre) {
    try {
      const { rows: products } = await client.query(
        `
        SELECT *
        FROM products
        WHERE genre = $1;
        `,
        [genre]
      );
      return products;
    } catch (error) {
      throw error;
    }
  }

  module.exports = {
    getAllProducts,
    getProductById,
    getProductByGenre
  };