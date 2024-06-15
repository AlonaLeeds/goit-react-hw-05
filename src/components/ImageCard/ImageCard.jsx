import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageCard.module.css';

const ImageCard = ({ image, onClick }) => {
  if (!image || !image.urls || !image.urls.small) {
    return null; // або можна відобразити placeholder
  }

  return (
    <li className={styles.card}>
      <img
        src={image.urls.small}
        alt={image.alt_description || 'Image'} // Додана перевірка на alt_description
        className={styles.image}
        onClick={() => onClick(image)}
      />
    </li>
  );
};

ImageCard.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageCard;
