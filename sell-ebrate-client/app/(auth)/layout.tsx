import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-primary-foreground">
      <div className="w-1/2 border-box m-20">
        {children}
      </div>
    </div>
  )
}
