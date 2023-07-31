import React from 'react';

const imageGalleryItem = ({ response, onClick }) => {
  return response.map(res => {
    const { id, webformatURL, tags, largeImageURL } = res;

    return (
      <li key={id} onClick={() => onClick()}>
        <img src={webformatURL} alt={tags} data-big_image={largeImageURL} />
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
