import { useState } from "react";
import "./AddTopping.css";

function AddTopping(props) { 
	const [topping, setTopping] = useState("");


	const toppingButtonPressed = () => {
		props.addTopping({
			topping: topping,
		});
		setTopping(""); // clears topping after add button pressed

			
	}

	return (
		<div className = "add-topping-content-box">
			<h1 className ="add-topping-text"> Add Topping </h1>
			<form className ="add-topping-form">
				<input
					id="topping-name-field"
					type="text"
					value={topping}
					onChange={(e) => setTopping(e.target.value)}
				/>

				<button type="button" className="add-topping-button" onClick={toppingButtonPressed}>
					<h2 className="add-topping-button-text"> Add Topping </h2>
				</button>
			</form>
		</div>
		);
}

export default AddTopping;