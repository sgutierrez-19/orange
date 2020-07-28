drop schema if exists something cascade;
CREATE SCHEMA something;


CREATE TABLE something.households(
	id SERIAL PRIMARY KEY,
	expected_move_in DATE,
	expected_move_out DATE,
	move_in DATE,
	move_out DATE,
	is_prospect BOOLEAN DEFAULT 0,
	is_future BOOLEAN DEFAULT 0,
	is_current BOOLEAN DEFAULT 0,
	on_notice BOOLEAN DEFAULT 0,
	is_past BOOLEAN DEFAULT 0
);

CREATE TABLE something.apartments(
	id SERIAL PRIMARY KEY,
	apartment_number VARCHAR(15) UNIQUE NOT NULL,
	has_refrig BOOLEAN DEFAULT 0,
	has_wash_dry BOOLEAN DEFAULT 0,
	has_view BOOLEAN DEFAULT 0
);

CREATE TABLE something.hh_apts (
	id SERIAL PRIMARY KEY,
	household_id INT REFERENCES something.households(id),
	apartment_id INT REFERENCES something.apartments(id),
	is_reserved BOOLEAN NOT NULL DEFAULT 0,
	is_occupied BOOLEAN NOT NULL DEFAULT 0
);

CREATE TABLE something.residents(
	id SERIAL PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	phone_number VARCHAR(14),
	curr_address TEXT,
	curr_city TEXT,
	curr_state TEXT, 
	curr_zip VARCHAR(11),
	household_id INT REFERENCES something.households(id)
);



CREATE TABLE something.notes(
	id SERIAL PRIMARY KEY,
	household_id INT NOT NULL REFERENCES something.households(id),
	date_created DATE DEFAULT CURRENT_DATE,
	note TEXT NOT NULL
);