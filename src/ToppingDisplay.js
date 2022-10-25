import { useState } from "react";

function ToppingDisplay({ toppings, deleteTopping, updateTopping }) {

	const [updatedTopping, setTopping] = useState("");

	const updateButton = (topping) => {
		updateTopping(topping, updatedTopping)
		setTopping(" "); // clears topping after add button pressed
	}


	
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
				<td>
					<button className="update-button" onClick={() => updateButton(topping)}>
						Update 
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
				<form>
				<label htmlFor="update-topping-name-field"> Update Topping: </label>
				<input
					id="topping-name-field"
					type="text"
					value={updatedTopping}
					onChange={(e) => setTopping(e.target.value)}
				/>
			</form>
			</div>
		</div>
	);
}

export default ToppingDisplay;
