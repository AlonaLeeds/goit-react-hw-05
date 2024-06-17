import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';
import { getCastById } from '../../api/movies-api';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    async function fetchCastById() {
      try {
        setIsError(false);
        const data = await getCastById(movieId);
        setCast(data.cast);
      } catch (error) {
        setIsError(true);
      }
    }

    fetchCastById();
  }, [movieId]);

  if (isError) {
    return <ErrorMessage />;
  }

  if (!cast) {
    return <Loader />;
  }

  if (cast.length === 0) {
    return <div>We don't have cast for this movie.</div>;
  }

  return (
    <div>
      {isError && <ErrorMessage />}
      <div>
        <ul className={css.actor_list}>
          {cast.map(actor => (
            <li className={css.actor_card} key={actor.id}>
              <img
                className={css.actor_img}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : 'https://via.placeholder.com/160x240?text=No+Image'
                }
                width={160}
                alt="actor"
              />
              <p className={css.actor_name}>{actor.name}</p>
              <p className={css.actor_character}>
                Character: {actor.character}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieCast;
