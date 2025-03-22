import './App.css';
import SvgIcon from './components/SvgIcon';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div className="icon-examples">
          <SvgIcon name="search" className={"iconz"}/>
          <SvgIcon name="username"/>
          <SvgIcon name="cal" />
          <SvgIcon name="users" />
          <SvgIcon name="user_bb" />
          <SvgIcon name="windows" />
        </div>
        <p>
          Edit src/App.js and save to reload.
        </p>

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
