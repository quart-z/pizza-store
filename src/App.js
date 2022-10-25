import './App.css';
import AddTopping from "./AddTopping";
import ToppingDisplay from "./ToppingDisplay";

import { useState, useEffect } from "react";


function Home() {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState({ toppings: [] }); // Stores items


  useEffect(() => {
    fetch("http://localhost:3000/toppings")
    .then((response) => response.json())
    .then((data) => setData({ toppings: data }));
  }, []);




  const addToppingToData = (topping) => {
    let toppings = data["toppings"]; // Stores state in data
    //topping.id = toppings.length; // sets id for each topping

    const requestOptions = {
      method: "POST", // posts topping to db
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topping) // converts topping to string
    }

    fetch("http://localhost:3000/toppings", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        toppings.push(data); // pushes item into this data array
        setData({ toppings: toppings }); // setData = currentData
      }); // *get[s] data from backend data
  }

  const deleteTopping = (topping) => {
    const toppings = data["toppings"];
    const requestOptions = {
      method: "DELETE"
    }
    fetch(`http://localhost:3000/toppings/${topping.id}`, requestOptions).then(
      (response) => {
        //Checks response code
        if (response.ok) {
          const idx = toppings.indexOf(topping); // finds index in array
          toppings.splice(idx, 1) // removes element from array, at the index we found
          setData({toppings: toppings})
        }
      }
    );
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
    return filteredData;

  }



  return (
    <body>
      <header>

      </header>
      <div className = "main-content-box">
      
        {/* Section 1 - Content section , <Content /> */}

        <AddTopping addTopping={addToppingToData} />
        <ToppingDisplay 
        deleteTopping={deleteTopping}
        toppings={filterData(data["toppings"])} />

      </div>
    </body>
  );
}

export default Home;