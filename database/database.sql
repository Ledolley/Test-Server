CREATE DATABASE test;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    completed BOOLEAN NOT NULL
);
