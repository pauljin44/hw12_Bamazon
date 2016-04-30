var mysql = require('mysql');
var prompt = require('prompt');

prompt.start();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1111',
  database: 'Bamazon'
});

connection.connect(function(err) {

        if (err) {
          console.error('error connecting: ' + err );
          return;
        }
});

var ProductMenu = function() {

    con.query("select * from products", function(err, products) {
        if (err) {
            return err;
        };

        for (var i = 0; i < products.length; i++) {

            console.log('ProductID: ' + products[i].ProductID + 'ProductName: ' + products[i].DepartmentName + ' ' + ' Product: ' + products[i].ProductName + ' ' + ' Price: $' + products[i].Price);
        };
        
        prompt.get(['ProductID', 'Quantity', 'Add_More'], function(err, result) {

            console.log('ProductID: ' + result.ItemID);
            console.log('Quantity: ' + result.Quantity);


            for (var i = 0; i < products.length; i++) {
                if (result.ProductID == products[i].ProductID) {
                    if (products[i].StockQuantity < result.Quantity) {
                        console.log('Insufficient quantity');
                    }

                    var orderTotal = (result.Quantity * products[i].Price);
                    var newStockQuantity = (products[i].StockQuantity - result.Quantity);

                    if (products[i].StockQuantity >= result.Quantity) {
                        console.log('Order total: $' + orderTotal)
                    };
                };


            };

            con.query("UPDATE products SET StockQuantity =" + newStockQuantity + " WHERE ProductID = " + result.ProductID + ";", function(err, products) {
                if (err) {
                    return console.log(err);
                }
                if (result.Add_More == 'yes') {
                    productMenu();
                } else {
                    console.log('Thank you! Your order is complete.');
                    process.exit();
                };
            });



        });

    });