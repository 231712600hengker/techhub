import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, price, stock, image, description } = body;

    // Validation
    if (!name || !price || !stock || !image || !description) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        image,
        description,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;

  try {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: {
          name: {
            contains: search,
            mode: 'insensitive'
          }
        },
        orderBy: {
          id: 'asc'
        },
        skip,
        take: limit,
      }),
      prisma.product.count({
        where: {
          name: {
            contains: search,
            mode: 'insensitive'
          }
        }
      })
    ]);
    
    return NextResponse.json({
      items: products,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}