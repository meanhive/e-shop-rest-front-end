import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/headers/Header';
import Pages from './components/mainpages/Pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

    return (
      <Router>
          <div className="App">
            <Header/>
            <ToastContainer
            position="top-right"
            autoClose={2000}
            />
            <Pages/>
          </div>
      </Router>
    );

}

export default App;
