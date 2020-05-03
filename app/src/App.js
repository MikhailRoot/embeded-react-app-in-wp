import React from 'react';
import './scss/App.scss';

function App(props) {

  const items = props.settings.some_items || [];

  return (
    <div className="App">
      <header className="App-header">
        <h1>{ props.settings.l18n.main_title }</h1>
        <ul>
          {
            items.map((item, index)=>{
              return (
                  <li key={index}>{item}</li>
              )
            })
          }
        </ul>
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
