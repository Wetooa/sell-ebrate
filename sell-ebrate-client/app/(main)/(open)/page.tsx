import React from "react";
import axios from "axios";
import { serverDomain } from "@/util/server";
import ProductCard from "@/components/product/product-card";
import { Product } from "@/util/types";

export default async function Home() {
  const { data } = await axios.get(serverDomain + "product");



  return (
    <main>
      <div className="grid grid-cols-4 p-2 gap-4 justify-between">
        {data.data.products.map((product: Product) => {
          return <ProductCard key={product.productId} product={product} />;
        })}
      </div>
    </main>
  );
}
