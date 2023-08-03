import React, { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import css from './App.module.css';
import Modal from './Modal/Modal';
// import { Children } from 'react';

class App extends Component {
  state = {
    imageName: '',
    isShowModal: false,
  };

  handleSearchFormSubmit = imageName => {
    this.setState({ imageName });

    // this.showLoader();
  };
  toggleModal = () => {
    this.setState(({ isShowModal }) => ({
      isShowModal: !isShowModal,
    }));
  };

  render() {
    const { imageName, isShowModal } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />

        <ImageGallery imageName={imageName} openModal={this.toggleModal} />
        {isShowModal && <Modal closeModal={this.toggleModal}>IMG</Modal>}

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
