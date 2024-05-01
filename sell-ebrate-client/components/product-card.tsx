"use client";
import React from "react";

import { Product } from "@/util/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { productName, price } = product;

  return (
    <Card onClick={() => router.push(`/product/${product.productId}`)} className="hover:scale-105 cursor-pointer">
      <CardHeader>
        <CardTitle>{productName}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Php {price}</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
