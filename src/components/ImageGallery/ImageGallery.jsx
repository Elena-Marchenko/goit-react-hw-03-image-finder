import React, { Component } from 'react';
import { toast } from 'react-hot-toast';
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
    modalUrl: '',
    isShowModal: false,
    loadMoreBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName } = this.props;
    const { page } = this.state;

    if (prevProps.imageName !== imageName) {
      this.setState({
        loadMoreBtn: false,
        page: 1,
        response: [],
      });
      setTimeout(() => {
        this.showLoader();
        this.fetchImagesByName();
      }, 1000);
    }

    if (prevState.page < page) {
      this.showLoader();
      this.fetchImagesByName();
    }
  }

  fetchImagesByName = () => {
    const { imageName } = this.props;
    const { page } = this.state;
    const errorMessage = `Not found '${imageName}' `;

    apiIMG
      .fetchImg(imageName, page)
      .then(res => {
        if (res.hits.length === 0) {
          return Promise.reject(new Error(toast.error(errorMessage)));
        }
        return this.setState(prevState => ({
          response: [...prevState.response, ...res.hits],
          loadMoreBtn: this.state.page < Math.ceil(res.totalHits / 12),
        }));
      })
      .catch(error => this.setState({ error, loadMoreBtn: false }))
      .finally(() => {
        this.hideLoader();
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
    const {
      page,
      response,
      loaderAreShow,
      modalUrl,
      isShowModal,
      loadMoreBtn,
    } = this.state;
    const { imageName } = this.props;
    console.log('loadMoreBtn:', loadMoreBtn);

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

        {loadMoreBtn && <Button onClick={this.increasePage} />}
      </>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  openModal: PropTypes.func,
  page: PropTypes.number,
  imageName: PropTypes.string.isRequired,
};
