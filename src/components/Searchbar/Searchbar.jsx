import React, { Component } from 'react';
// import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleSearchChange = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.imageName.trim() === '') {
      alert('Enter the name you are looking for');
      // toast.warn('Enter the name you are looking for');
      return;
    }
    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <>
        <header className={css.searchbar}>
          <form className="form" onSubmit={this.handleSubmit}>
            <button type="submit" className="button">
              <span className="button-label">Search</span>
            </button>

            <input
              className="input"
              name="name"
              type="text"
              value={this.state.imageName}
              onChange={this.handleSearchChange}
              // autocomplete="off"
              // autofocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </>
    );
  }
}

export default Searchbar;
