import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import apiIMG from '../../imgAPI';
// import Modal from '../Modal/Modal';
import s from './ImageGallery.module.css';
import Loaders from '../Loader/Loader';

class ImageGallery extends Component {
  state = {
    response: [],
    page: 1,
    loaderAreShow: false,
    error: null,
    status: 'idle',
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const { imageName } = this.props;
    const { page } = this.state;

    if (prevProps.imageName !== imageName || prevState.page !== page) {
      this.showLoader();

      setTimeout(() => {
        this.fetchImagesByName();
        //scroll
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
        this.hideLoader();
      });
  };

  //!!!!!!!!!!!!!!!!!!!!!!!!!
  showLoader = () => {
    this.setState(() => ({
      loaderAreShow: true,
    }));
  };

  hideLoader = () => {
    this.setState(() => ({
      loaderAreShow: false,
    }));
  };
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  openModal = e => {
    console.log('click nodeName', e.target.nodeName);
    console.log('click', e.target.dataset.big_image);
    if (e.target.nodeName === 'IMG') {
      this.props.showModal();
      // this.setState({ modalUrl: e.target.dataset.big_image });
    }
  };

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  increasePage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  render() {
    const { page, response, loaderAreShow } = this.state;
    const { imageName, openModal } = this.props;

    return (
      <>
        <div>
          <ul className={s.imageGallery}>
            {/* {showModal && (
              <Modal>
                <img src="" alt="" />
              </Modal>
            )} */}
            <ImageGalleryItem
              openModal={openModal}
              response={response}
              imageName={imageName}
              page={page}
            />
          </ul>
          {loaderAreShow && <Loaders />}
        </div>

        {response.length !== 0 && <Button onClick={this.increasePage} />}
      </>
    );
  }
}

export default ImageGallery;
