const db = require('../db/conexion')
const config = require('../db/config')
const mysql = require('mysql2/promise')


// Esto podria convertirse en una funcion
exports.consulta11 = async (req, res) => {

    const consultaSQL1 = `
    -- Consulta 11 Cantidad de votos por género (Masculino, Femenino).
    SELECT
        CI.genero_ciudadano AS genero,
        COUNT(V.id_voto) AS total_votos
    FROM
        TSE_Elecciones_DB.CIUDADANOS AS CI
    JOIN
        TSE_Elecciones_DB.VOTOS AS V ON CI.dpi_ciudadano = V.dpi_ciudadano
    GROUP BY
        genero;`;



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