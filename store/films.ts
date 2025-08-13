import { create } from "zustand";

type FilmsType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

type Store = {
  films: FilmsType[];
  setFilms: (films: FilmsType[]) => void;
  DeleteFilm: (name: string) => void;
};

const useStore = create<Store>()((set) => ({
  films: [],
  setFilms: (films) => set({ films: films }),
  DeleteFilm: (name) =>
    set(() => ({
      films: [],
    })),
}));

export default useStore;
