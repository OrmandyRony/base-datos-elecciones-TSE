-- UTLIZANDO LAS CONVECNICONES DE ORACLE Y LA DBMS ES MYSQL
CREATE SCHEMA IF NOT EXISTS TSE_Elecciones_DB;
--USE TSE_Elecciones_DB;

-- TABLAS QUE NO TIENEN DEPENDENCIA
-- TABLA DEPARTAMENTOS
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.DEPARTAMENTOS (
    id_departamento INT NOT NULL AUTO_INCREMENT,
    nombre_departamento VARCHAR(100) NOT NULL,
    CONSTRAINT PK_departamento PRIMARY KEY (id_departamento)
);

-- TABLA CIUDADANOS
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.CIUDADANOS (
    dpi_ciudadano VARCHAR(13) NOT NULL,
    nombre_ciudadano VARCHAR(100) NOT NULL,
    apellido_ciudadano VARCHAR(100) NOT NULL,
    edad_ciudadano INT NOT NULL,
    genero_ciudadano VARCHAR(1) NOT NULL,
    direccion_ciudadano VARCHAR(100) NOT NULL,
    telefono_ciudadano VARCHAR(12) NOT NULL,
    CONSTRAINT PK_ciudadano PRIMARY KEY (dpi_ciudadano)
);

-- TABLA PARTIDOS
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.PARTIDOS (
    id_partido INT NOT NULL AUTO_INCREMENT,
    nombre_partido VARCHAR(50) NOT NULL,
    siglas_partido VARCHAR(15) NOT NULL,
    fundacion_partido DATE,
    CONSTRAINT PK_partido PRIMARY KEY (id_partido)
);

-- TABLA CARGOS
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.CARGOS (
    id_cargo INT NOT NULL AUTO_INCREMENT,
    nombre_cargo VARCHAR(50) NOT NULL,
    CONSTRAINT PK_cargo PRIMARY KEY (id_cargo)
);

-- TABLAS CON DEPENDENCIA
-- TABLA CANDIDATOS
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.CANDIDATOS (
    id_candidato INT NOT NULL AUTO_INCREMENT,
    nombre_candidato VARCHAR(50) NOT NULL,
    fecha_nacimiento_candidato DATE,
    cargo_id INT NOT NULL,
    partido_id INT NOT NULL,
    CONSTRAINT Pk_candidato PRIMARY KEY (id_candidato),
    FOREIGN KEY (cargo_id)
    REFERENCES CARGOS(id_cargo),
    FOREIGN KEY (partido_id)
    REFERENCES PARTIDOS(id_partido)
);

-- TABLA MESAS
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.MESAS (
    id_mesa INT NOT NULL AUTO_INCREMENT,
    id_departamento INT NOT NULL,
    CONSTRAINT Pk_mesa PRIMARY KEY (id_mesa),
    FOREIGN KEY (id_departamento)
    REFERENCES DEPARTAMENTOS(id_departamento)
);

-- TABLA VOTOS
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.VOTOS (
    id_voto INT NOT NULL AUTO_INCREMENT,
    fecha_hora_voto DATETIME NOT NULL,
    dpi_ciudadano VARCHAR(13) NOT NULL,
    id_mesa INT NOT NULL,
    CONSTRAINT Pk_voto PRIMARY KEY (id_voto),
    FOREIGN KEY (dpi_ciudadano)
    REFERENCES CIUDADANOS(dpi_ciudadano),
    FOREIGN KEY (id_mesa)
    REFERENCES MESAS(id_mesa)
);


-- TABLA DETALLE VOTOS
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.DETALLE_VOTOS (
    id_detalle_voto INT NOT NULL AUTO_INCREMENT,
    id_voto INT NOT NULL,
    id_candidato INT NOT NULL,
    CONSTRAINT Pk_detalle_voto PRIMARY KEY (id_detalle_voto),
    FOREIGN KEY (id_voto)
    REFERENCES VOTOS(id_voto),
    FOREIGN KEY (id_candidato)
    REFERENCES CANDIDATOS(id_candidato)
);