CREATE database Bamazon;

USE Bamazon;

CREATE TABLE products  (
 item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
 product_name varchar(255) not null,
 department_name varchar(255) not null,
 price decimal(10,4) not null,
 stock_quantity integer(25) not null,
 primary key(item_id)
);

insert into products (product_name,department_name, price,stock_quantity)
value
("t-shirt", "clothing", 4.99, 100),
("socks","clothing", 3.99, 200),
("sweater","clothing", 9.99, 50),
("sweatpants","clothing", 9.99, 50),
("blouse","clothing", 19.99, 75),
("jeans","clothing", 29.99, 100),
("hats","clothing", 24.99, 75),
("shoes","clothing", 249.99, 200),
("dress","clothing", 14.99, 50),
("scarf","clothing", 300.00, 25);