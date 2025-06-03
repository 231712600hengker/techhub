const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    // Clear existing data
    await prisma.transaction.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({});

    console.log('Cleared existing data');

    // Seed Products
    const products = await prisma.product.createMany({
      data: [
        {
          name: 'Samsung Galaxy S24 Ultra',
          price: 21999000,
          stock: 50,
          image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
          description: 'Flagship smartphone with advanced AI features, 200MP camera, and S Pen functionality. Experience the future of mobile technology.',
        },
        {
          name: 'MacBook Pro M3',
          price: 24999000,
          stock: 30,
          image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg',
          description: 'Professional laptop featuring the M3 chip, 14-inch Liquid Retina XDR display, and up to 18 hours of battery life.',
        },
        {
          name: 'Sony WH-1000XM5',
          price: 5299000,
          stock: 75,
          image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
          description: 'Premium noise-canceling headphones with industry-leading audio quality and up to 30 hours of battery life.',
        },
        {
          name: 'iPad Pro 12.9"',
          price: 15999000,
          stock: 45,
          image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
          description: 'Powerful tablet with M2 chip, Liquid Retina XDR display, and Apple Pencil support for professional creative work.',
        },
        {
          name: 'DJI Mini 4 Pro',
          price: 12999000,
          stock: 25,
          image: 'https://images.pexels.com/photos/1087180/pexels-photo-1087180.jpeg',
          description: 'Compact drone with 4K/60fps camera, obstacle avoidance, and up to 34 minutes of flight time.',
        },
        {
          name: 'Apple Watch Series 9',
          price: 7299000,
          stock: 60,
          image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
          description: 'Advanced smartwatch with health monitoring, fitness tracking, and seamless iOS integration.',
        },
        {
          name: 'Nintendo Switch OLED',
          price: 4999000,
          stock: 40,
          image: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg',
          description: 'Gaming console with vibrant OLED display, perfect for both handheld and TV mode gaming.',
        },
        {
          name: 'Canon EOS R6 Mark II',
          price: 32999000,
          stock: 15,
          image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
          description: 'Professional mirrorless camera with advanced autofocus and 4K60p video capabilities.',
        },
        {
          name: 'LG C3 OLED 65"',
          price: 28999000,
          stock: 20,
          image: 'https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg',
          description: 'Premium OLED TV with perfect blacks, gaming features, and smart functionality.',
        },
        {
          name: 'Bose QuietComfort Ultra',
          price: 6499000,
          stock: 55,
          image: 'https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg',
          description: 'Premium wireless earbuds with immersive audio and advanced noise cancellation.',
        },
        {
          name: 'ASUS ROG Strix G16',
          price: 27999000,
          stock: 25,
          image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg',
          description: 'Gaming laptop with RTX 4070, Intel Core i9, and 16-inch QHD 240Hz display.',
        },
        {
          name: 'GoPro HERO12 Black',
          price: 7199000,
          stock: 35,
          image: 'https://images.pexels.com/photos/1787236/pexels-photo-1787236.jpeg',
          description: 'Action camera with 5.3K video, HDR, and advanced stabilization.',
        },
        {
          name: 'Samsung Galaxy Tab S9 Ultra',
          price: 19999000,
          stock: 30,
          image: 'https://images.pexels.com/photos/1334598/pexels-photo-1334598.jpeg',
          description: '14.6-inch tablet with S Pen, Snapdragon 8 Gen 2, and DeX productivity.',
        },
        {
          name: 'Sony PlayStation 5',
          price: 8999000,
          stock: 40,
          image: 'https://images.pexels.com/photos/13139097/pexels-photo-13139097.jpeg',
          description: 'Next-gen gaming console with ray tracing, fast loading, and DualSense controller.',
        },
        {
          name: 'iPhone 15 Pro Max',
          price: 22999000,
          stock: 45,
          image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
          description: 'Premium smartphone with A17 Pro chip, titanium design, and pro camera system.',
        }
      ]
    });

    console.log('Added product data');

    // Get all products
    const allProducts = await prisma.product.findMany();
    
    // Seed Transactions
    const transactions = await prisma.transaction.createMany({
      data: [
        {
          productId: allProducts[0].id,
          buyerName: 'Budi Santoso',
          totalPrice: 21999000,
          date: new Date('2024-02-15'),
        },
        {
          productId: allProducts[1].id,
          buyerName: 'Dewi Kusuma',
          totalPrice: 24999000,
          date: new Date('2024-02-16'),
        },
        {
          productId: allProducts[2].id,
          buyerName: 'Ahmad Hidayat',
          totalPrice: 5299000,
          date: new Date('2024-02-17'),
        },
        {
          productId: allProducts[3].id,
          buyerName: 'Siti Rahayu',
          totalPrice: 15999000,
          date: new Date('2024-02-18'),
        },
        {
          productId: allProducts[4].id,
          buyerName: 'Rudi Wijaya',
          totalPrice: 12999000,
          date: new Date('2024-02-19'),
        },
        {
          productId: allProducts[5].id,
          buyerName: 'Nina Putri',
          totalPrice: 7299000,
          date: new Date('2024-02-20'),
        },
        {
          productId: allProducts[6].id,
          buyerName: 'Eko Prasetyo',
          totalPrice: 4999000,
          date: new Date('2024-02-21'),
        },
        {
          productId: allProducts[7].id,
          buyerName: 'Maya Sari',
          totalPrice: 32999000,
          date: new Date('2024-02-22'),
        },
        {
          productId: allProducts[8].id,
          buyerName: 'Doni Kusuma',
          totalPrice: 28999000,
          date: new Date('2024-02-23'),
        },
        {
          productId: allProducts[9].id,
          buyerName: 'Rina Wati',
          totalPrice: 6499000,
          date: new Date('2024-02-24'),
        },
        {
          productId: allProducts[10].id,
          buyerName: 'Agus Setiawan',
          totalPrice: 27999000,
          date: new Date('2024-02-25'),
        },
        {
          productId: allProducts[11].id,
          buyerName: 'Linda Wijaya',
          totalPrice: 7199000,
          date: new Date('2024-02-26'),
        },
        {
          productId: allProducts[12].id,
          buyerName: 'Hendra Gunawan',
          totalPrice: 19999000,
          date: new Date('2024-02-27'),
        },
        {
          productId: allProducts[13].id,
          buyerName: 'Yuni Hartati',
          totalPrice: 8999000,
          date: new Date('2024-02-28'),
        },
        {
          productId: allProducts[14].id,
          buyerName: 'Bambang Sutrisno',
          totalPrice: 22999000,
          date: new Date('2024-02-29'),
        },
        {
          productId: allProducts[0].id,
          buyerName: 'Ratna Sari',
          totalPrice: 21999000,
          date: new Date('2024-03-01'),
        },
        {
          productId: allProducts[1].id,
          buyerName: 'Dedi Kurniawan',
          totalPrice: 24999000,
          date: new Date('2024-03-02'),
        },
        {
          productId: allProducts[2].id,
          buyerName: 'Wati Susanti',
          totalPrice: 5299000,
          date: new Date('2024-03-03'),
        },
        {
          productId: allProducts[3].id,
          buyerName: 'Joko Widodo',
          totalPrice: 15999000,
          date: new Date('2024-03-04'),
        },
        {
          productId: allProducts[4].id,
          buyerName: 'Sri Wahyuni',
          totalPrice: 12999000,
          date: new Date('2024-03-05'),
        }
      ]
    });

    console.log('Added transaction data');

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

    console.log('Added user data');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();