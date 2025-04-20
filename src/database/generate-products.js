import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const categories = [
  'Electronics',
  'Wearables',
  'Food & Beverages',
  'Photography',
  'Fitness',
  'Accessories',
  'Home',
  'Kitchen',
  'Nutrition',
  'Sports',
  'Books',
  'Music',
  'Movies',
  'Gaming',
  'Toys',
  'Beauty',
  'Health',
  'Office',
  'Pets',
  'Garden',
];

function generateProduct(id) {
  const category = faker.helpers.arrayElement(categories);
  const price = faker.commerce.price({ min: 1, max: 5000, dec: 2 });
  const rating = faker.number.float({ min: 2.5, max: 5, precision: 0.1 });
  const stock = faker.number.int({ min: 1, max: 200 });

  const date = faker.date
    .between({
      from: '2022-09-15T00:00:00.000Z',
      to: '2025-03-15T00:00:00.000Z',
    })
    .toISOString();

  return {
    id: id,
    title: faker.commerce.productName(),
    category: category,
    date: date,
    price: parseFloat(price),
    description: faker.commerce.productDescription(),
    stock: stock,
    rating: parseFloat(rating.toFixed(1)),
  };
}

const products = [];
for (let i = 0; i < 10000; i++) {
  products.push(generateProduct(i));
}

const dbData = {
  products: products,
};

// Write to file with proper formatting
const dbPath = path.join(__dirname, 'db.json');
fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

console.log('Successfully created db.json with 10,000 products');
