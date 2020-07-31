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
	occupied_by INT NULL REFERENCES something.households(household_id)
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
VALUES (TO_DATE('03/24/2019', 'MM/DD/YYYY'), null, TO_DATE('03/24/2019', 'MM/DD/YYYY'), null, false, false, true, false, false), 
	   (TO_DATE('06/13/2019', 'MM/DD/YYYY'), TO_DATE('09/01/2020', 'MM/DD/YYYY'), TO_DATE('06/13/2019', 'MM/DD/YYYY'), null, false, false, true, true, false),
	   (null, null, null, null, true, false, false, false, false);

INSERT INTO something.apartments (apartment_number, has_refrig, has_wash_dry, has_view, reserved_by, occupied_by)
VALUES ('A101', false, false, false, null, 2),
       ('A102', false, false, false, null, null),
       ('A201', false, false, false, 1, 1),
       ('A202', false, false, false, null, null);

INSERT INTO something.residents (first_name, last_name, household_id)
VALUES ('Robert', 'Robertson', 1), 
	   ('Janice', 'Peters', 2), 
	   ('Suzy', 'Robertson', 1), 
	   ('Luanne', 'Michaels', 2), 
	   ('Alice', 'Makers', 3);

	   
INSERT INTO something.notes (household_id, date_created, note)
VALUES (1, TO_DATE('03/02/2019', 'MM/DD/YYYY'), 'Came in to look at apartment, ended up renting A201'),
	   (1, TO_DATE('03/24/2019', 'MM/DD/YYYY'), 'Moved in successfully, wanted extra copy of house key'),
	   (2, TO_DATE('06/12/2019', 'MM/DD/YYYY'), 'Just moved to area and needed an apartment ASAP, took A101'),
	   (2, TO_DATE('07/28/2019', 'MM/DD/YYYY'), 'Complained their upstairs neighbors were too noisy and gave notice to move out'),
	   (3, TO_DATE('06/01/2020', 'MM/DD/YYYY'), 'Said they just closed on their homes mortgage and were looking for a 6 month lease');



