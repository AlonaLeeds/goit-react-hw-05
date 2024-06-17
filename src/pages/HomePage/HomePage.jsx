import React, { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';
import { getTrendingMovies } from '../../api/movies-api';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch (err) {
        console.error('Failed to fetch trending movies:', err);
        setError('Failed to fetch trending movies. Please try again later.');
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1>Trending Movies</h1>
      {error && <p className={css.error}>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
