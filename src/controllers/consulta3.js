const db = require('../db/conexion')
const config = require('../db/config')
const mysql = require('mysql2/promise')


// Esto podria convertirse en una funcion
exports.consulta3 = async (req, res) => {

    const consultaSQL1 = `
    -- Consulta 3 Mostrar el nombre de los candidatos a alcaldes por partido
    SELECT
    C.nombre_candidato AS Nombre,
    P.nombre_partido AS Partido
FROM
    TSE_Elecciones_DB.CANDIDATOS AS C
JOIN
    TSE_Elecciones_DB.PARTIDOS AS P ON C.partido_id = P.id_partido
JOIN
    TSE_Elecciones_DB.CARGOS AS CA ON C.cargo_id = CA.id_cargo
WHERE
    CA.nombre_cargo = 'alcalde'
ORDER BY
    Partido, Nombre;`;



    try {
        // Crear una conexión que se cerrará automáticamente al terminar
        const connection = await mysql.createConnection(config.db);
        // Eliminar los comentarios del script SQL
        const scriptWithoutComments = consultaSQL1.replace(/(--.*)/g, '');

        // Ejecutar el script SQL sin comentarios
        const sqlCommands = scriptWithoutComments.split(";").map(command => command.trim());
        const resultadConulta = await db.querywithoutclose(connection, sqlCommands[0], []);

        res.status(200).json({
            body: { res: true, message: 'CONSULTA 3 EXITOSA', resultadConulta },
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