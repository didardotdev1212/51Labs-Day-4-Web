"use client";
import React from "react";
import Link from "next/link";

export default function Navbar() {
  const pages = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
  ];
  return (
    <div className="flex space-x-4 items-center p-4 bg-gray-800 text-white">
      {pages.map((page) => (
        <Link key={page.path} href={page?.path}>
          {page.name}
        </Link>
      ))}
    </div>
  );
}
