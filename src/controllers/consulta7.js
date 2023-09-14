const db = require('../db/conexion')
const config = require('../db/config')
const mysql = require('mysql2/promise')


// Esto podria convertirse en una funcion
exports.consulta7 = async (req, res) => {

    const consultaSQL1 = `
    -- Consulta 7 Edades de los ciudadnos que si votaron
    SELECT
        TSE_Elecciones_DB.CIUDADANOS.edad_ciudadano
    FROM TSE_Elecciones_DB.CIUDADANOS
    INNER JOIN
        VOTOS ON TSE_Elecciones_DB.CIUDADANOS.dpi_ciudadano = TSE_Elecciones_DB.VOTOS.dpi_ciudadano
    ORDER BY TSE_Elecciones_DB.CIUDADANOS.edad_ciudadano DESC
    LIMIT 10;
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
            body: { res: true, message: 'CONSULTA 7 EXITOSA', resultadConulta },
        });
       
        // Cierra la conexión
        await connection.end();

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            body: { res: false, message: 'OCURRIÓ UN PPROBLEMA EN LA CONSULTA 7', error },
        });
    }

}