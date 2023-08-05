import React, { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import css from './App.module.css';

class App extends Component {
  state = {
    imageName: '',
  };

  handleSearchFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    const { imageName } = this.state;
    return (
      <div className={css.app}>
        <Toaster />
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        <ImageGallery imageName={imageName} />
      </div>
    );
  }
}

export default App;
