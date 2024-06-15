import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MovieList from '../../components/MovieList/MovieList'
import styles from './HomePage.module.css'
import API_KEY from '../../api'

const HomePage = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const response = await axios.get(
        'https://api.themoviedb.org/3/trending/movie/day',
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      )
      setMovies(response.data.results)
    }
    fetchTrendingMovies()
  }, [])

  return (
    <div className={styles.container}>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} onClick={(movie) => console.log(movie)} />
    </div>
  )
}

export default HomePage
