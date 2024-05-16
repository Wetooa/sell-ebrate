import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-primary">
      <div className="m-32">
        {children}
      </div>
    </div>
  )
}
