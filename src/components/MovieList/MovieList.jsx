import React from 'react'
import PropTypes from 'prop-types'
import styles from './MovieList.module.css'
import ImageCard from '../ImageCard/ImageCard'

const MovieList = ({ movies, onClick }) => (
  <ul className={styles.list}>
    {movies.map(movie => (
      <ImageCard key={movie.id} image={movie} onClick={onClick} />
    ))}
  </ul>
)

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default MovieList
