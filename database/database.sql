CREATE DATABASE IntelliNext;

CREATE TABLE users (
    id serial PRIMARY KEY,
    email varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    phone varchar(255) NOT NULL,
    address text NOT NULL,
    password varchar(120) NOT NULL
);
/* 
INSERT INTO users (email, name, phone, address, password)
VALUES ('usuario1@example.com', 'Usuario Uno', '123-456-7890', '123 Calle Principal', 'contraseña123');


INSERT INTO users (email, name, phone, address, password)
VALUES ('usuario2@example.com', 'Usuario Dos', '987-654-3210', '456 Avenida Secundaria', 'otracontraseña');


INSERT INTO users (email, name, phone, address, password)
VALUES ('usuario3@example.com', 'Usuario Tres', '555-555-5555', '789 Calle Terciaria', 'miclavesegura');
 */