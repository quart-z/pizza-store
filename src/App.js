import './App.css';
import AddTopping from "./AddTopping";
import ToppingDisplay from "./ToppingDisplay";
import ToppingMenu from "./ToppingMenu";
import AddPizza from "./AddPizza";
import PizzaDisplay from "./PizzaDisplay";

// Components
import NavBar from "./components/navbar";

import { useState, useEffect } from "react";

var selectedTopping = "";

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

  // function to return sliced array after slice
  const hasDuplicate = (arrayObj, colName) => {
    var hash = Object.create(null);
    return arrayObj.some((arr) => {
      return arr[colName] && (hash[arr[colName]] || !(hash[arr[colName]] = true));
      });
    };




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
    
    if (JSON.stringify(toppings).includes(JSON.stringify(topping.topping))) { // checks for duplicate topping in data
      console.log("In data");
    }  
    else { // Not a duplicate, insert updated topping into data
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
    }
  };



  // PIZZAS

  const addPizzaToData = (pizza) => {
    let pizzas = pizzaData["pizzas"]; // Stores state in data

    //  Checks for duplicate pizzas

    if (JSON.stringify(pizzas).includes(JSON.stringify(pizza.toppings))) {
      console.log("In data, pizza not addded");
    }

    // If no duplicates, add the pizza thru POST request

    else {
      const requestOptions = {
        method: "POST", // posts topping to db
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pizza) // converts topping to string
      }

      fetch("http://localhost:3000/pizzas", requestOptions)
      .then((response) => response.json())
      .then((pizzaData) => {
        console.log(pizzaData)
        if (JSON.stringify(pizzas).includes(JSON.stringify(pizzaData.toppings))) {
          console.log("In data, pizza not added");
        }
        else {
          pizzas.push(pizzaData); // pushes item into this data array
          setPizzaData({ pizzas: pizzas }); // setData = currentData
        }
      }); 
    }
  }

  const deletePizza = (pizza) => {
    console.log(pizza)
    const pizzas = pizzaData["pizzas"];
    const requestOptions = {
      method: "DELETE"
    }
    fetch(`http://localhost:3000/pizzas/${pizza.id}`, requestOptions).then(
      (response) => {
        //Checks response code
        if (response.ok) {
          const idx = pizzas.indexOf(pizza); // finds index in array
          pizzas.splice(idx, 1);
          setPizzaData({pizzas: pizzas})
        }
      }
    );
  };

  // Used when we want to update a topping's name. Used in ToppingDisplay.js

  const getSelectedTopping = (topping) => {
    selectedTopping = topping.topping;
    console.log(selectedTopping);
    
  };

  // Updates pizza with global selected topping. This topping updates in getSelectedTopping function
  const updatePizza = (pizza) => {
    let pizzas = pizzaData["pizzas"];

    // If the selected topping is in the pizza data already, delete it
    if (JSON.stringify(pizza.toppings).includes(selectedTopping)) { // checks for duplicate topping in data
      // check if another pizza has the same toppings, after delete. If duplicate pizza, do nothing
      console.log("In data, delete topping");
      
      var idx = pizzas[pizza.id].toppings.indexOf(selectedTopping); // finds index in array
      pizzas[pizza.id].toppings.splice(idx, 1)
      setPizzaData({pizzas: pizzas})

      var isDuplicate = hasDuplicate(pizzas, "toppings");
      if (isDuplicate) {
        console.log("Error: Duplicate Pizza")
        pizzas[pizza.id].toppings.push(selectedTopping); // pushes item into this data array
        setPizzaData({ pizzas: pizzas }); // setData = currentData
      }
        
    }  

    // Topping not in pizza data, add it
    else {
      console.log(pizzas[pizza.id])
      pizzas[pizza.id].toppings.push(selectedTopping); // pushes item into this data array
      setPizzaData({ pizzas: pizzas }); // setData = currentData

      // Check for duplicate pizza
      var isDuplicate = hasDuplicate(pizzas, "toppings");
      if (isDuplicate) {
        console.log("Error: Duplicate Pizza")
        var idx = pizzas[pizza.id].toppings.indexOf(selectedTopping); // finds index in array
        pizzas[pizza.id].toppings.splice(idx, 1)
        setPizzaData({pizzas: pizzas})
      }
    }
      const requestOptions = {
        method: "PUT", // posts topping to db
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pizza) // converts topping to string
      }

      fetch(`http://localhost:3000/pizzas/${pizza.id}`, requestOptions)
      .then((response) => response.json())
      .then((pizzaData) => {}); // *get[s] data from backend data
    
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
        <NavBar />
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

        <div className = "menu-box">
          <ToppingMenu
          toppings={filterData(toppingData["toppings"])}
          getSelectedTopping={getSelectedTopping} />
        </div>

        <div className="pizza-box">
          <PizzaDisplay 
          deletePizza={deletePizza}
          updatePizza={updatePizza}
          pizzas={filterData(pizzaData["pizzas"])} />

          <AddPizza addPizza={addPizzaToData} />
        </div>



      </div>
    </body>
  );
}

export default Home;