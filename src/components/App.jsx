import React, { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import css from './App.module.css';
import Loaders from '../components/Loader/Loader';

class App extends Component {
  state = {
    imageName: '',
    loaderAreShow: false,
  };

  handleSearchFormSubmit = imageName => {
    this.setState({ imageName });

    this.showLoader();
  };

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

  render() {
    const { loaderAreShow, imageName } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />

        <ImageGallery
          imageName={imageName}
          hideLoader={this.hideLoader}
          showLoader={this.showLoader}
        />
        {loaderAreShow && <Loaders />}
        {/* <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        /> */}
      </div>
    );
  }
}

export default App;
