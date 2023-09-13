USE TSE_Elecciones_DB;
SELECT
    P.nombre_candidato AS "nombre presidente",
    V.nombre_candidato AS "nombre vicepresidente",
    Pa.nombre_partido AS "partido"
FROM
    TSE_Elecciones_DB.CANDIDATOS P
JOIN
    TSE_Elecciones_DB.CANDIDATOS V ON P.partido_id = V.partido_id
JOIN
    TSE_Elecciones_DB.PARTIDOS Pa ON P.partido_id = Pa.id_partido
WHERE
    P.cargo_id = (SELECT id_cargo FROM TSE_Elecciones_DB.CARGOS WHERE nombre_cargo = 'Presidente')
    AND V.cargo_id = (SELECT id_cargo FROM TSE_Elecciones_DB.CARGOS WHERE nombre_cargo = 'Vicepresidente');

#Mostrar el número de candidatos a diputados (esto incluye lista nacional, distrito electoral, parlamento) por cada partido.

# Mostrar todos los candidatos con su cargo
SELECT nombre_partido, nombre_candidato, nombre_cargo FROM CANDIDATOS
INNER JOIN
    CARGOS ON CARGOS.id_cargo = CANDIDATOS.cargo_id
INNER JOIN
    PARTIDOS ON CANDIDATOS.partido_id = PARTIDOS.id_partido
WHERE (CANDIDATOS.cargo_id = 3 or CANDIDATOS.cargo_id = 4 or CANDIDATOS.cargo_id = 5);

# CANTIDAD DE CANDIDATOS
SELECT COUNT(*)
FROM CANDIDATOS
;

# CANTIDAD DE CANDIDATOS EN TODOS LOS PARTIDOS
SELECT nombre_partido, COUNT(*)
FROM CANDIDATOS
INNER JOIN
    PARTIDOS ON CANDIDATOS.partido_id = PARTIDOS.id_partido
GROUP BY nombre_partido;

# MOSTRAR EL NUMERO DE CANDIDATOS A TODOS LOS CARGOS POR CADA PARTIDO
SELECT nombre_partido, nombre_cargo, COUNT(*)
FROM CANDIDATOS
INNER JOIN
    CARGOS ON CARGOS.id_cargo = CANDIDATOS.cargo_id
INNER JOIN
    PARTIDOS ON CANDIDATOS.partido_id = PARTIDOS.id_partido
GROUP BY nombre_cargo;



# MOSTRAR EL NUMERO DE CANDIDATOS A TODOS LOS CARGOS POR CADA PARTIDO
SELECT
    P.nombre_partido AS "Partido",
    C.nombre_cargo AS "Cargo",
    COUNT(CA.id_candidato) AS "Número de Candidatos"
FROM
    TSE_Elecciones_DB.PARTIDOS P
CROSS JOIN
    TSE_Elecciones_DB.CARGOS C
LEFT JOIN
    TSE_Elecciones_DB.CANDIDATOS CA ON P.id_partido = CA.partido_id AND C.id_cargo = CA.cargo_id
WHERE CA.cargo_id = 3 or CA.cargo_id = 4 or CA.cargo_id = 5
GROUP BY
    P.nombre_partido, C.nombre_cargo
;

# Cantidad de candidatos por partido (presidentes, vicepresidentes, diputados, alcaldes).
SELECT
    P.nombre_partido AS "Partido",
    C.nombre_cargo AS "Cargo",
    COUNT(CA.id_candidato) AS "Número de Candidatos"
FROM
    TSE_Elecciones_DB.PARTIDOS P
CROSS JOIN
    TSE_Elecciones_DB.CARGOS C
LEFT JOIN
    TSE_Elecciones_DB.CANDIDATOS CA ON P.id_partido = CA.partido_id AND C.id_cargo = CA.cargo_id
GROUP BY
    P.nombre_partido, C.nombre_cargo;


# Mostrar el nombre de los candidatos a alcalde por partido.
SELECT
    nombre_candidato
FROM CANDIDATOS
INNER JOIN
    CARGOS ON CANDIDATOS.cargo_id = CARGOS.id_cargo
WHERE nombre_cargo = 'alcalde';

SELECT  nombre_candidato
FROM  CANDIDATOS
WHERE cargo_id = 6;

# CONTAR CON LOS CARGOS


# CONTAR CANDIDATOS A ALCALDE POR PARTIDO
SELECT
    nombre_candidato
FROM CANDIDATOS
WHERE CANDIDATOS.cargo_id = 3 or CANDIDATOS.cargo_id = 4 or CANDIDATOS.cargo_id = 5;


SELECT
    P.nombre_partido AS Partido,
    COUNT(*) AS Numero_de_Candidatos
FROM
    TSE_Elecciones_DB.CANDIDATOS AS C
INNER JOIN
    TSE_Elecciones_DB.PARTIDOS AS P
ON
    C.partido_id = P.id_partido
INNER JOIN
    TSE_Elecciones_DB.CARGOS AS CA
ON
    C.cargo_id = CA.id_cargo
WHERE
    CA.nombre_cargo = 'Diputado'
GROUP BY
    P.nombre_partido;

-- Cantidad total de votaciones
SELECT COUNT(*)
FROM VOTOS;

-- Cantidad de votaciones  por mesa (nombre de mesa, numero_votaciones)
SELECT
    MESAS.id_mesa, COUNT(*)
FROM MESAS
INNER JOIN
    VOTOS ON MESAS.id_mesa = VOTOS.id_mesa

GROUP BY MESAS.id_mesa;

SELECT
   nombre_departamento, MESAS.id_mesa, COUNT(*)
FROM MESAS
INNER JOIN
    VOTOS ON MESAS.id_mesa = VOTOS.id_mesa
INNER JOIN
    DEPARTAMENTOS ON MESAS.id_departamento = DEPARTAMENTOS.id_departamento
GROUP BY MESAS.id_mesa;


-- Cantidad de votantes por departamentos. (departamento, numero_votaciones)
SELECT
   nombre_departamento, COUNT(*) AS 'Cantida de votos'
FROM MESAS
INNER JOIN
    VOTOS ON MESAS.id_mesa = VOTOS.id_mesa
INNER JOIN
    DEPARTAMENTOS ON MESAS.id_departamento = DEPARTAMENTOS.id_departamento
GROUP BY DEPARTAMENTOS.id_departamento;



-- Cantidad de votos nulos (total).
SELECT
    COUNT(id_candidato)
FROM  DETALLE_VOTOS
WHERE id_candidato = -1;


-- mesa con su departamento
SELECT
    id_mesa, nombre_departamento
FROM MESAS
INNER JOIN
    DEPARTAMENTOS ON MESAS.id_departamento = DEPARTAMENTOS.id_departamento
GROUP BY MESAS.id_mesa;

SELECT
    id_mesa, nombre_departamento
FROM DEPARTAMENTOS
INNER JOIN
    MESAS ON DEPARTAMENTOS.id_departamento = MESAS.id_departamento;

SELECT
    COUNT(*)
FROM CIUDADANOS;

SELECT
    COUNT(*)
FROM  VOTOS;

-- Edades de los ciudadnos que si votaron
SELECT
    edad_ciudadano
FROM CIUDADANOS
INNER JOIN
    VOTOS ON CIUDADANOS.dpi_ciudadano = VOTOS.dpi_ciudadano
ORDER BY edad_ciudadano DESC
LIMIT 10;

-- Top 10 de candidatos más votados para presidente y vicepresidente
-- (el voto por presidente incluye el vicepresidente).

-- Cantida de votos de todos los candidatos
SELECT
    nombre_candidato, COUNT(*)
FROM DETALLE_VOTOS
INNER JOIN
    CANDIDATOS C on DETALLE_VOTOS.id_candidato = C.id_candidato
GROUP BY DETALLE_VOTOS.id_candidato;

SELECT
    nombre_candidato, COUNT(*)
FROM DETALLE_VOTOS
INNER JOIN
    CANDIDATOS C on DETALLE_VOTOS.id_candidato = C.id_candidato
WHERE  cargo_id = 2
GROUP BY DETALLE_VOTOS.id_candidato;


SELECT nombre_candidato AS 'Viceprecidentes'
FROM CANDIDATOS
INNER JOIN TSE_Elecciones_DB.CARGOS C on CANDIDATOS.cargo_id = 2;

SELECT nombre_candidato AS 'Viceprecidentes'
FROM CANDIDATOS
WHERE cargo_id = 2;

SELECT nombre_candidato AS 'Presidente'
FROM CANDIDATOS
INNER JOIN TSE_Elecciones_DB.CARGOS C on CANDIDATOS.cargo_id = C.id_cargo;


SELECT nombre_candidato AS 'Presidente'
FROM CANDIDATOS
WHERE cargo_id = 1;

-- consulta 8
SELECT
    C.nombre_candidato AS nombre_presidente,
    VP.nombre_candidato AS nombre_vicepresidente,
    COUNT(DV.id_voto) AS total_votos
FROM
    TSE_Elecciones_DB.CANDIDATOS AS C
JOIN
    TSE_Elecciones_DB.DETALLE_VOTOS AS DV ON C.id_candidato = DV.id_candidato
JOIN
    TSE_Elecciones_DB.CARGOS AS CP ON C.cargo_id = CP.id_cargo
JOIN
    TSE_Elecciones_DB.CANDIDATOS AS VP ON C.id_candidato = VP.id_candidato
JOIN
    TSE_Elecciones_DB.CARGOS AS CV ON VP.cargo_id = CV.id_cargo
WHERE
    CP.nombre_cargo = 'presidente' -- Ajusta el nombre del cargo del presidente
    AND CV.nombre_cargo = 'vicepresidente' -- Ajusta el nombre del cargo del vicepresidente
GROUP BY
    C.id_candidato, VP.id_candidato
ORDER BY
    total_votos DESC
LIMIT
    10;

-- Top 5 de mesas más frecuentadas (mostrar no. Mesa y departamento al que pertenece).
SELECT
    M.id_mesa AS numero_mesa,
    D.nombre_departamento AS departamento_perteneciente,
    COUNT(V.id_voto) AS total_votos
FROM
    TSE_Elecciones_DB.MESAS AS M
JOIN
    TSE_Elecciones_DB.DEPARTAMENTOS AS D ON M.id_departamento = D.id_departamento
JOIN
    TSE_Elecciones_DB.VOTOS AS V ON M.id_mesa = V.id_mesa
GROUP BY
    M.id_mesa, D.nombre_departamento
ORDER BY
    total_votos DESC
LIMIT
    5;
-- Consulta 10 Mostrar el top 5 de la hora más concurrida en que los ciudadanos fueron a votar.
SELECT
    DATE_FORMAT(V.fecha_hora_voto, '%H:%i') AS hora_voto,
    COUNT(*) AS total_votos
FROM
    TSE_Elecciones_DB.VOTOS AS V
GROUP BY
    hora_voto
ORDER BY
    total_votos DESC
LIMIT
    5;

-- Consulta 11 Cantidad de votos por género (Masculino, Femenino).
SELECT
    CI.genero_ciudadano AS genero,
    COUNT(V.id_voto) AS total_votos
FROM
    TSE_Elecciones_DB.CIUDADANOS AS CI
JOIN
    TSE_Elecciones_DB.VOTOS AS V ON CI.dpi_ciudadano = V.dpi_ciudadano
GROUP BY
    genero;


SELECT
    P.nombre_candidato AS nombre_presidente,
    VP.nombre_candidato AS nombre_vicepresidente,
    SUM(DV.total_votos) AS total_votos
FROM (
    SELECT
        C.id_candidato,
        C.nombre_candidato,
        C.cargo_id,
        C.partido_id
    FROM
        TSE_Elecciones_DB.CANDIDATOS AS C
    JOIN
        TSE_Elecciones_DB.CARGOS AS CA ON C.cargo_id = CA.id_cargo
    WHERE
        CA.nombre_cargo = 'Presidente'
) AS P
JOIN (
    SELECT
        C.id_candidato,
        C.nombre_candidato,
        C.cargo_id,
        C.partido_id
    FROM
        TSE_Elecciones_DB.CANDIDATOS AS C
    JOIN
        TSE_Elecciones_DB.CARGOS AS CA ON C.cargo_id = CA.id_cargo
    WHERE
        CA.nombre_cargo = 'Vicepresidente'
) AS VP ON P.partido_id = VP.partido_id
JOIN (
    SELECT
        DV.id_candidato,
        COUNT(*) AS total_votos
    FROM
        TSE_Elecciones_DB.DETALLE_VOTOS AS DV
    GROUP BY
        DV.id_candidato
) AS DV ON P.id_candidato = DV.id_candidato
GROUP BY
    P.id_candidato
ORDER BY
    total_votos DESC
LIMIT
    10;


SELECT
    CP.nombre_candidato AS nombre_presidente,
    CV.nombre_candidato AS nombre_vicepresidente,
    COUNT(DV.id_voto) AS total_votos
FROM
    TSE_Elecciones_DB.CANDIDATOS AS CP
JOIN
    TSE_Elecciones_DB.CANDIDATOS AS CV ON CP.id_candidato = CV.id_candidato
JOIN
    TSE_Elecciones_DB.DETALLE_VOTOS AS DV ON CP.id_candidato = DV.id_candidato
JOIN
    TSE_Elecciones_DB.CARGOS AS PC ON CP.cargo_id = PC.id_cargo
JOIN
    TSE_Elecciones_DB.CARGOS AS VC ON CV.cargo_id = VC.id_cargo
WHERE
    PC.nombre_cargo = 'presidente' -- Ajusta el nombre del cargo del presidente
    AND VC.nombre_cargo = 'vicepresidente' -- Ajusta el nombre del cargo del vicepresidente
GROUP BY
    CP.id_candidato, CV.id_candidato
ORDER BY
    total_votos DESC
LIMIT
    10;
