import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const imageGalleryItem = ({ response, openModal }) => {
  return response.map(res => {
    const { id, webformatURL, tags, largeImageURL } = res;

    return (
      <li key={id} className={s.imageGalleryItem} onClick={openModal}>
        <img
          src={webformatURL}
          alt={tags}
          data-big_image={largeImageURL}
          className={s.ImageGalleryItem_image}
        />
      </li>
    );
  });
};
export default imageGalleryItem;

imageGalleryItem.propTypes = {
  id: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
};
