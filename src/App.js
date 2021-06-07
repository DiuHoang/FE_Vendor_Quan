import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import Routes from './routes';
import axios from 'axios';
axios.defaults.baseURL='https://queen-party-be.herokuapp.com/api/';
//axios.defaults.baseURL='http://127.0.0.1:8000/api/';
function App() {
  return (
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  );
}

export default App;
