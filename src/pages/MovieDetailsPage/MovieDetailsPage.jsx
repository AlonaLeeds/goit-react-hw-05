import React, { useEffect, useState, Suspense, lazy } from 'react'
import { useParams, Route, Routes, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './MovieDetailsPage.module.css'
import API_KEY from '../../../api'

const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'))
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'))

const MovieDetailsPage = () => {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      )
      setMovie(response.data)
    }
    fetchMovieDetails()
  }, [movieId])

  if (!movie) return <p>Loading...</p>

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.button}>
        Go back
      </button>
      <div className={styles.movieDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.image}
        />
        <div className={styles.details}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <ul className={styles.additionalInfo}>
            <li>
              <Link to={`cast`} className={styles.link}>Cast</Link>
            </li>
            <li>
              <Link to={`reviews`} className={styles.link}>Reviews</Link>
            </li>
          </ul>
        </div>
      </div>

      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default MovieDetailsPage
