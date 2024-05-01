import Navbar from "@/components/navbar/navbar";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="w-full px-32">
        {children}
      </div>
    </div>
  );
}
