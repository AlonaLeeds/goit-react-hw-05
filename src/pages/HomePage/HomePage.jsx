// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import MovieList from '../../components/MovieList/MovieList'
// import styles from './HomePage.module.css'
// import API_KEY from '../../api'

// const HomePage = () => {
//   const [movies, setMovies] = useState([])

//   useEffect(() => {
//     const fetchTrendingMovies = async () => {
//       const response = await axios.get(
//         'https://api.themoviedb.org/3/trending/movie/day',
//         {
//           headers: {
//             Authorization: `Bearer ${API_KEY}`,
//           },
//         }
//       )
//       setMovies(response.data.results)
//     }
//     fetchTrendingMovies()
//   }, [])

//   return (
//     <div className={styles.container}>
//       <h1>Trending Movies</h1>
//       <MovieList movies={movies} onClick={(movie) => console.log(movie)} />
//     </div>
//   )
// }

// export default HomePage
import React, { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';
import { getTrendingMovies } from '../../api';  // Импортируйте функцию

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch (err) {
        console.error('Failed to fetch trending movies:', err);
        setError('Failed to fetch trending movies. Please try again later.');
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Trending Movies</h1>
      {error && <p className={styles.error}>{error}</p>}
      <MovieList movies={movies} onClick={(movie) => console.log(movie)} />
    </div>
  );
};

export default HomePage;
