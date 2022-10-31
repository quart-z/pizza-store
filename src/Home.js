import './Home.css';
import AddTopping from "./components/AddTopping";
import ToppingDisplay from "./components/ToppingDisplay";
import ToppingMenu from "./components/ToppingMenu";

import { useState, useEffect } from "react";


var selectedTopping = "";

function Home() {
  const [filters, setFilters] = useState({});
  const [toppingData, setToppingData] = useState({ toppings: [] }); // Stores toppings


  useEffect(() => {
    fetch("http://localhost:3000/toppings")
    .then((response) => response.json())
    .then((toppingData) => setToppingData({ toppings: toppingData }));
  }, []);



  // function to return sliced array after slice




  const addToppingToData = (topping) => {
    let toppings = toppingData["toppings"]; // Stores state in data
    //topping.id = toppings.length; // sets id for each topping
    console.log(toppings.length)

    if (toppings.length >= 20) {
      console.log("Topping length cannot exceed 20.")
    }
    else {

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
  }

  const deleteTopping = (topping) => {
    if (topping.id == 0) { // Don't delete first pizza,
      console.log("Cannot delete 1st topping in data")
    }
    else {

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
    }
  };

  // Used when we want to update a topping's name. Used in ToppingDisplay.js
  const updateTopping = (topping, editElem) => {
    const toppings = toppingData["toppings"];
    
    if (JSON.stringify(toppings).includes(editElem)) { // checks for duplicate topping in data
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



  const filterData = (data) => {
    const filteredData = [];

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
    console.log(filteredData)
    return filteredData;

  }



  return (
    <div>
      <div className="title-content-box"> 
        <h1 className="title-text"> Welcome to your Pizza Store! </h1>
        <h2 className="title-text"> Add a topping, update a topping, or delete one from the menu. Afterwards, go make a pizza! </h2>
        <a href="/chef" className="manage-pizza-link">
          Manage Pizzas
        </a>
      </div>

      <div className = "menu-content-box">
        <div className="menu-logo-box">
          <h1 className="menu-logo-text"> Pizza Toppings Menu </h1>
          <img src="/menu-logo.png" href="index.html" className="menu-logo-box">
          </img>
        </div>

        <div className="menu-topping-box"> 
          <AddTopping addTopping={addToppingToData} />

          <ToppingDisplay 
          deleteTopping={deleteTopping}
          updateTopping={updateTopping}
          toppings={filterData(toppingData["toppings"])} />
        </div>
      </div>
    </div>
  );
}

export default Home;