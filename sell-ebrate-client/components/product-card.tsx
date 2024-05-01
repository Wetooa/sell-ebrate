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

export default function ProductCard({ product }: { product: Product }) {
  const { productName, price } = product;

  return (
    <Card className="">
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
