import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import apiIMG from '../../imgAPI';
import Modal from '../Modal/Modal';

class ImageGallery extends Component {
  state = {
    response: [],
    page: 1,
    error: null,
    status: 'idle',
    showModal: false,
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const { imageName } = this.props;
    const { page } = this.state;

    setTimeout(() => {
      if (prevProps.imageName !== imageName) {
        this.setState({
          response: [],
        });
        this.fetchImages();
      }
      if (prevState.page !== page) {
        this.fetchImages();
      }
    }, 500);
  }

  fetchImages = () => {
    const { imageName } = this.props;
    const { page } = this.state;
    const errorMessage = `Not found ${imageName} `;

    return apiIMG
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
        this.props.hideLoader();
      });
  };
  //!!!!!!!!!!!!!!!!!!!!!!!!!
  toggleModal = () => {
    this.setState(() => ({
      showModal: false ? true : false,
    }));
  };

  increasePage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  render() {
    console.log(this.toggleModal);
    const { page, response, showModal } = this.state;
    const { imageName } = this.props;

    return (
      <>
        <div>
          <ul>
            {showModal && (
              <Modal onClose={this.toggleModal}>
                <h1>Hallo</h1>
              </Modal>
            )}
            <ImageGalleryItem
              onClick={this.toggleModal}
              response={response}
              // largeImageURL={largeImageURL}

              imageName={imageName}
              page={page}
            />
          </ul>
        </div>

        {response.length !== 0 && <Button onClick={this.increasePage} />}
      </>
    );
  }
}

export default ImageGallery;
