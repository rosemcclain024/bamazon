var mysql = require("mysql");
var inquirer = require("inquirer");
//cli-table "Table" needs to be capitalized (as a variable) because that's what NPM says it should be.
var Table = require("cli-table");

var connection = mysql.createConnection({

    host: "localhost",

    port: 8889,

    user: "root",

    password: "root",

    database: "bamazon_DB"

});

//!!
//i need to understand the setup for this function!! 
//!!
connection.connect(function (err) {

    if (err) throw err;
    // console.log("connected as id" + connection.threadId);
    start();
});

// CRUD: Create, Read, Update, Delete
function start() {
    //connection.query is found on NPM
    connection.query('SELECT * FROM `products`', function (err, results) {
        if (err) throw err;
        var table = new Table({
            head: ["ID", "product name", "department name", "price", "stock quantity"],
            colWidths: [5, 50, 20, 15, 25]
        });

        for (var i = 0; i < results.length; i++) {
            table.push(
                [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]);
        }
        console.log(table.toString());
        select();
    });
}

function select() {
    inquirer
        .prompt([
            {
                name: "purchase",
                item: "input",
                message: "Enter the ID of the product you would like to buy!"
            },
            {
                name: "quantity",
                item: "input",
                message: "How many of these items would you like to buy?"
            }
        ])

        .then(function (response) {

            var itemPurchase = parseInt(response.purchase);
            //parseInt to make sure it's a number so that when we go to do math it actually works
            var purchasedQuantity = parseInt(response.quantity);

            var itemConv = parseInt(response.purchase - 1);

            
            // console.log(response.purchase);
            // console.log(itemPurchase);

            connection.query('SELECT * FROM products', function(err, res) {
                if (err) throw err;
                var pId = response.purchase;
                var total = res[itemConv].price * purchasedQuantity;
                if (res[itemConv].stock_quantity >= purchasedQuantity) {
                    console.log("Your total comes to: " + total);
                    // connection.query('SELECT * FROM products', function(err, res) { 
                        // console.log(res[itemConv].product_name);
                        var sql = "UPDATE products SET ? WHERE ?";
                        var data = [
                            {
                                stock_quantity: (res[itemConv].stock_quantity) - purchasedQuantity
                            },

                            {
                                item_id: response.purchase
                            }];
                        
                        connection.query(sql, data, function(err, res) {
                            if(err) throw err;

                            // console.log("success !!1!!!11!");
                            askAgain();
                            // connection(destroy);
                        });

                 
            
                    } else {
                        console.log("sorry!! insufficient inventory!");
                        select();
                       


            }

        });

    });

}

function askAgain() {
    inquirer
        .prompt ([
            {
                name: "ask",
                type: "confirm",
                message: "Would you like to purchase something else?"
            }

        ])
        .then(function(valuesOfPrompted) {
            if(valuesOfPrompted.ask) {
                select();
            }
            else {
                console.log("Thanks! See you soon.");
                connection.destroy();
            }
        });
        
    }














