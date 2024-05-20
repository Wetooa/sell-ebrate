"use client";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import axios from "axios";
import { serverDomain } from "@/util/server";
import { useUserStore } from "@/store/user";
import { useToast } from "@/components/ui/use-toast";
import { loginFormSchema } from "@/util/form-schema";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "adrian.sajulga@gmail.com",
      password: "123123",
    },
  });

  const { setToken, token } = useUserStore();
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const { data } = await axios({ url: serverDomain + "auth/login", method: "POST", data: values });

    if (data.error) {
      toast({ title: "Login Error", description: data.error.message });
    } else {
      toast({ title: "Login Success", description: data.data.message });
      localStorage.setItem("token", data.data.token);
      setToken(data.data.token);
      router.push("/");
    }
  }

  return (
    <Card className="w-full h-full bg-secondary">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials</CardDescription>
        <Separator />
      </CardHeader>


      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormDescription className="text-xs">The unique identifier of your account</FormDescription>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="jakebajo@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormDescription className="text-xs">Remember to keep your password secure!</FormDescription>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Login</Button>
            <p className="text-xs">By clicking continue, you agree to our <span className="underline"><Link href={"/terms"}>Terms and Conditions</Link></span> </p>

            <div className="flex gap-8 w-full items-center">
              <Separator className="flex-1" />
              <p className="text-xs">Or login using</p>
              <Separator className="flex-1" />
            </div>

            {/* TODO: add a google button here */}
            <Button type="button">Google (to be implemented)</Button>

          </form>

        </Form>
      </CardContent>

      <CardFooter>
        <p className="text-xs">
          Don&apos;t have an account yet?
          <Link
            href={"/register"}
            className={cn(buttonVariants({ variant: "link" }), "px-2 text-xs")}
          >
            Register now
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
