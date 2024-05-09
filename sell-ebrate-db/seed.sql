
-- Insert data into tblAccount
INSERT INTO tblAccount (firstName, lastName, email, password, gender, birthdate) VALUES
('John', 'Doe', 'john.doe@example.com', 'hashedpassword1', 'male', '1985-07-12'),
('Jane', 'Smith', 'jane.smith@example.com', 'hashedpassword2', 'female', '1990-08-25'),
('Alice', 'Johnson', 'alice.johnson@example.com', 'hashedpassword3', 'female', '1982-11-15'),
('Bob', 'Brown', 'bob.brown@example.com', 'hashedpassword4', 'male', '1977-03-04'),
('Michael', 'Johnson', 'michael.johnson@example.com', 'hashedpassword5', 'male', '1993-04-22'),
('Emily', 'Williams', 'emily.williams@example.com', 'hashedpassword6', 'female', '1988-09-30'),
('David', 'Martinez', 'david.martinez@example.com', 'hashedpassword7', 'male', '1975-12-10'),
('Sarah', 'Brown', 'sarah.brown@example.com', 'hashedpassword8', 'female', '1980-06-18'),
('Matthew', 'Garcia', 'matthew.garcia@example.com', 'hashedpassword9', 'male', '1997-01-05'),
('Olivia', 'Jones', 'olivia.jones@example.com', 'hashedpassword10', 'female', '1995-08-12'),
('Daniel', 'Lopez', 'daniel.lopez@example.com', 'hashedpassword11', 'male', '1983-03-28'),
('Sophia', 'Hernandez', 'sophia.hernandez@example.com', 'hashedpassword12', 'female', '1987-11-24'),
('James', 'Young', 'james.young@example.com', 'hashedpassword13', 'male', '1979-10-15'),
('Ava', 'Gonzalez', 'ava.gonzalez@example.com', 'hashedpassword14', 'female', '1992-07-08'),
('Benjamin', 'Rodriguez', 'benjamin.rodriguez@example.com', 'hashedpassword15', 'male', '1986-05-20'),
('Charlotte', 'Miller', 'charlotte.miller@example.com', 'hashedpassword16', 'female', '1991-02-14'),
('William', 'Jackson', 'william.jackson@example.com', 'hashedpassword17', 'male', '1978-09-03'),
('Amelia', 'Taylor', 'amelia.taylor@example.com', 'hashedpassword18', 'female', '1984-06-25'),
('Ethan', 'Moore', 'ethan.moore@example.com', 'hashedpassword19', 'male', '1990-11-08');


-- Insert data into tblUser
INSERT INTO tblUser (userId, street, barangay, municipality, province, country, zipcode) VALUES
(1, '123 Elm Street', 'Barangay 123', 'City A', 'Province A', 'Country A', '12345'),
(2, '234 Oak Street', 'Barangay 234', 'City B', 'Province B', 'Country B', '23456'),
(3, '345 Maple Street', 'Barangay 345', 'City C', 'Province C', 'Country C', '34567'),
(4, '456 Pine Street', 'Barangay 456', 'City D', 'Province D', 'Country D', '45678'),
(5, '567 Cedar Street', 'Barangay 567', 'City E', 'Province E', 'Country E', '56789'),
(6, '678 Birch Street', 'Barangay 678', 'City F', 'Province F', 'Country F', '67890'),
(7, '789 Pine Street', 'Barangay 789', 'City G', 'Province G', 'Country G', '78901'),
(8, '890 Walnut Street', 'Barangay 890', 'City H', 'Province H', 'Country H', '89012'),
(9, '901 Spruce Street', 'Barangay 901', 'City I', 'Province I', 'Country I', '90123'),
(10, '012 Oak Street', 'Barangay 012', 'City J', 'Province J', 'Country J', '01234'),
(11, '123 Elm Street', 'Barangay 123', 'City K', 'Province K', 'Country K', '12345'),
(12, '234 Maple Street', 'Barangay 234', 'City L', 'Province L', 'Country L', '23456'),
(13, '345 Pine Street', 'Barangay 345', 'City M', 'Province M', 'Country M', '34567'),
(14, '456 Cedar Street', 'Barangay 456', 'City N', 'Province N', 'Country N', '45678'),
(15, '567 Birch Street', 'Barangay 567', 'City O', 'Province O', 'Country O', '56789'),
(16, '678 Elm Street', 'Barangay 678', 'City P', 'Province P', 'Country P', '67890'),
(17, '789 Oak Street', 'Barangay 789', 'City Q', 'Province Q', 'Country Q', '78901'),
(18, '890 Maple Street', 'Barangay 890', 'City R', 'Province R', 'Country R', '89012'),
(19, '901 Pine Street', 'Barangay 901', 'City S', 'Province S', 'Country S', '90123');


-- Insert data into tblSeller
INSERT INTO tblSeller (sellerId, sellerCertification) VALUES
(1, 'Certified Organic'),
(3, 'Fair Trade Certified'),
(5, 'Non-GMO Certified'),
(6, 'Organic Certification Pending'),
(7, 'Fair Trade Certified');

-- Insert data into tblBuyer
INSERT INTO tblBuyer (buyerId) VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10),
(11),
(12),
(13),
(14),
(15),
(16),
(17),
(18),
(19);

-- Insert data into tblProduct
INSERT INTO tblProduct (sellerId, productName, description, quantity, price) VALUES
(1, 'Organic Apples', 'Fresh organic apples from local farms.', 100, 1.50),
(3, 'Fair Trade Coffee', 'Ethically sourced coffee beans, fair trade certified.', 50, 12.75),
(5, 'Organic Strawberries', 'Organically grown strawberries, non-GMO.', 80, 3.25),
(6, 'Organic Spinach', 'Certified organic spinach, pesticide-free.', 60, 2.75),
(7, 'Fair Trade Chocolate', 'Delicious fair trade chocolate bars.', 120, 5.50),
(1, 'Blueberries', 'Juicy blueberries from sustainable sources.', 100, 4.00),
(3, 'Free-Range Eggs', 'Farm-fresh free-range eggs.', 50, 2.00),
(5, 'Artisan Bread', 'Handcrafted artisan bread made with natural ingredients.', 40, 6.00),
(6, 'Organic Milk', 'Organic milk from grass-fed cows.', 70, 3.50),
(7, 'Organic Honey', 'Pure organic honey from local beekeepers.', 90, 8.50);
-- Insert data into tblCart
INSERT INTO tblCart (userId) VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10),
(11),
(12),
(13),
(14),
(15),
(16),
(17),
(18),
(19);
-- Insert data into tblCartItem
INSERT INTO tblCartItem (cartId, productId) VALUES
(1, 1),
(2, 2),
(3, 6),
(4, 2),
(5, 3),
(6, 4),
(7, 6),
(8, 1),
(9, 2),
(10, 3),
(11, 4),
(12, 5),
(13, 6),
(14, 7),
(15, 1),
(16, 2),
(17, 1);

-- Insert data into tblOrder
INSERT INTO tblOrder (buyerId, isPaid) VALUES
(2, FALSE),
(4, TRUE),
(5, FALSE),
(6, TRUE),
(7, TRUE),
(8, FALSE),
(9, TRUE),
(10, FALSE),
(2, FALSE),
(4, TRUE),
(5, FALSE),
(6, TRUE),
(7, TRUE),
(8, FALSE),
(9, TRUE),
(10, FALSE),
(2, FALSE),
(4, TRUE),
(5, FALSE),
(6, TRUE),
(7, TRUE),
(8, FALSE),
(9, TRUE),
(10, FALSE);


-- Insert data into tblOrderItem
INSERT INTO tblOrderItem (orderId, productId, quantity) VALUES
(1, 1, 2),
(2, 2, 1),
(3, 6, 3),
(4, 7, 2),
(5, 5, 4),
(6, 4, 2),
(7, 3, 1),
(8, 1, 2),
(9, 2, 1),
(10, 3, 3),
(11, 4, 2),
(12, 5, 1),
(13, 6, 4),
(14, 7, 3),
(15, 5, 2),
(16, 1, 3),
(17, 1, 1);

-- Insert data into tblPayment
INSERT INTO tblPayment (orderId, buyerId, amount) VALUES
(2, 4, 12.75),
(6, 6, 16.25),
(7, 7, 11.00),
(9, 9, 4.00);

-- Insert data into tblReview
INSERT INTO tblReview (userId, productId, rating, message) VALUES
(2, 1, 5, 'Great quality and very fresh!'),
(4, 2, 4, 'Very good coffee, but a bit pricey.'),
(5, 4, 5, 'Delicious blueberries, very fresh!'),
(6, 1, 4, 'Great eggs, love that they are free-range.'),
(7, 3, 5, 'The artisan bread is fantastic!'),
(8, 1, 3, 'Good strawberries, but a few were mushy.'),
(9, 2, 5, 'Spinach was crisp and tasty.'),
(10, 3, 4, 'Chocolate is rich and smooth.'),
(11, 4, 4, 'Blueberries were plump and sweet.'),
(12, 5, 5, 'The eggs were perfect!'),
(13, 6, 3, 'The bread was a bit dry, but still good.'),
(14, 7, 5, 'I love the fair trade chocolate!'),
(15, 5, 4, 'Blueberries were great, will buy again.'),
(16, 4, 5, 'Best eggs I''ve ever had!'),
(17, 2, 4, 'Really enjoyed the artisan bread.'),
(13, 6, 3, 'The bread was a bit dry, but still good.'),
(14, 7, 5, 'I love the fair trade chocolate!'),
(15, 5, 4, 'Blueberries were great, will buy again.'),
(16, 4, 5, 'Best eggs I''ve ever had!'),
(17, 2, 4, 'Really enjoyed the artisan bread.');


-- Insert data into tblReply
INSERT INTO tblReply (reviewId, message) VALUES
(1, 'Thank you for your feedback!'),
(2, 'Thanks for the review! We''re glad you enjoyed it.'),
(5, 'Thank you for your feedback! We take pride in our produce.'),
(6, 'We''re glad you enjoyed our products!'),
(7, 'Thank you for your kind words. We strive to provide the best.'),
(8, 'We apologize for any inconvenience. We''ll ensure better quality next time.'),
(9, 'Thank you for your review! We''re happy you liked our spinach.'),
(10, 'We''re thrilled you enjoyed our chocolate! Thank you for your review.'),
(11, 'Thank you for your feedback. We''re glad you liked the blueberries.'),
(12, 'We''re glad you enjoyed the eggs!'),
(13, 'Thank you for your feedback! We''ll work on improving our bread.'),
(14, 'We''re glad you love our chocolate! Thank you for your review.'),
(15, 'Thank you for your feedback! We''re glad you enjoyed the blueberries.'),
(16, 'We''re happy to hear that! Thank you for your review.'),
(17, 'Thank you for your feedback. We''re glad you liked the artisan bread.');


