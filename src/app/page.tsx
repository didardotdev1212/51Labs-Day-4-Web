"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Card from "@/components/home/Card";
import useStore from "../../store/films";
export default function page() {
  const { films, setFilms } = useStore();
  const [search, setSearch] = useState("");

  const FetchMobies = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}?s=${search}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    /// parse the response
    const data = await response.json();
    /// if successful, set the films
    if (data.Response === "True") {
      /// set the films in the store
      setFilms(data.Search);
    } else {
      /// if not successful, set the films to an empty array
      setFilms([]);
    }
  };

  useEffect(() => {
    if (search.length >= 3) {
      FetchMobies();
    } else {
      setFilms([]);
    }
  }, [search]);

  return (
    <div className="flex flex-col gap-4 m-4">
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        type="text"
        required
        minLength={3}
        placeholder="Search for movies"
        className="border-2 border-gray-300 p-2 rounded"
      />
      {films.map((film, index) => (
        <Card key={index} film={film} />
      ))}
      {films.length === 0 && (
        <p className="text-gray-500">No films available</p>
      )}
    </div>
  );
}
