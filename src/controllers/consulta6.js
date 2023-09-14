const db = require('../db/conexion')
const config = require('../db/config')
const mysql = require('mysql2/promise')


// Esto podria convertirse en una funcion
exports.consulta6 = async (req, res) => {

    const consultaSQL1 = `
    -- COnsulta 6 Cantidad de votos nulos (total).
    SELECT
        COUNT(id_candidato)
    FROM  TSE_Elecciones_DB.DETALLE_VOTOS
    WHERE id_candidato = -1;
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
            body: { res: true, message: 'CONSULTA 6 EXITOSA', resultadConulta },
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