CREATE DATABASE coral;

/* 
Can't use a query to move databases in postgresql, must open psql terminal and use
\c coral
*/

CREATE TABLE vessels (
		vessel_id int PRIMARY KEY,
		vessel_name varchar(10) NOT NULL,
		region varchar(20) NOT NULL,
		preptime int
);

CREATE TABLE orders (
		order_id int PRIMARY KEY,
		vessel_id int REFERENCES vessel(vessel_id),
		amount money NOT NULL,
		order_date date NOT NULL
);

INSERT INTO vessel (vessel_id, vessel_name, region, preptime)
	VALUES (1, 'Vessel_01', 'Atlantic', 12);
INSERT INTO vessel (vessel_id, vessel_name, region)
	VALUES (2, 'Vessel_02', 'Atlantic', 13);
INSERT INTO vessel (vessel_id, vessel_name, region)
	VALUES (3, 'Vessel_03', 'Pacific', 11);
INSERT INTO vessel (vessel_id, vessel_name, region)
	VALUES (4, 'Vessel_04', 'Artic', 12);
INSERT INTO vessel (vessel_id, vessel_name, region)
	VALUES (5, 'Vessel_05', 'Atlantic', 13);
INSERT INTO vessel (vessel_id, vessel_name, region)
	VALUES (6, 'Vessel_06', 'Pacific', 14);
INSERT INTO vessel (vessel_id, vessel_name, region)
	VALUES (7, 'Vessel_07', 'Artic', 12);

INSERT INTO orders VALUES (1001, 2, 35.40, '12/20/20')