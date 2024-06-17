import React, { useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';
import { getMovies } from '../../api/movies-api';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const data = await getMovies(query);
      setMovies(data.results || []);
      setError(null);  // Clear previous error if any
    } catch (err) {
      console.error('API request error:', err);
      setError('Something went wrong. Please try again.');  // Set error message
    }
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSearch} className={css.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies"
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      {error && <p className={css.error}>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
