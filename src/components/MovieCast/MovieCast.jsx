import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getCastById } from '../../api/movies-api';
import { defaultImg } from '../../api/helpers';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    async function fetchCastById() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await getCastById(movieId);
        setCast(data.cast);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCastById();
  }, [movieId]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  if (!cast || cast.length === 0) {
    return <div>We don't have cast for this movie.</div>;
  }

  return (
    <div>
      <ul className={css.actor_list}>
        {cast.map(actor => (
          <li className={css.actor_card} key={actor.id}>
            <img
              className={css.actor_img}
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                  : defaultImg
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
  );
}
