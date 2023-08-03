import React from 'react';
import s from './ImageGalleryItem.module.css';

const imageGalleryItem = ({ response, openModal }) => {
  // console.log(showModal);

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

  // return (
  //   <li key={id}>
  //     <img src={webformatURL} alt={tags} data-big_image={largeImageURL} />
  //   </li>
  // );
};
export default imageGalleryItem;
