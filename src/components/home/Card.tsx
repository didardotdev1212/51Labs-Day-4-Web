import Image from "next/image";
import React from "react";

type CardProps = {
  film: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  };
};

export default function Card({ film }: CardProps) {
  return (
    <div className="bg-gray-200 flex flex-row p-4">
      <Image
        src={film.Poster}
        alt={film.Title}
        width={300}
        height={100}
        objectFit="contain"
        className="mb-2 h-[150px] w-1/3"
      />
      <div className="flex flex-col justify-center ml-4 w-2/3">
        <h1>{film.Title}</h1>
        <p className="text-[10px] text-gray-600">
          {film.Type} - {film.Year}
        </p>
      </div>
    </div>
  );
}
