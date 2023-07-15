import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';

class App extends Component {
  state = {
    search: '',
  };

  // componentDidMount() {
  //   const API_KEY = '38270540-a530076f6446dfae15d3982e2';

  //   fetch(
  //     `https://pixabay.com/api/?q=cat&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  //   )
  //     .then(res => res.json())
  //     .then(search => this.setState({ search }));
  // }

  handleSearchFormSubmit = search => {
    this.setState({ search });
    console.log(search);
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
      </>
    );
  }
}

export default App;
