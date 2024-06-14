import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styles from './MovieReviews.module.css'

const MovieReviews = () => {
  const { movieId } = useParams()
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
        {
          headers: {
            Authorization: 'Bearer YOUR_API_TOKEN',
          },
        }
      )
      setReviews(response.data.results)
    }
    fetchReviews()
  }, [movieId])

  return (
    <div className={styles.reviews}>
      {reviews.map(review => (
        <div key={review.id} className={styles.review}>
          <h3>{review.author}</h3>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  )
}

export default MovieReviews
