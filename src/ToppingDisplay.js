function ToppingDisplay({ toppings, deleteTopping }) {
	const showTopping = (topping) => {
		return (
			<tr>
				<th scope="row">{topping.id}</th>
				<td>{topping.topping}</td>
				<td>
					<button className="delete-button" onClick={() => deleteTopping(topping)}>
						Delete 
					</button>
				</td>
			</tr>
		);
	};
	return ( 
		<div>
			<div>
				{toppings.map(showTopping)}
			</div>
			<div>

			</div>
		</div>
	);
}

export default ToppingDisplay;