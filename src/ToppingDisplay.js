function ToppingDisplay(props) {
	return ( 
		<div>
			{props.toppings.map((topping) => {
				return (

					<div>
				 		<p> Topping: {topping.topping} </p>
				 	</div>

				 );
		 })} 
		</div>
	);
}

export default ToppingDisplay;