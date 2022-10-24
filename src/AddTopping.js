import { useState } from "react";

function AddTopping(props) { 
	const [topping, setTopping] = useState("");


	const toppingButtonPressed = () => {
		props.addTopping({
			topping: topping,
		});
		setTopping(" "); // clears topping after add button pressed

			
	}

	return (
		<div>
			<h1> Add Topping to Pizza </h1>
			<form>
				<label htmlFor="topping-name-field"> Topping Name: </label>
				<input
					id="topping-name-field"
					type="text"
					value={topping}
					onChange={(e) => setTopping(e.target.value)}
				/>

				<button type="button" onClick={toppingButtonPressed}>
					Add Topping
				</button>
			</form>
		</div>
		);
}

export default AddTopping;