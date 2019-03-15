CREATE DATABASE remontdb;
USE remontdb;
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
(1, 'Sony', 'OK', '200 RUB'),
(6, 'Sony', 'OK', '200 RUB.'),
(5, 'Iphone 5s', 'OK', '40 GRI'),
(2, 'Samsung', 'Not OK', '25 RUB'),
(3, 'Nokia', 'OK', '36 RUB'),
(4, 'Xiaomi', 'OK', '24 RUB');
