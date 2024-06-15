import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styles from './MovieCast.module.css'
import API_KEY from '../../api.js'

const MovieCast = () => {
  const { movieId } = useParams()
  const [cast, setCast] = useState([])

  useEffect(() => {
    const fetchCast = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      )
      setCast(response.data.cast)
    }
    fetchCast()
  }, [movieId])

  return (
    <div className={styles.cast}>
      {cast.map(actor => (
        <div key={actor.id} className={styles.actor}>
          <img
            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
            alt={actor.name}
            className={styles.image}
          />
          <p>{actor.name}</p>
        </div>
      ))}
    </div>
  )
}

export default MovieCast
