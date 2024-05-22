"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/store/user";
import { serverDomain } from "@/util/server";
import axios from "axios";
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { MinusIcon, PlusIcon } from "lucide-react";
import ReviewCard from "@/components/review/review-card";

function useGetProduct(productId: string) {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data: p } = await axios.get('/api/product/single', {
          params: { productId },
        });

        const { data: r } = await axios.get('/api/review', {
          params: { productId },
        });

        setProduct(p.data.product);
        setReviews(r.data.reviews);
      } catch (error) {
        console.error("Failed to fetch product or reviews:", error);
        // TODO: Implement error handling, e.g., toast error message
      }
    };

    fetchProduct();
  }, [productId]);

  return [product, reviews];
}


export default function ProductPage() {
  const { id } = useParams();
  const { token } = useUserStore();
  const { toast } = useToast();

  const [quantity, setQuantity] = useState(1);

  if (!id) { return <></> }

  const [product, reviews] = useGetProduct(id as string) as any;

  // TODO: logic where it grabs data about that product as well as comments, rating, and stuff

  if (!product) { return <></> }

  async function addToCart() {
    try {
      const { data } = await axios.post("/api/cart", { productId: id }, {
        headers: {
          Authorization: token
        }
      });
  
      if (data.error) {
        toast({ title: "Add to Cart Error", description: data.error.message });
      } else {
        toast({ title: "Add to Cart Success", description: data.data.message });
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      // TODO: Implement error handling, e.g., toast error message
    }
  }
  
  async function buyProduct() {
    try {
      const { data } = await axios.post("/api/product/buy", { productId: id }, {
        headers: {
          Authorization: token
        }
      });
  
      // Handle response if needed
    } catch (error) {
      console.error("Failed to buy product:", error);
      // TODO: Implement error handling, e.g., toast error message
    }
  }



  return (
    <div className="">

      <div className="p-5 flex">
        <div className="w-1/3">
          <div className="w-full aspect-square bg-gray-200">
          </div> </div>

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



            <Drawer>
              <DrawerTrigger asChild>
                <Button >Add to cart</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>

                  <DrawerTitle>Buying {product.productName}</DrawerTitle>
                  <DrawerDescription className="flex">
                    <div className="w-1/4 aspect-square bg-gray-200  ">
                    </div>

                    <div>
                      <p>{product.description}</p>
                      <p>Php {product.price}</p>

                      <div className="flex">
                        <Button variant={"default"} onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                          <MinusIcon />
                        </Button>
                        <span className="text-md font-normal p-2">
                          {quantity}
                        </span>
                        <Button variant={"default"} onClick={() => setQuantity(quantity + 1)}>
                          <PlusIcon />
                        </Button>
                      </div>
                    </div>

                  </DrawerDescription>

                </DrawerHeader>
                <DrawerFooter>

                  <Button onClick={addToCart}>Add to Cart</Button>

                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>

                </DrawerFooter>
              </DrawerContent>
            </Drawer>

          </div>
        </div>

      </div>

      <div className="p-5 mt-2">
        Seller: {product.firstName + " " + product.lastName}
      </div>


      <div>
        {reviews.map((review: any) => {
          return (
            <ReviewCard key={review.reviewId} review={review} />
          )
        })}

      </div>

    </div>
  )
}

