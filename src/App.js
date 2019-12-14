import React from 'react';
import logo from './logo.svg';
import './App.css';

const SimpleLogo = ({ isReverse }) => {
  return (
    <div>
      <p>{isReverse ? "counterclockwise" : "clockwise"} direction</p>
      <img src={logo} className={isReverse ? "App-logo-reverse" : "App-logo"} alt="logo" />
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isReverse: false };
  }

  reverseRotate = () => {
    this.setState(prevState => ({ isReverse: !prevState.isReverse }))
  }

  render() {
    const { isReverse } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Stupid simple app</h1>
          <SimpleLogo isReverse={isReverse} />
          <button onClick={this.reverseRotate}>REVERSE!</button>
        </header>
      </div>
    );
  }
}

export default App;
