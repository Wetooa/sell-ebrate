
-- Insert data into tblAccount
INSERT INTO tblAccount (firstName, lastName, email, password, gender, birthdate) VALUES
('John', 'Doe', 'john.doe@example.com', 'hashedpassword1', 'male', '1985-07-12'),
('Jane', 'Smith', 'jane.smith@example.com', 'hashedpassword2', 'female', '1990-08-25'),
('Alice', 'Johnson', 'alice.johnson@example.com', 'hashedpassword3', 'female', '1982-11-15'),
('Bob', 'Brown', 'bob.brown@example.com', 'hashedpassword4', 'male', '1977-03-04');

-- Insert data into tblUser
INSERT INTO tblUser (userId, street, barangay, municipality, province, country, zipcode) VALUES
(1, '123 Elm Street', 'Barangay 123', 'City A', 'Province A', 'Country A', '12345'),
(2, '234 Oak Street', 'Barangay 234', 'City B', 'Province B', 'Country B', '23456'),
(3, '345 Maple Street', 'Barangay 345', 'City C', 'Province C', 'Country C', '34567'),
(4, '456 Pine Street', 'Barangay 456', 'City D', 'Province D', 'Country D', '45678');

-- Insert data into tblSeller
INSERT INTO tblSeller (sellerId, sellerCertification) VALUES
(1, 'Certified Organic'),
(3, 'Fair Trade Certified');

-- Insert data into tblBuyer
INSERT INTO tblBuyer (buyerId) VALUES
(2),
(4);

-- Insert data into tblProduct
INSERT INTO tblProduct (sellerId, productName, description, quantity, price) VALUES
(1, 'Organic Apples', 'Fresh organic apples from local farms.', 100, 1.50),
(3, 'Coffee Beans', 'Premium Arabica coffee beans, fair trade certified.', 50, 12.75);

-- Insert data into tblCart
INSERT INTO tblCart (userId) VALUES
(2),
(4);

-- Insert data into tblCartItem
INSERT INTO tblCartItem (cartId, productId) VALUES
(1, 1),
(2, 2);

-- Insert data into tblOrder
INSERT INTO tblOrder (buyerId, isPaid) VALUES
(2, FALSE),
(4, TRUE);

-- Insert data into tblOrderItem
INSERT INTO tblOrderItem (orderId, productId, quantity) VALUES
(1, 1, 2),
(2, 2, 1);

-- Insert data into tblPayment
INSERT INTO tblPayment (orderId, buyerId, amount) VALUES
(2, 4, 12.75);

-- Insert data into tblReview
INSERT INTO tblReview (userId, productId, rating, message) VALUES
(2, 1, 5, 'Great quality and very fresh!'),
(4, 2, 4, 'Very good coffee, but a bit pricey.');

-- Insert data into tblReply
INSERT INTO tblReply (reviewId, message) VALUES
(1, 'Thank you for your feedback!'),
(2, 'Thanks for the review! We\'re glad you enjoyed it.');
