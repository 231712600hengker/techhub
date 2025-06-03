import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;

  try {
    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where: {
          OR: [
            {
              buyerName: {
                contains: search,
                mode: 'insensitive'
              }
            },
            {
              product: {
                name: {
                  contains: search,
                  mode: 'insensitive'
                }
              }
            }
          ]
        },
        include: {
          product: true
        },
        orderBy: {
          date: 'desc'
        },
        skip,
        take: limit,
      }),
      prisma.transaction.count({
        where: {
          OR: [
            {
              buyerName: {
                contains: search,
                mode: 'insensitive'
              }
            },
            {
              product: {
                name: {
                  contains: search,
                  mode: 'insensitive'
                }
              }
            }
          ]
        }
      })
    ]);
    
    return NextResponse.json({
      items: transactions,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const product = await prisma.product.findUnique({
      where: { id: parseInt(body.productId) }
    });
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    const transaction = await prisma.transaction.create({
      data: {
        productId: parseInt(body.productId),
        buyerName: body.buyerName,
        totalPrice: product.price,
        date: new Date(body.date || Date.now())
      }
    });
    
    await prisma.product.update({
      where: { id: parseInt(body.productId) },
      data: { stock: product.stock - 1 }
    });
    
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}