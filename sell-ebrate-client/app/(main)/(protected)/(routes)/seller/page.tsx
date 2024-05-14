
"use client";

import React from "react";
import Link from "next/link";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button, buttonVariants } from "@/components/ui/button"; import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

import { Gender } from "@/util/types";
import { CalendarIcon } from "lucide-react";

import axios from "axios";
import { format } from "date-fns";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sellProductFormSchema } from "@/util/form-schema";
import { cn } from "@/lib/utils";
import { serverDomain } from "@/util/server";
import { useUserStore } from "@/store/user";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

export default function SellerPage() {
  const form = useForm<z.infer<typeof sellProductFormSchema>>({
    resolver: zodResolver(sellProductFormSchema),
    defaultValues: {
      productName: "",
      description: "",
      price: 0,
      quantity: 0
    },
  });

  const { setToken } = useUserStore();
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof sellProductFormSchema>) {

    const { data } = await axios.post(serverDomain + "product/sell", {
      ...values,
    });

    if (data.error) {
      // TODO: error toast here
      toast({ title: "Sell Product Error", description: data.error.message });
    } else {
      // TODO: good toast here
      toast({ title: "Sell Product Success", description: data.data.message });
    }
  }


  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Sell Product</CardTitle>
        <CardDescription>insert cool desc</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="flex flex-col gap-2">

              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jake" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Jake" {...field} />
                    </FormControl>
                    <FormDescription>
                      Make sure to describe the thing well
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Jake" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Jake" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <Button type="submit">Sell Product</Button>
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <p>
          Sell Product footer i dint know
          <Link
            href={"/login"}
            className={cn(buttonVariants({ variant: "link" }), "px-2")}
          >
            Login now
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
