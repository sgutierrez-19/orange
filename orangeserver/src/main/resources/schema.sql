drop schema if exists something cascade;
CREATE SCHEMA something;


CREATE TABLE something.households(
	household_id SERIAL PRIMARY KEY,
	expected_move_in DATE NULL,
	expected_move_out DATE NULL,
	move_in DATE NULL,
	move_out DATE NULL,
	is_prospect BOOLEAN DEFAULT 0,
	is_future BOOLEAN DEFAULT 0,
	is_current BOOLEAN DEFAULT 0,
	on_notice BOOLEAN DEFAULT 0,
	is_past BOOLEAN DEFAULT 0,
	prev_apt VARCHAR(15) NULL
);

CREATE TABLE something.apartments(
	apartment_id SERIAL PRIMARY KEY,
	apartment_number VARCHAR(15) UNIQUE NOT NULL,
	has_refrig BOOLEAN DEFAULT 0,
	has_wash_dry BOOLEAN DEFAULT 0,
	has_view BOOLEAN DEFAULT 0,
	reserved_by INT NULL REFERENCES something.households(household_id),
	occupied_by INT NULL REFERENCES something.households(household_id),
	is_rentable BOOLEAN DEFAULT 1
);

CREATE TABLE something.residents(
	resident_id SERIAL PRIMARY KEY,
	first_name VARCHAR(500) NOT NULL,
	last_name VARCHAR(500) NOT NULL,
	phone_number VARCHAR(14),
	curr_address VARCHAR(500),
	curr_city VARCHAR(500),
	curr_state VARCHAR(500), 
	curr_zip VARCHAR(11),
	household_id INT REFERENCES something.households(household_id)
);

CREATE TABLE something.notes(
	note_id SERIAL PRIMARY KEY,
	household_id INT NOT NULL REFERENCES something.households(household_id),
	date_created DATE DEFAULT CURRENT_DATE,
	note VARCHAR(500) NOT NULL
);

CREATE TABLE something.categories(
	category_id SERIAL PRIMARY KEY,
	name VARCHAR(20) NOT NULL
);

CREATE TABLE something.ledgers(
	ledger_id SERIAL PRIMARY KEY,
	household_id INT NOT NULL UNIQUE REFERENCES something.households(household_id),
	balance VARCHAR(20) NOT NULL
);

CREATE TABLE something.ledger_rows(
	row_id SERIAL PRIMARY KEY,
	ledger_id INT NOT NULL REFERENCES something.ledgers(ledger_id),
	category_id INT NOT NULL REFERENCES something.categories(category_id),
	date_created DATE,
	description VARCHAR(500) NOT NULL,
	amount VARCHAR(20) NOT NULL
);



INSERT INTO something.households (expected_move_in, expected_move_out, move_in, move_out, is_prospect, is_future, is_current, on_notice, is_past) 
VALUES (TO_DATE('03/01/2019', 'MM/DD/YYYY'), null, TO_DATE('03/01/2019', 'MM/DD/YYYY'), null, false, false, true, false, false), 
	   (TO_DATE('06/01/2019', 'MM/DD/YYYY'), TO_DATE('10/14/2020', 'MM/DD/YYYY'), TO_DATE('06/01/2019', 'MM/DD/YYYY'), null, false, false, true, true, false),
	   (TO_DATE('10/21/2020', 'MM/DD/YYYY'), null, null, null, false, true, false, false, false),
	   (TO_DATE('10/26/2020', 'MM/DD/YYYY'), null, null, null, false, true, false, false, false),
	   (TO_DATE('11/20/2020', 'MM/DD/YYYY'), null, null, null, true, false, false, false, false),
	   (TO_DATE('10/31/2020', 'MM/DD/YYYY'), null, null, null, true, false, false, false, false),
	   (TO_DATE('12/01/2020', 'MM/DD/YYYY'), null, null, null, true, false, false, false, false);
	
INSERT INTO something.apartments (apartment_number, has_refrig, has_wash_dry, has_view, reserved_by, occupied_by, is_rentable)
VALUES ('A101', true, true, false, 3, 2, false),
       ('A102', false, false, false, null, null, true),
       ('A201', true, true, true, null, 1, false),
       ('A202', true, false, true, 4, null, false);

INSERT INTO something.residents (first_name, last_name, phone_number, curr_address, curr_city, curr_state, curr_zip, household_id)
VALUES ('Robert', 'Robertson', '(541) 234-2342', '1 Shadow Ln.', 'Anaheim', 'CA', '92101', 1), 
	   ('Janice', 'Peters', '(714) 401-2395', '1 Shadow Ln.', 'Anaheim', 'CA', '92101', 2), 
	   ('Suzy', 'Robertson', '(503) 432-0090', '1 Shadow Ln', 'Anaheim', 'CA', '92101', 1), 
	   ('Luanne', 'Michaels', '(714) 632-2342', '1 Shadow Ln', 'Anaheim', 'CA', '92101', 2), 
	   ('Alice', 'Makers', '(949) 712-2355', '15 Baker St.', 'San Francisco', 'CA', '95421', 3),
	   ('Betty', 'Botter', '(858) 384-2313', '1000 First St.', 'Long Beach', 'CA', '92101', 4),
	   ('Peter', 'Piper', '(858) 778-2111', '1000 First St.', 'Long Beach', 'CA', '92101', 4),
	   ('Cindy', 'Adams', '(201) 789-9989', '642 Georgia St.', 'Peach', 'AL', '13593', 5),
	   ('Lucy', 'Adams', '(201) 262-6827', '642 Georgia St.', 'Peach', 'AL', '13593', 5),
	   ('Mark', 'Gomez', '(623) 234-6788', '412 Marker Blvd.', 'Laguna Beach', 'CA', '92555', 6),
	   ('Lindsay', 'Matthews', '(554) 623-7784', '9920 Forest Ln.', 'Jacksonville', 'OR', '97501', 7),
	   ('Summer', 'Breeze', '(541) 236-1112', '9920 Forest Ln.', 'Jacksonville', 'OR', '97501', 7),
	   ('Tina', 'Phae', '(630) 269-9121', '9920 Forest Ln.', 'Jacksonville', 'OR', '97501', 7),
	   ('Nathan', 'Smith', '(912) 212-2209', '9920 Forest Ln.', 'Jacksonville', 'OR', '97501', 7); 

	   
INSERT INTO something.notes (household_id, date_created, note)
VALUES (1, TO_DATE('02/25/2019', 'MM/DD/YYYY'), 'Came in to look at apartment, ended up renting A201'),
	   (1, TO_DATE('03/01/2019', 'MM/DD/YYYY'), 'Moved in successfully, wanted extra copy of house key'),
	   (2, TO_DATE('05/20/2019', 'MM/DD/YYYY'), 'Just moved to area and needed an apartment ASAP, took A101'),
	   (2, TO_DATE('07/28/2019', 'MM/DD/YYYY'), 'Complained their upstairs neighbors were too noisy and gave notice to move out'),
	   (3, TO_DATE('08/31/2020', 'MM/DD/YYYY'), 'Said they just closed on their homes mortgage and were looking for a 6 month lease');
	   
INSERT INTO something.categories (name)
VALUES ('RENT'), ('LATEFEE'), ('SECDEP'), ('CONCESSION'), ('CLEANING'), ('CARPET'), ('PAINT'), ('DAMAGES'), ('PETFEE'), ('PETDEP'), ('APPFEE'), ('PMT'), ('REFUND');

INSERT INTO something.ledgers(household_id, balance)
VALUES (1, '0.00'), (2, '0.00'), (3, '0.00'), (4, '0.00'), (5, '0.00'), (6, '0.00'), (7, '0.00');

INSERT INTO something.ledger_rows(ledger_id, category_id, date_created, description, amount)
VALUES (1, 3, TO_DATE('03/01/2019', 'MM/DD/YYYY'), 'Security Deposit', '500.00'),
	   (1, 11, TO_DATE('03/01/2019', 'MM/DD/YYYY'), 'Application Fee x2', '90.00'),
	   (1, 12, TO_DATE('03/01/2019', 'MM/DD/YYYY'), 'Move In Check', '-590.00'),
	   (2, 3, TO_DATE('06/01/2019', 'MM/DD/YYYY'), 'Security Deposit', '500.00'),
	   (2, 11, TO_DATE('06/01/2019', 'MM/DD/YYYY'), 'Application Fee x2', '90.00'),
	   (2, 12, TO_DATE('06/01/2019', 'MM/DD/YYYY'), 'Move In Check', '-590.00'),
	   (3, 3, TO_DATE('10/01/2020', 'MM/DD/YYYY'), 'Security Deposit', '500.00'),
	   (3, 11, TO_DATE('10/01/2020', 'MM/DD/YYYY'), 'Application Fee', '45.00'),
	   (4, 3, TO_DATE('10/03/2020', 'MM/DD/YYYY'), 'Security Deposit', '500.00'),
	   (4, 11, TO_DATE('10/03/2020', 'MM/DD/YYYY'), 'Application Fee x2', '90.00');
	   

