var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password:"",
	database:"bamazon"
});

// console.log("Connection is working: ", connection);
// connection.end();

var promptUser = function(){
	inquirer.prompt([{
			name: "hello",
		    message: "Welcome to Bamazon!"
		},
	    {
		    name: "demand",
		    message: "What ID product would you like to buy?"
		},
	    {
	    	name: "supply",
	    	message: "How many units of the product they would like to buy?"

	  }]).then(function(results){
	  	
	  	var demand = results.demand;
	  	var supply = results.supply;

	  	connection.query('SELECT stock_quantity,price,product_name FROM products Where item_id = ' + demand, function(error,results){
	  		if (error) throw error;

	  		var soh = results[0].stock_quantity;
	  		console.log('results')
	  		console.log(results)
	  		console.log('soh')
	  		console.log(soh)
	  		// soh = stockOnHand
	  		var price = results[0].price;
	  		var name = results[0].product_name;

	  		if(soh >= supply){
	  			console.log("Lucky you! We have the item in stock");
	  			console.log("We have " + soh + " of " + name);

	  			inquirer.prompt(
	  			{
	  				name: "finish",
	  				message: "Place your order before we sell out!!!"
	  			}).then(function(answer){
	  				var newSoh = soh - supply;
	  				var total = supply * price;

	  				if(answer.finish === "yes"){
	  					connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newSoh}, {item_id:demand}], function(err,res){
	  						if(err) throw err;
	  						console.log("IT NOW YOURS!")
	  						console.log("Your total is " + total + "dollars.");
	  						console.log("");
	  						console.log("Our current inventory is " + newSoh + " of " +  name);
	  						console.log("");
	  						console.log("");
	  						// promptUser();
	  					})
	  				}

	  				// promptUser();
	  			})
	  		} else {
	  			console.log("Insufficient quantity!");
	  			// promptUser();
	  		}

	  	})

	  })
}



connection.query('SELECT * FROM products', function (error, results, fields) {
  if (error) throw error;
  for(var i = 0; i < results.length; i++){
  	console.log('ID', results[i].item_id + ": ",results[i].product_name,"$" + results[i].price);
	}
	promptUser();
});