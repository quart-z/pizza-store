import { useState } from "react";
import "./ToppingDisplay.css";

function ToppingDisplay({ toppings, deleteTopping, updateTopping }) {

	const [updatedTopping, setTopping] = useState("");

	const updateButton = (topping) => {
		updateTopping(topping, updatedTopping)
		setTopping(""); // clears topping after add button pressed
	}


	
	const showTopping = (topping) => {

		return (
			<tr className ="topping-row">
				<div className ="topping-text-content-box">
					<th scope="row">Topping {topping.id}:</th>
					<td>{topping.topping}</td>
				</div>

				<div className="topping-button-content-box"> 
					<td>
						<button className="topping-button" onClick={() => deleteTopping(topping)}>
							<h2 className="topping-button-text"> Delete</h2> 
						</button>
					</td>
					<td>
						<button className="topping-button" onClick={() => updateButton(topping)}>
							<h2 className="topping-button-text"> Update </h2> 
						</button>
					</td>
				</div>

			</tr>
		);
	};

	return ( 
		<div>
			<div>
				{toppings.map(showTopping)}
			</div>
			<div>
				<h1 className ="update-topping-text"> Update Topping </h1>
				<form>
				<input
					id="topping-name-field"
					type="text"
					value={updatedTopping}
					onChange={(e) => setTopping(e.target.value)}
				/>
			</form>
			</div>

			<h3 className="final-note-text"> 
			Note: There can be no duplicate toppings in this menu!
			</h3>
		</div>
	);
}

export default ToppingDisplay;
