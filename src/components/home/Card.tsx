import Image from "next/image";
import React from "react";

type CardProps = {
  film: {
    name: string;
    description: string;
  };
};

export default function Card({ film }: CardProps) {
  return (
    <div className="bg-gray-200 p-4">
      <Image
        src="/next.svg"
        alt={film.name}
        width={300}
        height={100}
        objectFit="contain"
        className="mb-2 h-[20px]"
      />

      <h1>{film.name}</h1>
      <p className="text-[10px] text-gray-600">{film.description}</p>
    </div>
  );
}
