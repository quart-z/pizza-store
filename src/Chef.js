import "./Chef.css"
import ToppingMenu from "./components/ToppingMenu";
import AddPizza from "./components/AddPizza";
import PizzaDisplay from "./components/PizzaDisplay";

import { useState, useEffect } from "react";


var selectedTopping = "";





function Chef() {
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




  const addPizzaToData = (pizza) => {
    let pizzas = pizzaData["pizzas"]; // Stores state in data

    if (pizzas.length >= 10) {
      console.log("Pizza length cannot exceed 10.")
    }

    //  Checks for duplicate pizzas

    else if (JSON.stringify(pizzas).includes(JSON.stringify(pizza.toppings))) {
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
    if (pizza.id == 0) { // Don't delete first pizza,
      console.log("Cannot delete 1st pizza in data")
    }
    else {
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
    }
  };

  // Used when we want to update a topping's name. Used in ToppingDisplay.js

  const getSelectedTopping = (topping) => {
    selectedTopping = topping.topping;
    console.log(selectedTopping);
    
  };

  // Updates pizza with global selected topping. This topping updates in getSelectedTopping function
  const updatePizza = (pizza) => {
    let pizzas = pizzaData["pizzas"];
    console.log(pizzas)
    console.log(pizza.id)

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




  return (
    <div className="body">

      <div className = "chef-menu-content-box">
        <div className="chef-menu-logo-box">
          <h1 className="chef-menu-logo-text"> Create a Pizza </h1>
          <img src="/menu-logo.png" href="index.html" className="chef-menu-logo-box">
          </img>
        </div>

        <h1 className="note-text"> 
        Note: Add a pizza to begin creating a fresh cheese pizza. Select a topping, then select 'update' to either add or delete a topping on a pizza.
        </h1>

        <div className="chef-menu-items-box">
          <div className="chef-menu-topping-box"> 
            <ToppingMenu
            toppings={toppingData["toppings"]}
            getSelectedTopping={getSelectedTopping} />
          </div>

          <div className="chef-pizza-box">
          <PizzaDisplay 
          deletePizza={deletePizza}
          updatePizza={updatePizza}
          pizzas={pizzaData["pizzas"]} />

          <AddPizza addPizza={addPizzaToData} />
          </div>
        </div>

        <h2 className="note-text"> 
        Note: There can be no duplicate pizzas, and you cannot delete all pizzas. *Pizza Max of 10*
        </h2>

      </div>





    </div>
  );
}

export default Chef;