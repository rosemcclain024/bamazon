DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(75) NOT NULL,
  department_name VARCHAR(75) NOT NULL,
  price FLOAT(10, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dog leashes", "pet supplies", 15.00, 200), 


 ("coffee", "school supplies", 10.00, 500), 


 ("The 1975", "records", 25.00, 100), 


 ("Sony a6300", "cameras", 900.00, 30), 


 ("Buffy", "bed comforters", 200.00, 100), 


 ("iphone 10", "apple products", 1000.00, 2000), 


 ("dog collars", "pet supplies", 10.00, 200), 


 ("Sunshine Greetings - Pale Wheat Ale", "beer", 5.00, 100), 


 ("Abstract - Bordeaux Blend", "Orin Swift Wine", 35.00, 100), 


  ("Oculus Rift", "Virtual Reality Headset", 500.00, 50); 









