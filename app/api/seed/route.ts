import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    // Clear existing data
    await prisma.transaction.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({});

    // Seed Products
    const products = await prisma.product.createMany({
      data: [
        {
          name: 'Premium Coffee Beans',
          price: 25.99,
          stock: 100,
          image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg',
          description: 'Premium arabica coffee beans sourced from the highlands of Ethiopia. Perfect for your morning brew.',
        },
        {
          name: 'Automatic Coffee Machine',
          price: 299.99,
          stock: 30,
          image: 'https://images.pexels.com/photos/4820815/pexels-photo-4820815.jpeg',
          description: 'State-of-the-art automatic coffee machine with built-in grinder and milk frother.',
        },
        {
          name: 'Ceramic Coffee Mug Set',
          price: 45.99,
          stock: 75,
          image: 'https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg',
          description: 'Set of 4 handcrafted ceramic mugs, perfect for your daily coffee ritual.',
        },
        {
          name: 'Coffee Grinder',
          price: 79.99,
          stock: 50,
          image: 'https://images.pexels.com/photos/6205791/pexels-photo-6205791.jpeg',
          description: 'Professional grade coffee grinder with adjustable settings for the perfect grind every time.',
        },
        {
          name: 'Pour-Over Coffee Kit',
          price: 59.99,
          stock: 40,
          image: 'https://images.pexels.com/photos/6062002/pexels-photo-6062002.jpeg',
          description: 'Complete pour-over coffee kit including glass carafe, filter, and stand.',
        }
      ]
    });

    // Get all products
    const allProducts = await prisma.product.findMany();
    
    // Seed Transactions
    const transactions = await prisma.transaction.createMany({
      data: [
        {
          productId: allProducts[0].id,
          buyerName: 'John Smith',
          totalPrice: 51.98,
          date: new Date('2023-04-15'),
        },
        {
          productId: allProducts[1].id,
          buyerName: 'Sarah Johnson',
          totalPrice: 299.99,
          date: new Date('2023-04-16'),
        },
        {
          productId: allProducts[2].id,
          buyerName: 'Michael Brown',
          totalPrice: 45.99,
          date: new Date('2023-04-17'),
        },
        {
          productId: allProducts[3].id,
          buyerName: 'Emily Davis',
          totalPrice: 159.98,
          date: new Date('2023-04-18'),
        },
        {
          productId: allProducts[4].id,
          buyerName: 'David Wilson',
          totalPrice: 59.99,
          date: new Date('2023-04-19'),
        }
      ]
    });

    // Seed Users
    const users = await prisma.user.createMany({
      data: [
        {
          username: 'admin123',
          password: '12345',
          role: 'admin'
        },
        {
          username: 'user123',
          password: '12345',
          role: 'user'
        }
      ]
    });

    return NextResponse.json({ 
      message: 'Database seeded successfully', 
      products: await prisma.product.count(),
      transactions: await prisma.transaction.count(),
      users: await prisma.user.count()
    });

  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}