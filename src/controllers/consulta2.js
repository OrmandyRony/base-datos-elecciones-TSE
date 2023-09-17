const db = require('../db/conexion')
const config = require('../db/config')
const mysql = require('mysql2/promise')


// Esto podria convertirse en una funcion
exports.consulta2 = async (req, res) => {

    const consultaSQL1 = `-- Consulta 2 Mostrar el nombre de los candidatos a diputados por partido
    SELECT
    P.nombre_partido AS nombre_partido,
    COUNT(C.id_candidato) AS numero_candidatos
    FROM
        TSE_Elecciones_DB.PARTIDOS AS P
    JOIN
        TSE_Elecciones_DB.CANDIDATOS AS C ON P.id_partido = C.partido_id
    JOIN
        TSE_Elecciones_DB.CARGOS AS CA ON C.cargo_id = CA.id_cargo
    WHERE
        CA.nombre_cargo IN ('diputado congreso lista nacional', 'diputado congreso distrito electoral', 'diputado parlamento centroamericano')
    GROUP BY
    P.nombre_partido;
    ;`;



    try {
        // Crear una conexión que se cerrará automáticamente al terminar
        const connection = await mysql.createConnection(config.db);
        // Eliminar los comentarios del script SQL
        const scriptWithoutComments = consultaSQL1.replace(/(--.*)/g, '');

        // Ejecutar el script SQL sin comentarios
        const sqlCommands = scriptWithoutComments.split(";").map(command => command.trim());
        const resultadConulta = await db.querywithoutclose(connection, sqlCommands[0], []);

        res.status(200).json({
            body: { res: true, message: 'CONSULTA 2 EXITOSA', resultadConulta },
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