// // import React, { useState } from 'react'
// // import axios from 'axios'
// // import MovieList from '../../components/MovieList/MovieList'
// // import styles from './MoviesPage.module.css'
// // import API_KEY from '../../api'

// // const MoviesPage = () => {
// //   const [query, setQuery] = useState('')
// //   const [movies, setMovies] = useState([])

// //   const handleSearch = async (event) => {
// //     event.preventDefault()
// //     const response = await axios.get(
// //       `https://api.themoviedb.org/3/search/movie?query=${query}`,
// //       {
// //         headers: {
// //           Authorization: `Bearer ${API_KEY}`,
// //         },
// //       }
// //     )
// //     setMovies(response.data.results)
// //   }

// //   return (
// //     <div className={styles.container}>
// //       <form onSubmit={handleSearch} className={styles.form}>
// //         <input
// //           type="text"
// //           value={query}
// //           onChange={(e) => setQuery(e.target.value)}
// //           placeholder="Search movies"
// //           className={styles.input}
// //         />
// //         <button type="submit" className={styles.button}>
// //           Search
// //         </button>
// //       </form>
// //       <MovieList movies={movies} onClick={(movie) => console.log(movie)} />
// //     </div>
// //   )
// // }

// // export default MoviesPage


// import React, { useState } from 'react';
// import axios from 'axios';
// import MovieList from '../../components/MovieList/MovieList';
// import styles from './MoviesPage.module.css';
// import API_KEY from '../../api';

// const MoviesPage = () => {
//   const [query, setQuery] = useState('');
//   const [movies, setMovies] = useState([]);
//   const [error, setError] = useState(null);

//   const handleSearch = async (event) => {
//     event.preventDefault();
//     console.log('Search initiated for query:', query); // Логування запиту
//     try {
//       const response = await axios.get(
//         `https://api.themoviedb.org/3/search/movie?query=${query}`,
//         {
//           headers: {
//             Authorization: `Bearer ${API_KEY}`,
//           },
//         }
//       );
//       console.log('API response:', response); // Логування відповіді API
//       if (response.data && response.data.results) {
//         setMovies(response.data.results);
//       } else {
//         setMovies([]);
//       }
//       setError(null); // Очистити попередню помилку, якщо вона була
//     } catch (err) {
//       console.error('API request error:', err);
//       setError('Something went wrong. Please try again.'); // Встановити помилку
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <form onSubmit={handleSearch} className={styles.form}>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search movies"
//           className={styles.input}
//         />
//         <button type="submit" className={styles.button}>
//           Search
//         </button>
//       </form>
//       {error && <p className={styles.error}>{error}</p>}
//       <MovieList movies={movies} onClick={(movie) => console.log(movie)} />
//     </div>
//   );
// };

// export default MoviesPage;
 import React, { useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';
import { getMovies } from '../../api';  // Импортируйте функцию

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log('Search initiated for query:', query);  // Логирование запроса
    try {
      const data = await getMovies(query);
      console.log('API response:', data);  // Логирование ответа API
      setMovies(data.results || []);
      setError(null);  // Очистить предыдущую ошибку, если она была
    } catch (err) {
      console.error('API request error:', err);
      setError('Something went wrong. Please try again.');  // Установить ошибку
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <MovieList movies={movies} onClick={(movie) => console.log(movie)} />
    </div>
  );
};

export default MoviesPage;
