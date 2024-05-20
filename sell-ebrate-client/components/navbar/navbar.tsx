"use client";

import { ModeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import {
  CircleDollarSign,
  CreditCard,
  FacebookIcon,
  Instagram,
  LogOut,
  MessageSquare,
  PlusCircle,
  SearchIcon,
  Settings,
  Shield,
  ShoppingCart,
  TwitterIcon,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/user";
import axios from "axios";
import { serverDomain } from "@/util/server";
import { useRouter } from "next/navigation";



function useGetProfile(token: string | null) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await axios({
        method: "GET", url: serverDomain + "profile/self", headers: {
          Authorization: token
        }
      });

      // TODO: toast here

      setProfile(data.data.user);
    };
    fetchProfile();
  }, [token]);

  return profile;
}


export default function Navbar() {

  const { token, removeToken } = useUserStore();
  const profile = useGetProfile(token);
  const router = useRouter();


  async function logout() {
    localStorage.removeItem("token");
    removeToken();
    router.push("/login");
  }


  return (
    <nav className="w-full">
      <div className="px-32 bg-secondary-foreground text-secondary z-50">
        <div className="flex items-center px-6 py-4 gap-2" >

          <Link href={"/"} className="mx-6">
            <h1 className="font-bold">
              <CircleDollarSign />
            </h1>
          </Link>

          <div className="flex w-full">
            <Input className="rounded-tl-full rounded-bl-full " />
            <Button className="rounded-tr-full rounded-br-full px0 py-1 text-primary" variant={"outline"}>
              <SearchIcon />
            </Button>
          </div>


          <div>
            {
              profile ?
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="hover:black" variant={"ghost"}>
                      Welcome {profile.firstName} {profile.lastName}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>

                      <DropdownMenuItem asChild>
                        <Link href={"/profile"} >
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href={"/orders"} >
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Orders</span>
                          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        <span>Cart</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>

                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>

                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>

                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              <span>Others</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem>
                              <PlusCircle className="mr-2 h-4 w-4" />
                              <span>More...</span>
                            </DropdownMenuItem>

                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>

                    </DropdownMenuGroup>

                    <DropdownMenuLabel>Other Links</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                      <FacebookIcon className="mr-2 h-4 w-4" />
                      <span>Facebook</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <TwitterIcon className="mr-2 h-4 w-4" />
                      <span>Twitter</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem disabled>
                      <Instagram className="mr-2 h-4 w-4" />
                      <span>Instagram</span>
                    </DropdownMenuItem>

                    <DropdownMenuLabel>Special</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link href={"/stats"}>
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Admin</span>
                        <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                :
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="text-white hover:black" variant={"ghost"}>
                      Welcome
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Authenticate</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>

                      <DropdownMenuItem asChild>
                        <Link href={"/register"} >
                          <User className="mr-2 h-4 w-4" />
                          <span>Register</span>
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href={"/login"} >
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Login</span>
                          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>

                    </DropdownMenuGroup>

                    <DropdownMenuLabel>Special</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            }
          </div>


          <div className="flex">
            <Link href={"/cart"} className={cn(buttonVariants({ variant: "outline" }), "rounded-tl-full rounded-bl-full text-primary")}>
              <ShoppingCart />
            </Link>
            <ModeToggle />
          </div>


        </div>

      </div>

      <div className="bg-primary-foreground text-primary w-full">
        <div className="mx-32 p-2">
          <Sheet>
            <SheetTrigger className="">Open</SheetTrigger>
            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>


                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </nav >
  );
}
