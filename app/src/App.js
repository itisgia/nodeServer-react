import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
       //means there is a succeeful render only run if we got no errors
    fetch("http://192.168.33.10:5000/getjson")//calling api
      .then(res => res.json())
      .then(
        (result) => {
            // id there is successfulrendera result is a content
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.first_name}>
              {item.first_name} {item.last_name}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default App;
