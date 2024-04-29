
CREATE TABLE tblAccount (
  accountId BIGINT AUTO_INCREMENT PRIMARY KEY,

  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  gender ENUM('male', 'female') DEFAULT 'male',
  birthdate DATETIME,

  CONSTRAINT chkGender CHECK (gender IN ('male', 'female'))
);

CREATE TABLE tblUser (
  userId BIGINT,

  street TEXT,
  barangay TEXT,
  municipality TEXT,
  province TEXT,
  country TEXT NOT NULL,
  zipcode TEXT
);

CREATE TABLE tblSeller (
  sellerId BIGINT,

  sellerCertification TEXT
);

CREATE TABLE tblBuyer (
  buyerId BIGINT
);

CREATE TABLE tblProduct (
  productId BIGINT AUTO_INCREMENT PRIMARY KEY,

  sellerId BIGINT,

  productName TEXT,
  description TEXT,
  quantity BIGINT,
  price DOUBLE
);

CREATE TABLE tblCart (
  cartId BIGINT AUTO_INCREMENT PRIMARY KEY,

  userId BIGINT
);

CREATE TABLE tblCartItem (
  cartId BIGINT,
  productId BIGINT
);

CREATE TABLE tblOrder (
  orderId BIGINT AUTO_INCREMENT PRIMARY KEY,

  buyerId BIGINT,

  isPaid BOOLEAN DEFAULT FALSE
);

CREATE TABLE tblOrderItem (
  orderId BIGINT,

  productId BIGINT,

  quantity BIGINT
);

CREATE TABLE tblPayment (
  paymentId BIGINT AUTO_INCREMENT PRIMARY KEY,

  orderId BIGINT,
  buyerId BIGINT,

  amount BIGINT,
  date DATETIME DEFAULT NOW()
);

CREATE TABLE tblReview (
  reviewId BIGINT AUTO_INCREMENT PRIMARY KEY,

  userId BIGINT,

  rating INT(5),
  message TEXT
);

CREATE TABLE tblReply (
  replyId BIGINT AUTO_INCREMENT PRIMARY KEY,

  reviewId BIGINT,

  message TEXT
);

ALTER TABLE tblUser
ADD CONSTRAINT fkUserAccount
FOREIGN KEY (userId) REFERENCES tblAccount(accountId)
ON DELETE CASCADE;

ALTER TABLE tblSeller
ADD CONSTRAINT fkSellerAccount
FOREIGN KEY (sellerId) REFERENCES tblAccount(accountId)
ON DELETE CASCADE;

ALTER TABLE tblBuyer
ADD CONSTRAINT fkBuyerAccount
FOREIGN KEY (buyerId) REFERENCES tblAccount(accountId)
ON DELETE CASCADE;

ALTER TABLE tblProduct
ADD CONSTRAINT fkProductSeller
FOREIGN KEY (sellerId) REFERENCES tblSeller(sellerId)
ON DELETE CASCADE;

ALTER TABLE tblCart
ADD CONSTRAINT fkCartUser
FOREIGN KEY (userId) REFERENCES tblUser(userId)
ON DELETE CASCADE;

ALTER TABLE tblCartItem
ADD CONSTRAINT fkCartItemCart
FOREIGN KEY (cartId) REFERENCES tblCart(cartId)
ON DELETE CASCADE,
ADD CONSTRAINT fkCartItemProduct
FOREIGN KEY (productId) REFERENCES tblProduct(productId)
ON DELETE CASCADE;

ALTER TABLE tblOrder
ADD CONSTRAINT fkOrderBuyer
FOREIGN KEY (buyerId) REFERENCES tblBuyer(buyerId)
ON DELETE CASCADE;

ALTER TABLE tblOrderItem
ADD CONSTRAINT fkOrderItemOrder
FOREIGN KEY (orderId) REFERENCES tblOrder(orderId)
ON DELETE CASCADE,
ADD CONSTRAINT fkOrderItemProduct
FOREIGN KEY (productId) REFERENCES tblProduct(productId)
ON DELETE CASCADE;

ALTER TABLE tblPayment
ADD CONSTRAINT fkPaymentOrder
FOREIGN KEY (orderId) REFERENCES tblOrder(orderId)
ON DELETE CASCADE,
ADD CONSTRAINT fkPaymentBuyer
FOREIGN KEY (buyerId) REFERENCES tblBuyer(buyerId)
ON DELETE CASCADE;

ALTER TABLE tblReview
ADD CONSTRAINT fkReviewUser
FOREIGN KEY (userId) REFERENCES tblUser(userId)
ON DELETE CASCADE;

ALTER TABLE tblReply
ADD CONSTRAINT fkReplyReview
FOREIGN KEY (reviewId) REFERENCES tblReview(reviewId)
ON DELETE CASCADE;


-- CODE BELOW CONVERTED TO POSTGRESQL DAW ANA GPT HEHE
-- supabaseanon key = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltY2t4Y2RwbXpvbnFsbWttdGxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzOTk0MDAsImV4cCI6MjAyOTk3NTQwMH0.wwT0vtQsIc3kHdpZnT2YzcH8WMoWi5WQ8biXQRl2TOA
-- supabase url key = https://ymckxcdpmzonqlmkmtla.supabase.co
-- supabase password = AdrianandVal123

CREATE TABLE tblAccount (
  accountId SERIAL PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  gender VARCHAR(6) DEFAULT 'male' CHECK (gender IN ('male', 'female')),
  birthdate TIMESTAMP
);

CREATE TABLE tblUser (
  userId BIGINT PRIMARY KEY,
  street TEXT,
  barangay TEXT,
  municipality TEXT,
  province TEXT,
  country TEXT NOT NULL,
  zipcode TEXT,
  FOREIGN KEY (userId) REFERENCES tblAccount(accountId) ON DELETE CASCADE
);

CREATE TABLE tblSeller (
  sellerId BIGINT PRIMARY KEY,
  sellerCertification TEXT,
  FOREIGN KEY (sellerId) REFERENCES tblAccount(accountId) ON DELETE CASCADE
);

CREATE TABLE tblBuyer (
  buyerId BIGINT PRIMARY KEY,
  FOREIGN KEY (buyerId) REFERENCES tblAccount(accountId) ON DELETE CASCADE
);

CREATE TABLE tblProduct (
  productId SERIAL PRIMARY KEY,
  sellerId BIGINT REFERENCES tblSeller(sellerId) ON DELETE CASCADE,
  productName TEXT,
  description TEXT,
  quantity BIGINT,
  price DOUBLE PRECISION
);

CREATE TABLE tblCart (
  cartId SERIAL PRIMARY KEY,
  userId BIGINT REFERENCES tblUser(userId) ON DELETE CASCADE
);

CREATE TABLE tblCartItem (
  cartId BIGINT REFERENCES tblCart(cartId) ON DELETE CASCADE,
  productId BIGINT REFERENCES tblProduct(productId) ON DELETE CASCADE,
  PRIMARY KEY (cartId, productId)
);

CREATE TABLE tblOrder (
  orderId SERIAL PRIMARY KEY,
  buyerId BIGINT REFERENCES tblBuyer(buyerId) ON DELETE CASCADE,
  isPaid BOOLEAN DEFAULT FALSE
);

CREATE TABLE tblOrderItem (
  orderId BIGINT REFERENCES tblOrder(orderId) ON DELETE CASCADE,
  productId BIGINT REFERENCES tblProduct(productId) ON DELETE CASCADE,
  quantity BIGINT,
  PRIMARY KEY (orderId, productId)
);

CREATE TABLE tblPayment (
  paymentId SERIAL PRIMARY KEY,
  orderId BIGINT REFERENCES tblOrder(orderId) ON DELETE CASCADE,
  buyerId BIGINT REFERENCES tblBuyer(buyerId) ON DELETE CASCADE,
  amount BIGINT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tblReview (
  reviewId SERIAL PRIMARY KEY,
  userId BIGINT REFERENCES tblUser(userId) ON DELETE CASCADE,
  rating INT,
  message TEXT
);

CREATE TABLE tblReply (
  replyId SERIAL PRIMARY KEY,
  reviewId BIGINT REFERENCES tblReview(reviewId) ON DELETE CASCADE,
  message TEXT
);
