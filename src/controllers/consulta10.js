const db = require('../db/conexion')
const config = require('../db/config')
const mysql = require('mysql2/promise')


// Esto podria convertirse en una funcion
exports.consulta10 = async (req, res) => {

    const consultaSQL1 = `
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
        5;`;



    try {
        // Crear una conexión que se cerrará automáticamente al terminar
        const connection = await mysql.createConnection(config.db);
        // Eliminar los comentarios del script SQL
        const scriptWithoutComments = consultaSQL1.replace(/(--.*)/g, '');

        // Ejecutar el script SQL sin comentarios
        const sqlCommands = scriptWithoutComments.split(";").map(command => command.trim());
        const resultadConulta = await db.querywithoutclose(connection, sqlCommands[0], []);

        res.status(200).json({
            body: { res: true, message: 'CONSULTA 10 EXITOSA', resultadConulta },
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