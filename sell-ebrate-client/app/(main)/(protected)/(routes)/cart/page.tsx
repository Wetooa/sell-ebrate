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
    const fetchCart = async () => {
      try {
        const { data } = await axios.get("/api/cart", {
          headers: {
            Authorization: token,
          },
        });

        setCart(data.data.cart);

        if (data.error) {
          toast({ title: "Cart Fetch Error", description: data.error.message });
        } else {
          toast({ title: "Cart Fetch Success", description: data.data.message });
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        // TODO: Implement error handling, e.g., toast error message
      }
    };

    fetchCart();
  }, [token, toast]);

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
    <div className="grid grid-cols-4 p-2 gap-4 justify-between">

      {cart.map((product) => {
        return <ProductCard key={product.productId} product={product} />;
      })}


    </div>
  )
}

