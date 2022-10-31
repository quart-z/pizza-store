import NavBar from './components/navbar.js';
import Home from './Home.js';
import Chef from './Chef.js';

import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <Router>
      <body>
        <NavBar /> 
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/chef" element={<Chef />} /> 
        </Routes>
      </body>
    </Router>
    
  );
}

export default App;