import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import apiIMG from '../../imgAPI';

class ImageGallery extends Component {
  state = {
    response: [],
    page: 1,
    error: null,
    status: 'idle',
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

  increasePage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  render() {
    const { page, response } = this.state;
    const { imageName } = this.props;

    return (
      <>
        <div>
          <ul>
            <ImageGalleryItem
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
