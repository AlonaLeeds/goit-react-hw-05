import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieReviews.module.css';
import { getReviewsById } from '../../api/movies-api';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    async function fetchReviewsById() {
      try {
        setIsError(false);
        const data = await getReviewsById(movieId);
        setReviews(data.results);
      } catch (error) {
        setIsError(true);
      }
    }

    fetchReviewsById();
  }, [movieId]);

  if (isError) {
    return <ErrorMessage />;
  }

  if (!reviews) {
    return <Loader />;
  }

  if (reviews.length === 0) {
    return <div>We don't have reviews for this movie.</div>;
  }

  return (
    <div>
      {isError && <ErrorMessage />}
      <ul className={css.reviews_list}>
        {reviews.map(review => (
          <li key={review.id}>
            <h3>Author: {review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
