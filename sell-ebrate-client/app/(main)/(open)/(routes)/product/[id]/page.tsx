"use client";

import { serverDomain } from "@/util/server";
import { Product } from "@/util/types";
import axios from "axios";
import { useRouter, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function useGetProduct(productId: string) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {

      const { data } = await axios({
        method: "post",
        url: serverDomain + `product/single`,
        data: { productId },
      });
      setProduct(data);
    };
    fetchProfile();
  }, []);

  return product;
}

export default function ProductPage() {
  const { id } = useParams();


  if (!id) {
    return <></>
  }

  const product = useGetProduct(id as string);

  // TODO: logic where it grabs data about that product as well as comments, rating, and stuff


  return (
    <div>{product}</div>
  )
}

