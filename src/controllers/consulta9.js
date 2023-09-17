const db = require('../db/conexion')
const config = require('../db/config')
const mysql = require('mysql2/promise')


// Esto podria convertirse en una funcion
exports.consulta9 = async (req, res) => {

    const consultaSQL1 = `
    -- Consulta 9 Top 5 de mesas más frecuentadas (mostrar no. Mesa y departamento al que pertenece).
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
            body: { res: true, message: 'CONSULTA 9 EXITOSA', resultadConulta },
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