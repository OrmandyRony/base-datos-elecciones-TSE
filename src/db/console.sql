-- CREAR BASE DE DATOS
CREATE SCHEMA IF NOT EXISTS TSE_Elecciones_DB;
USE TSE_Elecciones_DB;

-- TABLAS QUE NO TIENEN DEPENDENCIA
-- TABLA DEPARTAMENTO
CREATE TABLE IF NOT EXISTS departamento (
    id_departamento INT NOT NULL AUTO_INCREMENT,
    nombre_departamento VARCHAR(100) NOT NULL,
    CONSTRAINT PK_departamento PRIMARY KEY (id_departamento)
);

-- TABLA CIUDADANO
CREATE TABLE IF NOT EXISTS ciudadano (
    dpi_ciudadano VARCHAR(13) NOT NULL,
    nombre_ciudadano VARCHAR(100) NOT NULL,
    apellido_ciudadano VARCHAR(100) NOT NULL,
    edad_ciudadano INT NOT NULL,
    genero_ciudadano VARCHAR(1) NOT NULL,
    direccion_ciudadano VARCHAR(100) NOT NULL,
    CONSTRAINT PK_ciudadano PRIMARY KEY (dpi_ciudadano)
);

-- TABLA PARTIDO
CREATE TABLE IF NOT EXISTS partido (
    id_partido INT NOT NULL AUTO_INCREMENT,
    nombre_partido VARCHAR(50) NOT NULL,
    siglas_partido VARCHAR(15) NOT NULL,
    fundacion_partido DATE_TIME,
    CONSTRAINT PK_partido PRIMARY KEY (id_partido)
);

-- TABLA CARGO
CREATE TABLE IF NOT EXISTS cargo (
    id_cargo INT NOT NULL AUTO_INCREMENT,
    nombre_cargo VARCHAR(20) NOT NULL, 
    CONSTRAINT PK_cargo PRIMARY KEY (id_cargo)
);

