const db = require('../db/conexion')
const config = require('../db/config')
const mysql = require('mysql2/promise')


// Esto podria convertirse en una funcion
exports.consulta4 = async (req, res) => {

    const consultaSQL1 = `
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
        P.nombre_partido, C.nombre_cargo;`;



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