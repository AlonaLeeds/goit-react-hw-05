import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useParams, Route, Routes, Link, useNavigate } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import { getMovieById } from '../../api/movies-api';

const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'));

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (err) {
        console.error('Failed to fetch movie details:', err);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className={css.container}>
      <button onClick={() => navigate(-1)} className={css.button}>
        Go back
      </button>
      <div className={css.movieDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={css.image}
        />
        <div className={css.details}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <ul className={css.additionalInfo}>
            <li>
              <Link to={`cast`} className={css.link}>Cast</Link>
            </li>
            <li>
              <Link to={`reviews`} className={css.link}>Reviews</Link>
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
  );
};

export default MovieDetailsPage;
