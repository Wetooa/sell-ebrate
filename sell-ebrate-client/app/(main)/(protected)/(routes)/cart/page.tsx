"use client"

import ProductCard from '@/components/product/product-card';
import { useToast } from '@/components/ui/use-toast';
import { useUserStore } from '@/store/user';
import { serverDomain } from '@/util/server';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


function useGetCart(token: string) {
  const [cart, setCart] = useState<null | any[]>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {

      const { data } = await axios({
        method: "GET",
        url: serverDomain + `cart`,
        headers: {
          "Authorization": token
        }
      });

      setCart(data.data.cart);

      if (data.error) {
        toast({ title: "Cart Fetch Error", description: data.error.message });
      } else {
        toast({ title: "Cart Fetch Success", description: data.data.message });
      }

    };
    fetchProduct();
  }, [token]);

  return cart;
}


export default function CartPage() {
  const { token } = useUserStore();
  const router = useRouter();

  if (!token) {
    router.push("/login");
  }


  const cart = useGetCart(token);

  if (!cart) return null;

  return (
    <div>

      {cart.map((product) => {
        return <ProductCard key={product.productId} product={product} />;
      })}


    </div>
  )
}

