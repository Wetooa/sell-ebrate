"use client";

import { ModeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

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

export default function Navbar() {
  return (
    <nav className="sticky top-0">
      <div className="px-32 bg-primary">
        <div className="flex items-center px-6 py-4 gap-2" >

          <Link href={"/"} className="mx-6">
            <h1 className="text-white font-bold">
              <CircleDollarSign />
            </h1>
          </Link>

          <div className="flex w-full">
            <Input />

            <Button>
              <SearchIcon />
            </Button>
          </div>


          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="" variant={"secondary"}>
                  My Account
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

                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>


          <div>
            <Link href={"/cart"} className={cn(buttonVariants({ variant: "outline" }), "")}>
              <ShoppingCart />
            </Link>
          </div>

          <div>
            <ModeToggle />
          </div>


        </div>

      </div>

      <div className="bg-gray-300 w-full">
        <div className="mx-32 p-2">
          <Sheet>
            <SheetTrigger>Open</SheetTrigger>
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
