import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import apiIMG from '../../imgAPI';
import Modal from '../Modal';
import s from './ImageGallery.module.css';
import Loaders from '../Loader';

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

    if (prevProps.imageName !== imageName) {
      this.showLoader();
      this.setState({
        response: [],
      });
      this.fetchImagesByName();
    }

    if (prevState.page !== page) {
      this.showLoader();
      this.fetchImagesByName();
      this.scroll();
    }
  }

  fetchImagesByName = () => {
    const { imageName } = this.props;
    const { page } = this.state;
    const errorMessage = `Not found '${imageName}' `;
    setTimeout(() => {
      apiIMG
        .fetchImg(imageName, page)
        .then(res => {
          if (res.hits.length === 0) {
            return Promise.reject(new Error(alert(errorMessage)));
          }
          return this.setState(prevState => ({
            response: [...prevState.response, ...res.hits],
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(() => {
          this.hideLoader();
        });
    }, 1000);
  };

  scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  //LOADER
  showLoader = () => {
    this.setState({
      loaderAreShow: true,
    });
  };

  hideLoader = () => {
    this.setState({
      loaderAreShow: false,
    });
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
    const { page, response, loaderAreShow, modalUrl, isShowModal, error } =
      this.state;
    const { imageName } = this.props;

    return (
      <>
        <div>
          {error && <h1>{error.message}</h1>}
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
