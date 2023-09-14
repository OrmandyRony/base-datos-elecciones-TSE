const db = require('../db/conexion')
const config = require('../db/config')
const mysql = require('mysql2/promise')
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, './TSEdatasets/departamentos.csv');
const filePathCiudadanos = path.join(__dirname, './TSEdatasets/ciudadanos.csv');
const filePathPartidos = path.join(__dirname, './TSEdatasets/partidos.csv');
const filePathCargos = path.join(__dirname, './TSEdatasets/cargos.csv');
const filePathCandidatos = path.join(__dirname, './TSEdatasets/candidatos.csv');
const filePathMesas = path.join(__dirname, './TSEdatasets/mesas.csv');
const filePathVotaciones = path.join(__dirname, './TSEdatasets/votaciones.csv');


// Esto podria convertirse en una funcion
exports.consulta1 = async (req, res) => {

    const consultaSQL1 = `
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
`;



    try {
        // Crear una conexión que se cerrará automáticamente al terminar
        const connection = await mysql.createConnection(config.db);
        // Eliminar los comentarios del script SQL
        const scriptWithoutComments = consultaSQL1.replace(/(--.*)/g, '');

        // Ejecutar el script SQL sin comentarios
        const sqlCommands = scriptWithoutComments.split(";").map(command => command.trim());
        const resultadConulta = await db.querywithoutclose(connection, sqlCommands[0], []);

        res.status(200).json({
            body: { res: true, message: 'CONSULTA 1 EXITOSA', resultadConulta },
        });
       
        // Cierra la conexión
        await connection.end();

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            body: { res: false, message: 'OCURRIÓ UN PROBLEMA AL CREAR TABLA TEMPORAL DE PARTIDOS', error },
        });
    }

}