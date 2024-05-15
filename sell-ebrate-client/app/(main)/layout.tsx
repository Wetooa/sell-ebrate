import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="mx-32 p-3 bg-gray-100 flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}
