import * as React from "react";


const Content: React.FC = () => {
  return (
    <nav className="nav">
      <div className = "container">
          <nav className="">
            {/* Nav section , <NavBar /> */}
            <img src="/logo512.png" href="index.html" className="logo_box hue-shift">
            </img>
            <ul className="nav-list">
              <li className="nav-item">
                <a href="/" className="nav-link">
                  Manage Toppings
                </a>
              </li>
              <li className="nav-item">
                <a href="/chef" className="nav-link">
                  Manage Pizzas
                </a>
              </li>           
            </ul>
          </nav>
          {/* End of navbar section */}
        </div>
    </nav>
  );
};

export default Content;