import './App.css';
import AddTopping from "./AddTopping";
import ToppingDisplay from "./ToppingDisplay";
import PizzaDisplay from "./PizzaDisplay";

import { useState, useEffect } from "react";


function Home() {
  const [filters, setFilters] = useState({});
  const [toppingData, setToppingData] = useState({ toppings: [] }); // Stores toppings
  const [pizzaData, setPizzaData] = useState({ pizzas: [] }); // Stores pizzas


  useEffect(() => {
    fetch("http://localhost:3000/toppings")
    .then((response) => response.json())
    .then((toppingData) => setToppingData({ toppings: toppingData }));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/pizzas")
    .then((response) => response.json())
    .then((pizzaData) => setPizzaData({ pizzas: pizzaData }));
  }, []);




  const addToppingToData = (topping) => {
    let toppings = toppingData["toppings"]; // Stores state in data
    //topping.id = toppings.length; // sets id for each topping

    const requestOptions = {
      method: "POST", // posts topping to db
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topping) // converts topping to string
    }

    if (JSON.stringify(toppings).includes(JSON.stringify(topping.topping))) { // checks if 
      console.log("In data");
    }  
    else {
      fetch("http://localhost:3000/toppings", requestOptions)
      .then((response) => response.json())
      .then((toppingData) => {
        toppings.push(toppingData); // pushes item into this data array
        setToppingData({ toppings: toppings }); // setData = currentData
        console.log(toppings)
      }); // *get[s] data from backend data
    }
  }

  const deleteTopping = (topping) => {
    console.log(topping)
    const toppings = toppingData["toppings"];
    const requestOptions = {
      method: "DELETE"
    }
    fetch(`http://localhost:3000/toppings/${topping.id}`, requestOptions).then(
      (response) => {
        //Checks response code
        if (response.ok) {
          const idx = toppings.indexOf(topping); // finds index in array
          toppings.splice(idx, 1);
          setToppingData({toppings: toppings})
        }
      }
    );
  };

  // Used when we want to update a topping's name. Used in ToppingDisplay.js
  const updateTopping = (topping, editElem) => {
    const toppings = toppingData["toppings"];
    const idx = toppings.indexOf(topping); // finds index in array
    toppings[idx].topping = editElem;
    setToppingData({ toppings: toppings });

    const requestOptions = {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(topping)
    }
    fetch(`http://localhost:3000/toppings/${topping.id}`, requestOptions)
    .then((response) => {}
    );
  };



  // PIZZAS

  const deletePizza = (topping) => {

  };

  // Used when we want to update a topping's name. Used in ToppingDisplay.js
  const updatePizza = (topping) => {

  };




  const filterData = (data) => {
    const filteredData = [];

    console.log(filters)

    if (!filters.name) {
      return data;
    }

    for (const topping of data) {
      if (filters.name !== "" && topping.name !== filters.name) {
        continue;
      }
      else {
        break;
      }
      filteredData.push(topping);
    }
    return filteredData;

  }



  return (
    <body>
      <header>

      </header>
      <div className = "main-content-box">
      
        {/* Section 1 - Topping section , <Content /> */}
        <div className = "topping-box">
          <AddTopping addTopping={addToppingToData} />

          <ToppingDisplay 
          deleteTopping={deleteTopping}
          updateTopping={updateTopping}
          toppings={filterData(toppingData["toppings"])} />
        </div>

        <div className="pizza-box">
          <PizzaDisplay 
          deletePizza={deletePizza}
          updatePizza={updatePizza}
          pizzas={filterData(pizzaData["pizzas"])} />
        </div>



      </div>
    </body>
  );
}

export default Home;