
-- Insert dummy data into tblAccount
INSERT INTO tblAccount (firstName, lastName, email, password, gender, birthdate) VALUES
('John', 'Doe', 'johndoe@example.com', 'password1', 'male', '1990-01-01'),
('Jane', 'Doe', 'janedoe@example.com', 'password2', 'female', '1995-05-15'),
('Mike', 'Smith', 'mikesmith@example.com', 'password3', 'male', '1985-10-20'),
('Alice', 'Johnson', 'alicejohnson@example.com', 'password4', 'female', '1988-03-22'),
('Robert', 'Brown', 'robertbrown@example.com', 'password5', 'male', '1992-07-30'),
('Emily', 'White', 'emilywhite@example.com', 'password6', 'female', '1987-11-11');

-- Insert dummy data into tblUser
INSERT INTO tblUser (userId, street, barangay, municipality, province, country, zipcode) VALUES
(1, '123 Street', 'Barangay A', 'City A', 'Province A', 'Country A', '12345'),
(2, '456 Street', 'Barangay B', 'City B', 'Province B', 'Country B', '67890'),
(3, '789 Street', 'Barangay C', 'City C', 'Province C', 'Country C', '54321'),
(4, '321 Street', 'Barangay D', 'City D', 'Province D', 'Country D', '98765');

-- Insert dummy data into tblSeller
INSERT INTO tblSeller (sellerId, sellerCertification) VALUES
(1, 'Certification A'),
(2, 'Certification B');

-- Insert dummy data into tblBuyer
INSERT INTO tblBuyer (buyerId) VALUES
(1),
(2);

-- Insert dummy data into tblProduct
INSERT INTO tblProduct (sellerId, productName, description, quantity, price) VALUES
(1, 'Product A', 'Description of Product A', 100, 50.99),
(2, 'Product B', 'Description of Product B', 75, 75.50),
(1, 'Product C', 'Description of Product C', 150, 20.45),
(2, 'Product D', 'Description of Product D', 200, 15.99),
(1, 'Product E', 'Description of Product E', 90, 55.95),
(2, 'Product F', 'Description of Product F', 120, 35.70),
(1, 'Product G', 'Description of Product G', 60, 65.00),
(2, 'Product H', 'Description of Product H', 30, 45.75),
(1, 'Product I', 'Description of Product I', 85, 75.20),
(2, 'Product J', 'Description of Product J', 50, 95.50);

-- Insert dummy data into tblCart
INSERT INTO tblCart (userId, productId) VALUES
(1, 1),
(2, 2);

-- Insert dummy data into tblOrder
INSERT INTO tblOrder (orderId) VALUES
(DEFAULT),
(DEFAULT);

-- Insert dummy data into tblOrderItem
INSERT INTO tblOrderItem (orderId, productId, quantity) VALUES
(1, 1, 2),
(2, 2, 1);

-- Insert dummy data into tblPayment
INSERT INTO tblPayment (orderId, buyerId, amount) VALUES
(1, 1, 101.98),
(2, 2, 75.50);

-- Insert dummy data into tblReview
INSERT INTO tblReview (userId, rating, message) VALUES
(1, 5, 'Great product!'),
(2, 4, 'Good service.');

-- Insert more tblReview entries to match the number of replies
INSERT INTO tblReview (userId, productId, rating, message) VALUES
(3, 1, 5, 'Loved the quick delivery.'),
(4, 1, 4, 'Very satisfied with the purchase.'),
(2, 1, 3, 'Decent quality, but could be better.'),
(1, 1, 5, 'Best product at this price range.'),
(3, 1, 4, 'Would definitely recommend.');

-- Insert dummy data into tblReply
INSERT INTO tblReply (replyId, reviewId, message) VALUES
(1, 1, 'Thank you for your feedback.'),
(2, 2, 'We appreciate your review.'),
(3, 3, 'Thanks for your kind words!'),
(4, 4, 'We are glad you liked it!'),
(5, 5, 'Thank you, we will try to improve.'),
(6, 1, 'Looking forward to your next visit.'),
(7, 2, 'We are always here to help.'),
(8, 3, 'Your satisfaction is our priority.'),
(9, 4, 'Thank you for recommending us.'),
(10, 5, 'We will take your feedback seriously.');

INSERT INTO tblReview (userId, productId, rating, message)
VALUES
(3, 1, ROUND(RAND() * 4) + 1, 'Impressed with the quality and service.'),
(4, 1, ROUND(RAND() * 4) + 1, 'Excellent product, highly recommended!'),
(2, 1, ROUND(RAND() * 4) + 1, 'Good value for the money.'),
(1, 1, ROUND(RAND() * 4) + 1, 'Absolutely love it, exceeded my expectations.'),
(3, 1, ROUND(RAND() * 4) + 1, 'Great experience, will buy again.'),
(4, 1, ROUND(RAND() * 4) + 1, 'Very satisfied with the purchase.'),
(2, 1, ROUND(RAND() * 4) + 1, 'Happy with the product, thank you!'),
(1, 1, ROUND(RAND() * 4) + 1, 'Fantastic quality, arrived on time.'),
(3, 1, ROUND(RAND() * 4) + 1, 'Impressive customer service, top-notch!'),
(4, 1, ROUND(RAND() * 4) + 1, 'Highly impressed with the packaging.'),
(2, 1, ROUND(RAND() * 4) + 1, 'Love it! Great value for money.'),
(1, 1, ROUND(RAND() * 4) + 1, 'Delighted with the purchase, thank you!'),
(3, 1, ROUND(RAND() * 4) + 1, 'Amazing product, exceeded my expectations.'),
(4, 1, ROUND(RAND() * 4) + 1, 'Very happy with my purchase, thank you!'),
(2, 1, ROUND(RAND() * 4) + 1, 'Superb quality, highly recommended!'),
(1, 1, ROUND(RAND() * 4) + 1, 'Extremely satisfied with the product.'),
(3, 1, ROUND(RAND() * 4) + 1, 'Great quality and fast delivery, thank you!'),
(4, 1, ROUND(RAND() * 4) + 1, 'Very pleased with my order, thank you!'),
(2, 1, ROUND(RAND() * 4) + 1, 'Excellent service and product quality.'),
(1, 1, ROUND(RAND() * 4) + 1, 'Fantastic purchase, highly recommended!');
