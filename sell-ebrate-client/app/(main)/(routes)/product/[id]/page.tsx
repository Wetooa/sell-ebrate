"use client";
import { serverDomain } from "@/util/server";
import { Product } from "@/util/types";
import axios from "axios";
import { useRouter, useParams } from 'next/navigation'
import React from 'react'

export default function ProductPage() {
  const { id } = useParams();


  // FIX: bruh dumbo man diay ni nga idea
  // const { data } = await axios.get(serverDomain + `product/{id}`);
  // const { productName, description, quantity, price } = data as Product;


  // TODO: logic where it grabs data about that product as well as comments, rating, and stuff



  return (
    <div>Product hwerwerwer</div>
  )
}

