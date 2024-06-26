import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getReviewsById } from '../../api/movies-api';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    async function fetchReviewsById() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await getReviewsById(movieId);
        setReviews(data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReviewsById();
  }, [movieId]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  if (!reviews || reviews.length === 0) {
    return <div>We don't have reviews for this movie.</div>;
  }

  return (
    <div>
      <ul className={css.reviews_list}>
        {reviews.map(review => (
          <li key={review.id}>
            <h3>Author: {review.author}</h3>
            <p> {review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
