CREATE DATABSE events_guests;

CREATE TABLE users ( 
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(30) NOT NULL,
    user_email VARCHAR(50) NOT NULL,
    user_password VARCHAR(100) NOT NULL,

     UNIQUE(user_email)
);

CREATE TABLE events(
    wedding_id SERIAL PRIMARY KEY,
    user_id INT,
    wedding_name VARCHAR(30),
    bride_name VARCHAR(40),
    groom_name    VARCHAR(50),
    wedding_location VARCHAR(50),
    wedding_date DATE,
    wedding_descript VARCHAR(200),

    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(user_id)
    

);

CREATE TABLE guest_list(
    guestList_id SERIAL PRIMARY KEY,
    wedding_id INT,
    guest_name VARCHAR(30),
    guest_last_name VARCHAR(40),
    guest_email    VARCHAR(50),
    code VARCHAR(50),
    isAttending BOOLean,

    CONSTRAINT fk_event
      FOREIGN KEY(wedding_id) 
	      REFERENCES events(wedding_id)
    

);



