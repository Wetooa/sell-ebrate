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
import { DollarSign } from "lucide-react";
import { Badge } from "../ui/badge";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { productName, price, description } = product;

  return (
    <button className="" onClick={() => router.push(`/product/${product.productId}`)} >
      <Card className="transition-all rounded-lg hover:opacity-80 cursor-pointer flex flex-col text-start">

        <div className="w-full aspect-square bg-gray-300 rounded-tl-lg rounded-tr-lg">
        </div>

        <CardHeader>
          <CardTitle>{productName}</CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </CardHeader>
        <CardContent className="">
          <p className="text-primary">₱ {price}</p>
        </CardContent>
        <CardFooter className="flex gap-2 items-center flex-wrap">
          <Badge>Lorem</Badge>
          <Badge>Lorem</Badge>
          <Badge>Lorem</Badge>
          <Badge>Lorem</Badge>
        </CardFooter>
      </Card>
    </button>
  );
}
