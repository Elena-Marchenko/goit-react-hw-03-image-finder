import React from 'react';

const ImageGalleryItem = ({ imageName: { hits } }) => {
  console.log(hits);

  return hits.map(hit => (
    <li className="gallery-item" key={hit.id}>
      <img src={hit.webformatURL} alt={hit.tags} width="300" />
    </li>
  ));
};
export default ImageGalleryItem;
