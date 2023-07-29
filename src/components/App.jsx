import React, { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import css from './App.module.css';

class App extends Component {
  state = {
    imageName: '',
  };

  handleSearchFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        <ImageGallery imageName={this.state.imageName} />
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
