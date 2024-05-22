"use client";

import React from "react";
import Link from "next/link";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button, buttonVariants } from "@/components/ui/button";
import {
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
import { registerFormSchema } from "@/util/form-schema";
import { cn } from "@/lib/utils";
import { serverDomain } from "@/util/server";
import { useUserStore } from "@/store/user";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default function RegisterPage() {

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "firstname",
      lastName: "lastname",
      email: "",

      password: "123123",
      confirm: "123123",

      gender: Gender.MALE,
      birthdate: new Date(),

      address: {
        street: "street",
        barangay: "brangay",
        municipality: "muni",
        province: "province",
        country: "ph",
        zipcode: 6046,
      },
    },
  });

  const { setToken } = useUserStore();
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    try {
      const { data } = await axios.post('/api/auth/register', values);
  
      if (data.error) {
        toast({ title: "Register Error", description: data.error.message });
      } else {
        toast({ title: "Register Success", description: data.data.message });
        localStorage.setItem("token", data.data.token);
        setToken(data.data.token);
        router.push("/");
      }
    } catch (error) {
      console.error("Registration request failed:", error);
      toast({ title: "Register Error", description: "An unexpected error occurred." });
    }
  }


  return (
    <Card className="h-full w-full bg-secondary">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Begin your journey here...</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Firstname</FormLabel>
                    <FormDescription className="text-xs">Enter firstname</FormDescription>
                    <FormControl>
                      <Input placeholder="ex. Adrian" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Lastname</FormLabel>
                    <FormDescription className="text-xs">Enter lastname</FormDescription>
                    <FormControl>
                      <Input placeholder="ex. Sajulga" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormDescription className="text-xs">Use this to sign in to your account...</FormDescription>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="ex. valbolante@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Password</FormLabel>
                    <FormDescription className="text-xs">Try to achieve a strong password</FormDescription>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormDescription className="text-xs">Re-enter password for extra security...</FormDescription>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Birthdate</FormLabel>
                  <FormDescription className="text-xs">This will help improve user experience</FormDescription>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormDescription className="text-xs">Sorry this should be sex...</FormDescription>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="flex justify-start w-full"
                      defaultValue={Gender.MALE}
                      {...field}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={Gender.MALE} />
                        </FormControl>
                        <FormLabel className="font-normal">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={Gender.FEMALE} />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* -- address -- */}

            <Separator />

            <div className="my-8">
              <CardTitle className="text-md">Address</CardTitle>
              <CardDescription className="text-xs">So we could deliver our packages to your doorstep</CardDescription>
            </div>

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Street</FormLabel>
                    <FormDescription className="text-xs">Street where you live</FormDescription>
                    <FormDescription className="text-xs"></FormDescription>
                    <FormControl>
                      <Input placeholder="ex. N.A (lol)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.barangay"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Barangay</FormLabel>
                    <FormDescription className="text-xs">Barangay where you live</FormDescription>
                    <FormControl>
                      <Input placeholder="ex. Tungkop" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.municipality"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Municipality</FormLabel>
                    <FormDescription className="text-xs">Municipality where you live</FormDescription>
                    <FormControl>
                      <Input placeholder="ex. Minglanilla" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address.province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <FormDescription className="text-xs">Province where you live</FormDescription>
                  <FormControl>
                    <Input placeholder="ex. Cebu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormDescription className="text-xs">Province where you live</FormDescription>
                  <FormControl>
                    <Input placeholder="ex. Philippines" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.zipcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zipcode</FormLabel>
                  <FormDescription className="text-xs">Zipcode of the place where you live</FormDescription>
                  <FormControl>
                    <Input placeholder="ex. 6046" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Sign Up</Button>
            <p className="text-xs">By clicking continue, you agree to our <span className="underline"><Link href={"/terms"}>Terms and Conditions</Link></span> </p>

            <div className="flex gap-8 w-full items-center">
              <Separator className="flex-1" />
              <p className="text-xs">Or register using</p>
              <Separator className="flex-1" />
            </div>

            {/* TODO: add a google button here */}
            <Button type="button">Google (to be implemented)</Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <p className="text-xs">
          Already have an account?
          <Link
            href={"/login"}
            className={cn(buttonVariants({ variant: "link" }), "px-2 text-xs")}
          >
            Login now
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
