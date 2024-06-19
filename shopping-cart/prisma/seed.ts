import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Check if the users already exist
  const userCount = await prisma.user.count();
  if (userCount === 0) {
    // Create Users
    const user1 = await prisma.user.create({
      data: {
        username: 'user1',
        password: 'password1', // In a real application, hash the password
      },
    });

    const user2 = await prisma.user.create({
      data: {
        username: 'user2',
        password: 'password2', // In a real application, hash the password
      },
    });

    // Check if the products already exist
    const productCount = await prisma.product.count();
    if (productCount === 0) {
      // Create Products
      const product1 = await prisma.product.create({
        data: {
          sku: 'sku001',
          price: 19.99,
          stock: 100,
          expiration: new Date('2025-12-31'),
        },
      });

      const product2 = await prisma.product.create({
        data: {
          sku: 'sku002',
          price: 29.99,
          stock: 50,
          expiration: new Date('2024-12-31'),
        },
      });

      const product3 = await prisma.product.create({
        data: {
          sku: 'sku003',
          price: 9.99,
          stock: 200,
          expiration: null,
        },
      });

      // Create Carts
      const cart1 = await prisma.cart.create({
        data: {
          userId: user1.id,
          productId: product1.id,
          quantity: 2,
        },
      });

      const cart2 = await prisma.cart.create({
        data: {
          userId: user1.id,
          productId: product2.id,
          quantity: 1,
        },
      });

      const cart3 = await prisma.cart.create({
        data: {
          userId: user2.id,
          productId: product3.id,
          quantity: 5,
        },
      });

      console.log({ user1, user2, product1, product2, product3, cart1, cart2, cart3 });
    } else {
      console.log('Products already exist');
    }
  } else {
    console.log('Users already exist');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
