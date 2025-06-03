import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    // Get total products
    const totalProducts = await prisma.product.count();
    
    // Get total revenue
    const totalRevenue = await prisma.transaction.aggregate({
      _sum: {
        totalPrice: true
      }
    });
    
    // Get top selling product
    const transactions = await prisma.transaction.groupBy({
      by: ['productId'],
      _count: {
        _all: true
      },
      orderBy: {
        _count: {
          _all: 'desc'
        }
      },
      take: 1
    });
    
    let topSellingProduct = null;
    if (transactions.length > 0) {
      const productId = transactions[0].productId;
      topSellingProduct = await prisma.product.findUnique({
        where: { id: productId }
      });
    }
    
    // Simulate a delay to demonstrate Suspense
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return NextResponse.json({
      totalProducts,
      totalRevenue: totalRevenue._sum.totalPrice || 0,
      topSellingProduct
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}