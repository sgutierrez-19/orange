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
	is_past BOOLEAN DEFAULT 0
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



INSERT INTO something.households (expected_move_in, expected_move_out, move_in, move_out, is_prospect, is_future, is_current, on_notice, is_past) 
VALUES (TO_DATE('03/01/2019', 'MM/DD/YYYY'), null, TO_DATE('03/01/2019', 'MM/DD/YYYY'), null, false, false, true, false, false), 
	   (TO_DATE('06/01/2019', 'MM/DD/YYYY'), TO_DATE('9/22/2020', 'MM/DD/YYYY'), TO_DATE('06/01/2019', 'MM/DD/YYYY'), null, false, false, true, true, false),
	   (TO_DATE('10/01/2020', 'MM/DD/YYYY'), null, null, null, false, true, false, false, false),
	   (TO_DATE('09/28/2020', 'MM/DD/YYYY'), null, null, null, false, true, false, false, false);

INSERT INTO something.apartments (apartment_number, has_refrig, has_wash_dry, has_view, reserved_by, occupied_by, is_rentable)
VALUES ('A101', true, true, false, 3, 2, false),
       ('A102', false, false, false, null, null, true),
       ('A201', true, true, true, null, 1, false),
       ('A202', true, false, true, 4, null, false);

INSERT INTO something.residents (first_name, last_name, household_id)
VALUES ('Robert', 'Robertson', 1), 
	   ('Janice', 'Peters', 2), 
	   ('Suzy', 'Robertson', 1), 
	   ('Luanne', 'Michaels', 2), 
	   ('Alice', 'Makers', 3),
	   ('Betty', 'Botter', 4),
	   ('Peter', 'Piper', 4);

	   
INSERT INTO something.notes (household_id, date_created, note)
VALUES (1, TO_DATE('02/25/2019', 'MM/DD/YYYY'), 'Came in to look at apartment, ended up renting A201'),
	   (1, TO_DATE('03/01/2019', 'MM/DD/YYYY'), 'Moved in successfully, wanted extra copy of house key'),
	   (2, TO_DATE('05/20/2019', 'MM/DD/YYYY'), 'Just moved to area and needed an apartment ASAP, took A101'),
	   (2, TO_DATE('07/28/2019', 'MM/DD/YYYY'), 'Complained their upstairs neighbors were too noisy and gave notice to move out'),
	   (3, TO_DATE('08/31/2020', 'MM/DD/YYYY'), 'Said they just closed on their homes mortgage and were looking for a 6 month lease');

ALTER TABLE something.households
ADD COLUMN reserved INT NULL REFERENCES something.apartments(apartment_id);
ALTER TABLE something.households
ADD COLUMN occupying INT NULL REFERENCES something.apartments(apartment_id);

UPDATE something.households
SET	occupying = 3
WHERE something.households.household_id = 1;

UPDATE something.households
SET	occupying = 1
WHERE something.households.household_id = 2;

UPDATE something.households
SET reserved = 1
WHERE something.households.household_id = 3;

UPDATE something.households
SET reserved = 4
WHERE something.households.household_id = 4;

