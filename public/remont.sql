
USE heroku_0797947479f038e;
SET NAMES 'cp1251';
SET CHARACTER SET 'cp1251';
CREATE TABLE Remont
(
  `imei` bigint(20) NOT NULL,
  `model` text NOT NULL,
  `status` text NOT NULL,
  `cost` text NOT NULL
)
DEFAULT CHARACTER SET = 'utf8';

INSERT INTO Remont (`imei`, `model`, `status`, `cost`) VALUES
(1, 'Sony phone', 'OK', '200 BYN'),
(6, 'Sony', 'OK', '200 BYN.'),
(5, 'Iphone 5s', 'OK', '40 GRI'),
(2, 'Samsung g2', 'Not OK', '25 BYN'),
(3, 'Nokia', 'OK', '36 BYN'),
(4, 'Iphone X', 'Not OK', '46 BYN'),
(7, 'Xiaomi Redmi note', 'OK', '23 BYN'),
(9, 'Samsung Galaxy s5', 'OK', '142 BYN'),
(8, 'Xperia a4', 'OK', '56 USD'),
(11, 'Blackberry', 'Not OK', '115 USD'),
(10, 'PS 4', 'OK', '58 BYN'),
(12, 'Xbox One X', 'OK', '93 BYN'),
(13, 'Macbook pro', 'OK', '543 BYN'),
(18, 'Mystery monitor', 'OK', '25 EU'),
(16, 'Iphone 8', 'OK', '98 USD'),
(14, 'Dell Alienware 17 R4', 'Not OK', '326 BYN'),
(15, 'Asus ROG 2', 'OK', '73 BYN'),
(56, 'LG Monitor r5', 'Not OK', '76 BYN'),
(24, 'Lenovo lEGION Y530', 'OK', '210 BYN'),
(48, 'Acer Predator', 'OK', '33 BYN'),
(19, 'Xiaomi', 'OK', '24 BYN');
