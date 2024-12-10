-- run this on a PG/DB GUI or terminal
CREATE ROLE malaga WITH LOGIN PASSWORD 'malaga';

CREATE DATABASE malagadb; 

GRANT ALL PRIVILEGES ON TABLE users TO malaga;
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO malaga;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10) CHECK (role IN ('USER', 'ADMIN')) NOT NULL,
    access_token TEXT
);