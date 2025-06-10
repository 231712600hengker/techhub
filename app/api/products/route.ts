import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { productId, buyerName, date } = body;

    // Validasi sederhana
    if (!productId || !buyerName) {
      return NextResponse.json(
        { error: "Product ID and buyer name are required" },
        { status: 400 }
      );
    }

    // Cek apakah produk ada
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Buat transaksi
    const transaction = await prisma.transaction.create({
      data: {
        productId: parseInt(productId),
        buyerName,
        date: date ? new Date(date) : new Date(),
        totalPrice: product.price, // harga diambil dari produk
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany()
    return NextResponse.json(products) // <-- array langsung
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}