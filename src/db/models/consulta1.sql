-- Consulta 1 Mostrar el nombre de los candidatos a presidentes y
-- vicepresidentes por partido (en este reporte/consulta se espera ver
-- tres columnas: "nombre presidente", "nombre vicepresidente", "partido").
-- 

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

-- Consulta 2 Mostrar el nombre de los candidatos a diputados por partido
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

-- Consulta 3 Mostrar el nombre de los candidatos a alcaldes por partido
SELECT
    nombre_candidato
FROM CANDIDATOS
INNER JOIN
    CARGOS ON CANDIDATOS.cargo_id = CARGOS.id_cargo
WHERE nombre_cargo = 'alcalde';

-- Consulta  4 Cantidad de candidatos por partido (presidentes, vicepresidentes, diputados, alcaldes).
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

-- Consulta 5 Cantidad de votaciones por departamentos. (departamento, numero_votaciones)
SELECT
   nombre_departamento, COUNT(*) AS 'Cantidad de votos'
FROM MESAS
INNER JOIN
    VOTOS ON MESAS.id_mesa = VOTOS.id_mesa
INNER JOIN
    DEPARTAMENTOS ON MESAS.id_departamento = DEPARTAMENTOS.id_departamento
GROUP BY DEPARTAMENTOS.id_departamento;
-- COnsulta 6 Cantidad de votos nulos (total).
SELECT
    COUNT(id_candidato)
FROM  DETALLE_VOTOS
WHERE id_candidato = -1;

-- Consulta 7 Edades de los ciudadnos que si votaron
SELECT
    edad_ciudadano
FROM CIUDADANOS
INNER JOIN
    VOTOS ON CIUDADANOS.dpi_ciudadano = VOTOS.dpi_ciudadano
ORDER BY edad_ciudadano DESC
LIMIT 10;
