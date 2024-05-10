-- Active: 1715288619464@@127.0.0.1@3306@fatec
CREATE DATABASE fatec;

USE fatec;

CREATE TABLE User (
    id int PRIMARY KEY AUTO_INCREMENT,
    username varchar(50) NOT NULL,
    password varchar(50) NOT NULL
);