import * as React from "react";
import { Link } from 'react-router-dom';
import './navbar.css';


const Content: React.FC = () => {
  return (
    <nav className="nav">
      <div className = "container">
          <nav className="">
            {/* Nav section , <NavBar /> */}
            <img src="/pizza-logo.png" href="index.html" className="logo_box hue-shift">
            </img>
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Manage Toppings
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/chef" className="nav-link"> Manage Pizzas </Link>
              </li>           
            </ul>
          </nav>
          {/* End of navbar section */}
        </div>
    </nav>
  );
};

export default Content;