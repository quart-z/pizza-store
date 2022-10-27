function ToppingMenu({ toppings, getSelectedTopping }) {


	const selectButton = (topping) => {
		getSelectedTopping(topping);
		console.log(topping)
	}


	const showTopping = (topping) => {

		return (
			<tr>
				<th scope="row">{topping.id}</th>
				<td>{topping.topping}</td>
				<td>
					<button className="select-button" onClick={() => selectButton(topping)}>
						Select 
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
		</div>
	);
}

export default ToppingMenu;
