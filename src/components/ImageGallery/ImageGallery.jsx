import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import apiIMG from '../../imgAPI';
import Modal from '../Modal/Modal';
import s from './ImageGallery.module.css';
import Loaders from '../Loader/Loader';

class ImageGallery extends Component {
  state = {
    response: [],
    page: 1,
    loaderAreShow: false,
    error: null,
    status: 'idle',
    modalUrl: '',
    isShowModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName } = this.props;
    const { page } = this.state;

    if (prevProps.imageName !== imageName || prevState.page !== page) {
      this.toggleLoader();

      setTimeout(() => {
        this.fetchImagesByName();
      }, 500);
    }
  }

  fetchImagesByName = () => {
    const { imageName } = this.props;
    const { page } = this.state;
    const errorMessage = `Not found ${imageName} `;
    apiIMG
      .fetchImg(imageName, page)
      .then(res => {
        if (res.hits.length === 0) {
          return Promise.reject(new Error(errorMessage));
        }
        return this.setState(prevState => ({
          response: [...prevState.response, ...res.hits],
        }));
      })
      .catch(error => alert(error.message))
      .finally(() => {
        this.toggleLoader();
      });
  };

  //LOADER
  toggleLoader = () => {
    this.setState(({ loaderAreShow }) => ({
      loaderAreShow: !loaderAreShow,
    }));
  };

  //MODAL
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

  //PAGE
  increasePage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { page, response, loaderAreShow, modalUrl, isShowModal } = this.state;
    const { imageName } = this.props;

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

        {response.length !== 0 && <Button onClick={this.increasePage} />}
      </>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  toggleLoader: PropTypes.func,
  openModal: PropTypes.func,
  page: PropTypes.number,
  imageName: PropTypes.string.isRequired,
};
