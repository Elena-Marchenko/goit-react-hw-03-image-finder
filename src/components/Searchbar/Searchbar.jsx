import React, { Component } from 'react';
import { toast } from 'react-hot-toast';
import s from './Searchbar.module.css';

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
      return toast.error('Enter the name you are looking for');
    }
    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <>
        <header className={s.searchbar}>
          <form className={s.searchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={s.searchForm_button}>
              <span className={s.searchForm_button_label}>Search</span>
            </button>

            <input
              className={s.searchForm_input}
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
