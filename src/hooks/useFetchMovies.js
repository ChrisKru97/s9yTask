import {useState, useEffect} from 'react';
import {baseUrl} from '../constants';

const useFetchMovies = () => {
  const [movies, setMovies] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

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
    const sortFn = (a, b) => {
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
