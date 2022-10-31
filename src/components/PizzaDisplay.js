import "./PizzaDisplay.css"

function PizzaDisplay({ pizzas, deletePizza, updatePizza }) {

	
	const showPizza = (pizza) => {
		return (
			<tr>
				<th scope="row">Pizza {pizza.id}</th>
				<td>{pizza.toppings}</td>
				<td>
					<button className="delete-button" onClick={() => deletePizza(pizza)}>
						Delete 
					</button>
				</td>
				<td>
					<button className="update-button" onClick={() => updatePizza(pizza)}>
						Update 
					</button>
				</td>
			</tr>
		);
	};
	return ( 
		<div>
			<div>
				{pizzas.map(showPizza)}
			</div>
			<div>

			</div>
		</div>
	);
}

export default PizzaDisplay;




