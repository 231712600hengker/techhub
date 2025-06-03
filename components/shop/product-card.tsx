import Link from "next/link";
import Image from "next/image";
import { Product } from "@prisma/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/shop/${product.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
            width={300}
            height={300}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="line-clamp-1 text-lg font-medium">{product.name}</h3>
          <p className="line-clamp-2 mt-1 text-sm text-muted-foreground">
            {product.description.substring(0, 100)}
            {product.description.length > 100 ? '...' : ''}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-4">
          <p className="font-semibold">{formatCurrency(product.price)}</p>
          <p className="text-sm text-muted-foreground">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}