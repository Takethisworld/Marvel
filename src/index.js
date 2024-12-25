import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './style/style.css';
import MarvelService from './components/marvelService/MarvelService';

const marvelService = new MarvelService();

// marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
