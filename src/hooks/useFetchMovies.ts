import {useState, useEffect} from 'react';
import {baseUrl} from '../constants';

type Movie = {
  title: string;
  episode_number: string;
  main_characters: Array<string>;
  description: string;
  hero_image: string;
  poster: string;
}

const useFetchMovies = () => {
  const [movies, setMovies] = useState<Array<Movie>| null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`${baseUrl}/movies.json`);
      const responseJson = await response.json();
      setMovies(responseJson?.movies);
    };
    fetchMovies();
  }, []);

  const sort = () => {
    const newSortAsc = !sortAsc;
    const sortFn = (a: Movie, b: Movie) => {
      if (!a || !b) {
        return 0;
      }
      const diff =
        parseInt(a.episode_number, 10) - parseInt(b.episode_number, 10);
      if (newSortAsc) {
        return diff;
      }
      return 0 - diff;
    };
    const newMovies = [...movies].sort(sortFn);
    setMovies(newMovies);
    setSortAsc(newSortAsc);
  };

  return {
    movies,
    loading: !movies,
    sort,
    sortMode: sortAsc ? 'asc' : 'desc',
  };
};

export default useFetchMovies;
