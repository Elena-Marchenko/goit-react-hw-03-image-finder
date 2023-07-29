import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
// import apiIMG from '../../imgAPI';

class ImageGallery extends Component {
  state = {
    response: [],
    page: 1,
    loader: false,
    error: null,
    status: 'idle',
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imageName !== this.props.imageName) {
      //   console.log('prevProps.imageName:', prevProps.imageName);
      //   console.log('this.props.imageName:', this.props.imageName);

      // const API_KEY = '38270540-a530076f6446dfae15d3982e2';
      // this.setState({ loader: true });
      // setTimeout(() => {
      //   fetch(
      //     `https://pixabay.com/api/?q=${this.props.imageName}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      //   )
      //     .then(res => res.json())
      //     .then(imageName => this.setState({ imageName }))
      //     .finally(() =>
      //       this.setState({ loader: false, page: (this.page = +1) })
      //     );
      // }, 1000);

      const API_KEY = '38270540-a530076f6446dfae15d3982e2';
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?q=${this.props.imageName}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          return Promise.rejected(
            new Error(`Not found ${this.props.imageName}`)
          );
        })
        .then(response => this.setState({ response, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  getImages = () => {};

  //!!!!!!!!!!!!!!!!!!!!!!!!!
  increasePage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  render() {
    // console.log('response', this.state.response);
    // console.log(this.state.page);
    const { response, error, page, status } = this.state;

    if (status === 'idle') {
      return <div></div>;
    }
    if (status === 'pending') {
      return <div>Loadind...</div>;
    }
    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className="gallery">
            {/* Якщо нема картинки то */}

            <ImageGalleryItem imageName={response} page={page} />
          </ul>
          <Button onClick={this.increasePage} />
        </>
      );
    }
  }
}

export default ImageGallery;
