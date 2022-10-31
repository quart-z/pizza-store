import { useState } from "react";

function AddPizza(props) { 
	const [pizza, setPizza] = useState("");


	const pizzaButtonPressed = () => {
		props.addPizza({
			toppings: [],
		});

			
	}

	return (
		<div>
			<h1> Add Pizza to Menu </h1>
			<button type="button" onClick={pizzaButtonPressed}>
				Add Pizza
			</button>
		</div>
		);
}

export default AddPizza;