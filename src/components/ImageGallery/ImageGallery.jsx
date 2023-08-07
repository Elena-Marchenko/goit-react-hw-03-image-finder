import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Modal from '../Modal';
import s from './ImageGallery.module.css';
import Loaders from '../Loader';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  state = {
    modalUrl: '',
    isShowModal: false,
  };

  // //MODAL
  toggleModal = () => {
    this.setState(({ isShowModal }) => ({
      isShowModal: !isShowModal,
    }));
  };

  openModal = e => {
    if (e.target.nodeName === 'IMG') {
      this.toggleModal();

      this.setState(() => ({
        modalUrl: e.target.dataset.big_image,
      }));
    }
  };

  render() {
    const {
      page,
      imageName,
      response,
      loaderAreShow,
      loadMoreBtn,
      increasePage,
    } = this.props;

    const { modalUrl, isShowModal } = this.state;
    return (
      <>
        <div>
          <ul className={s.imageGallery}>
            <ImageGalleryItem
              openModal={this.openModal}
              response={response}
              imageName={imageName}
              page={page}
              modalUrl={modalUrl}
            />
          </ul>
          {isShowModal && (
            <Modal url={modalUrl} closeModal={this.toggleModal}></Modal>
          )}
          {loaderAreShow && <Loaders />}
        </div>

        {loadMoreBtn && <Button onClick={increasePage} />}
      </>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  increasePage: PropTypes.func,
  page: PropTypes.number,
  imageName: PropTypes.string.isRequired,
};
