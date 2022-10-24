import './App.css';
import AddTopping from "./AddTopping";
import ToppingDisplay from "./ToppingDisplay";

import { useState } from "react";


function Home() {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState({ toppings: [] }); // Stores items


  const addToppingToData = (topping) => {
    let toppings = data["toppings"]; // Stores state in data
    topping.id = toppings.length; // sets id for each topping
    toppings.push(topping); // pushes item into this data array
    setData({ toppings: toppings }); // setData = currentData

    console.log(data);
  }


  return (
    <body>
      <header>

      </header>
      <div className = "main-content-box">
      
        {/* Section 1 - Content section , <Content /> */}

        <AddTopping addTopping={addToppingToData} />
        <ToppingDisplay toppings={data["toppings"]} />

      </div>
    </body>
  );
}

export default Home;