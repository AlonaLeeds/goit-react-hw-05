import React, { useState } from 'react'
import axios from 'axios'
import MovieList from '../../components/MovieList/MovieList'
import styles from './MoviesPage.module.css'

const MoviesPage = () => {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])

  const handleSearch = async (event) => {
    event.preventDefault()
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}`,
      {
        headers: {
          Authorization: 'Bearer YOUR_API_TOKEN',
        },
      }
    )
    setMovies(response.data.results)
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      <MovieList movies={movies} onClick={(movie) => console.log(movie)} />
    </div>
  )
}

export default MoviesPage
