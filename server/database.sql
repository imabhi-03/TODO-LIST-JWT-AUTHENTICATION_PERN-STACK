create database authtodolist;

create table users(
    user_id uuid default uuid_generate_v4()  , 
    user_name varchar(255) not null,
    user_email varchar(255) not null,
    user_password varchar(255) not null,
    PRIMARY KEY(user_id)
);

ALTER TABLE users
ADD CONSTRAINT unique_user_email UNIQUE (user_email);


create table todos
(
    todo_id SERIAL,
    user_id UUID,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (todo_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)

);
