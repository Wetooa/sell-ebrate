import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="my-8 w-2/3 p-6 rounded-lg bg-primary-foreground flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}
