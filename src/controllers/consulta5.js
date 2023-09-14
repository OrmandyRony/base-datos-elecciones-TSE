const db = require('../db/conexion')
const config = require('../db/config')
const mysql = require('mysql2/promise')


// Esto podria convertirse en una funcion
exports.consulta5 = async (req, res) => {

    const consultaSQL1 = `
    -- Consulta 5 Cantidad de votaciones por departamentos. (departamento, numero_votaciones)
    SELECT
       nombre_departamento, COUNT(*) AS 'Cantidad de votos'
    FROM TSE_Elecciones_DB.MESAS
    INNER JOIN
    TSE_Elecciones_DB.VOTOS ON TSE_Elecciones_DB.MESAS.id_mesa = TSE_Elecciones_DB.VOTOS.id_mesa
    INNER JOIN
    TSE_Elecciones_DB.DEPARTAMENTOS ON TSE_Elecciones_DB.MESAS.id_departamento = TSE_Elecciones_DB.DEPARTAMENTOS.id_departamento
    GROUP BY TSE_Elecciones_DB.DEPARTAMENTOS.id_departamento;`;



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