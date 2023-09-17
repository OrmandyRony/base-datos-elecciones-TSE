const db = require('../db/conexion')
const config = require('../db/config')
const mysql = require('mysql2/promise')


// Esto podria convertirse en una funcion
exports.consulta8 = async (req, res) => {

    const consultaSQL1 = `
    -- Consulta 1 Mostrar el nombre de los candidatos a presidentes y
-- vicepresidentes por partido (en este reporte/consulta se espera ver
-- tres columnas: "nombre presidente", "nombre vicepresidente", "partido").
-- 
SELECT p.nombre_candidato AS presidente, v.nombre_candidato AS vicepresidente, COUNT(*) AS conteo
FROM TSE_Elecciones_DB.CANDIDATOS p
JOIN TSE_Elecciones_DB.CANDIDATOS v
ON
	p.partido_id = v.partido_id
	AND p.cargo_id = 1
	AND v.cargo_id = 2
JOIN TSE_Elecciones_DB.DETALLE_VOTOS dv
ON dv.id_candidato = p.id_candidato
GROUP BY presidente, vicepresidente
ORDER BY conteo DESC
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