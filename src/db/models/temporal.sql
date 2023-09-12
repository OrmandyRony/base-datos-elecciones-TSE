-- TABLA TEMPORAL DE DEPARTAMENTOS
-- Aca podriamos colocar la restriccion que guatemala 
-- solo tiene 22 departamentos
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.DEPARTAMENTOS_TEMPORALES (
    id_departamento INT NOT NULL AUTO_INCREMENT,
    nombre_departamento VARCHAR(100) NOT NULL
);

-- TABLA TEMPORAL DE CICUDADANOS
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.CIUDADANOS_TEMPORALES (
    dpi_ciudadano VARCHAR(13) NOT NULL,
    nombre_ciudadano VARCHAR(100) NOT NULL,
    apellido_ciudadano VARCHAR(100) NOT NULL,
    telefono_ciudadano VARCHAR(12) NOT NULL,
    edad_ciudadano INT NOT NULL,
    genero_ciudadano VARCHAR(1) NOT NULL,
    direccion_ciudadano VARCHAR(100) NOT NULL
);

-- TABLA TEMPORAL DE PARTIDOS
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.PARTIDOS_TEMPORALES (
    id_partido INT NOT NULL,
    nombre_partido VARCHAR(50) NOT NULL,
    siglas_partido VARCHAR(15) NOT NULL,
    fundacion_partido DATE
);

-- TABLA TEMPORAL DE CARGOS
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.CARGOS_TEMPORALES (
    id_cargo INT NOT NULL,
    nombre_cargo VARCHAR(50) NOT NULL
);

-- TABLA TEMPORAL DE CANDIDATOS
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.CANDIDATOS_TEMPORALES (
    id_candidato INT NOT NULL,
    nombre_candidato VARCHAR(50) NOT NULL,
    fecha_nacimiento_candidato DATE,
    cargo_id INT NOT NULL,
    partido_id INT NOT NULL
);

-- TABLA TEMPORAL DE MESAS
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.MESAS_TEMPORALES (
    id_mesa INT NOT NULL,
    id_departamento INT NOT NULL
);

-- TABLA TEMPORAL DE VOTOS
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.VOTOS_TEMPORALES (
    fecha_hora_voto DATETIME NOT NULL,
    dpi_ciudadano VARCHAR(13) NOT NULL
    id_voto INT NOT NULL,
    id_mesa INT NOT NULL,
    id_candidato INT NOT NULL,
  
);

