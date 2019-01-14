--CREATE ROLE freshgradeuser WITH LOGIN PASSWORD 'password';
--ALTER ROLE freshgradeuser CREATEDB;
--CREATE DATABASE freshgradechallenge;
--GRANT ALL PRIVILEGES ON DATABASE freshgradechallenge TO freshgradeuser;
--\q
--psql -U freshgradeuser -d freshgradechallenge -a -f schema.sql

DROP TABLE IF EXISTS AddressBook;
DROP TABLE IF EXISTS Payroll;
DROP TABLE IF EXISTS WorkHistory;

CREATE TABLE WorkHistory (
  id SERIAL PRIMARY KEY,
  empNo SERIAL UNIQUE,
  empName varchar(40),
  yearsEmployeed integer
);

CREATE TABLE Payroll (
  id SERIAL PRIMARY KEY,
  empNo SERIAL REFERENCES WorkHistory(empNo),
  vacationDays INTEGER
);

CREATE TABLE AddressBook (
  id SERIAL PRIMARY KEY,
  empNo SERIAL REFERENCES WorkHistory(empNo),
  email varchar(255) NOT NULL UNIQUE
);


--- Quick db seed ---
INSERT INTO WorkHistory (empNo, empName, yearsEmployeed) VALUES (1, 'John', 1);
INSERT INTO WorkHistory (empNo, empName, yearsEmployeed) VALUES (2, 'Steve', 4);
INSERT INTO WorkHistory (empNo, empName, yearsEmployeed) VALUES (3, 'Mary', 5);

INSERT INTO Payroll (empNo, vacationDays) VALUES (1, 3);
INSERT INTO Payroll (empNo, vacationDays) VALUES (2, 4);
INSERT INTO Payroll (empNo, vacationDays) VALUES (3, 7);

INSERT INTO AddressBook (empNo, email) VALUES (1, 'a@b.c');
INSERT INTO AddressBook (empNo, email) VALUES (2, 'g@b.c');
INSERT INTO AddressBook (empNo, email) VALUES (3, 'h@b.c');
