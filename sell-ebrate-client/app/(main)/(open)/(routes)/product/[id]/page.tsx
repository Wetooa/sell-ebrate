"use client";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user";
import { serverDomain } from "@/util/server";
import { Product } from "@/util/types";
import axios from "axios";
import { useRouter, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function useGetProduct(productId: string) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {

      const { data } = await axios({
        method: "GET",
        url: serverDomain + `product/single`,
        params: { productId },
      });

      setProduct(data.data.product);
    };
    fetchProduct();
  }, []);

  return product;
}

export default function ProductPage() {
  const { id } = useParams();
  const { token } = useUserStore();


  if (!id) {
    return <></>
  }

  const product = useGetProduct(id as string) as any;

  // TODO: logic where it grabs data about that product as well as comments, rating, and stuff

  if (!product) { return <></> }


  async function addToCart() {

    const { data } = await axios({ method: "POST", url: serverDomain + "/cart", data: { "productId": id }, headers: { "Authorization": token } })

  }

  async function buyProduct() {

    const { data } = await axios({ method: "POST", url: serverDomain + "/product/buy", data: { "productId": id }, headers: { "Authorization": token } })

  }



  return (
    <div className="">

      <div className="p-5 flex">
        <div className="w-1/3">
          <div className="w-full aspect-square bg-gray-200">
          </div>
        </div>

        <div className="p-2 flex flex-col">

          <div>
            <h3 className="flex-1 text-2xl font-bold ">
              {product.productName}
            </h3>
            <p>
              {product.description}
            </p>
            <p>
              Php {product.price}
            </p>
          </div>

          <div className="mt-auto">
            <Button onClick={buyProduct}>Buy</Button>
            <Button onClick={addToCart}>Add to cart</Button>
          </div>
        </div>

      </div>

      <div className="p-5 mt-2">
        Seller: {product.firstName + " " + product.lastName}
      </div>

    </div>
  )
}

