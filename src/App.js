import './App.css';
import SvgIcon from './components/SvgIcon';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <SvgIcon name="logo" /> */}
        <p>
          Edit src/App.js and save to reload.
        </p>
        <div className="icon-examples">
          <SvgIcon name="search" />
          <SvgIcon name="user"/>
          <SvgIcon name="cal" />
          <SvgIcon name="windows" />
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
