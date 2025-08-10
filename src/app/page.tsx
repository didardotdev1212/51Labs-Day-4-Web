"use client";
import React from "react";
import { useState } from "react";
import Card from "@/components/home/Card";

const Default_Film = [
  {
    name: "Film 1",
    description: "Description of Film 1",
  },
];
export default function page() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [Films, setFilms] = useState(Default_Film);
  const [errors, setErrors] = useState<string[]>([]);

  const AddFilm = () => {
    if (Films.some((film) => film.name === name)) {
      setErrors(["Film with this name already exists."]);
      return;
    }
    setFilms([
      ...Films,
      {
        name: name,
        description: description,
      },
    ]);
    setName("");
    setDescription("");
    setErrors([]);
  };

  return (
    <div className="flex flex-col gap-4 m-4">
      {Films.map((film, index) => (
        <Card key={index} film={film} />
      ))}
      <hr className="my-4 h-[2px] bg-black" />
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          AddFilm();
        }}
      >
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors([]);
          }}
          type="text"
          required
          minLength={3}
          placeholder="Film Name"
          className="border-2 border-gray-300 p-2 rounded"
        />
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Film Description"
          className="border-2 border-gray-300 p-2 rounded"
        />
        {errors.length > 0 && (
          <div className="text-red-500">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Film
        </button>
      </form>
    </div>
  );
}
