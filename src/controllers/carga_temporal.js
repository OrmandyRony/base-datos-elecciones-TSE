const db = require('../db/conexion')
const config = require('../db/config')
const mysql = require('mysql2/promise')
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, './TSEdatasets/departamentos.csv');
const filePathCiudadanos = path.join(__dirname, './TSEdatasets/ciudadanos.csv');
const filePathPartidos = path.join(__dirname, './TSEdatasets/partidos.csv');
const filePathCargos = path.join(__dirname, './TSEdatasets/cargos.csv');
const filePathCandidatos = path.join(__dirname, './TSEdatasets/candidatos.csv');
const filePathMesas = path.join(__dirname, './TSEdatasets/mesas.csv');
const filePathVotaciones = path.join(__dirname, './TSEdatasets/votaciones.csv');


// Esto podria convertirse en una funcion
exports.crearTablas= async (req, res) => {

    const scriptCrearTablaTempoalPartidos = `-- TABLA TEMPORAL DE PARTIDOS
    CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.PARTIDOS_TEMPORALES (
        id_partido INT NOT NULL,
        nombre_partido VARCHAR(50) NOT NULL,
        siglas_partido VARCHAR(30) NOT NULL,
        fundacion_partido DATE
    );`;

    try {
        // Crear una conexión que se cerrará automáticamente al terminar
        const connection = await mysql.createConnection(config.db);
        // Eliminar los comentarios del script SQL
        const scriptWithoutComments = scriptCrearTablaTempoalPartidos.replace(/(--.*)/g, '');

        // Ejecutar el script SQL sin comentarios
        const sqlCommands = scriptWithoutComments.split(";").map(command => command.trim());

        for (let i = 0; i < sqlCommands.length; i++) {
            const sql = sqlCommands[i];
            if (sql.length === 0) {
                continue;
            }
            await db.querywithoutclose(connection, sql, []);
        }

        // carga de datos csv a tabla temporal
        const datosPartidos = fs.readFileSync(filePathPartidos, 'utf-8');

        console.log('INICIO DE CARGA DE DATOS DEPARTAMENTOS');
        console.log(datosPartidos);

        const lines = datosPartidos.split('\n');

        for (let i = 1; i < lines.length; i++) {
            const fields = lines[i].split(',');
            const id_partido = fields[0];
            const nombre_partido = fields[1];
            const siglas_partido = fields[2];
            // const fundacion_partido = fields[3];
            // Formato de fecha: %d-%m-%Y
            // separar con split
            const fecha = fields[3].split('/');
            const year = fecha[2];
            const month = fecha[1];
            const day = fecha[0];
            const fundacion_partido = `${year}-${month}-${day}`;

            // Insertar los datos en la tabla temporal
            await db.querywithoutclose(connection, 
                `INSERT INTO TSE_Elecciones_DB.PARTIDOS_TEMPORALES 
                (id_partido, nombre_partido, siglas_partido, fundacion_partido) 
                VALUES (?, ?, ?, ?)`, [id_partido, nombre_partido, siglas_partido, fundacion_partido]);
        }
        console.log('FIN DE CARGA DE DATOS DEPARTAMENTOS EN LA TABLA TEMPORAL DE PARTIDOS');

        // eliminar
        const tempClientesData = await db.querywithoutclose(connection, `SELECT * FROM TSE_Elecciones_DB.PARTIDOS_TEMPORALES`, []);
        console.log(tempClientesData);

        // por ultimo pasamos los datos de la tabla temporal a la tabla clientes
        await db.querywithoutclose(connection, `INSERT INTO TSE_Elecciones_DB.PARTIDOS (id_partido, nombre_partido, siglas_partido, fundacion_partido)
         SELECT id_partido, nombre_partido, siglas_partido, fundacion_partido FROM TSE_Elecciones_DB.PARTIDOS_TEMPORALES`, []);

        // Cierra la conexión
        await connection.end();

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            body: { res: false, message: 'OCURRIÓ UN PROBLEMA AL CREAR TABLA TEMPORAL DE PARTIDOS', error },
        });
    }


    const scriptCrearTablaTempoalDepartamentos = `
    -- TABLA TEMPORAL DE DEPARTAMENTOS
    CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.DEPARTAMENTOS_TEMPORALES (
        id_departamento INT NOT NULL,
        nombre_departamento VARCHAR(100) NOT NULL
    );
    `

    try {
        // Crear una conexión que se cerrará automáticamente al terminar
        const connection = await mysql.createConnection(config.db);
        // Eliminar los comentarios del script SQL
        const scriptWithoutComments = scriptCrearTablaTempoalDepartamentos.replace(/(--.*)/g, '');

        // Ejecutar el script SQL sin comentarios
        const sqlCommands = scriptWithoutComments.split(";").map(command => command.trim());

        for (let i = 0; i < sqlCommands.length; i++) {
            const sql = sqlCommands[i];
            if (sql.length === 0) {
                continue;
            }
            await db.querywithoutclose(connection, sql, []);
        }

        // carga de datos csv a tabla temporal
        const datosDepartamentos = fs.readFileSync(filePath, 'utf-8');

        console.log('INICIO DE CARGA DE DATOS DEPARTAMENTOS');
        console.log(datosDepartamentos);

        const lines = datosDepartamentos.split('\n');

        for (let i = 1; i < lines.length; i++) {
            const fields = lines[i].split(',');
            const id_departamento = fields[0];
            const nombre_departamento = fields[1];
            console.log("vamos dentro: ",id_departamento, nombre_departamento);
            //console.log("vamos dentro: ",nombre, correo, direccion);
            // Insertar los datos en la tabla temporal
            await db.querywithoutclose(connection, 
                `INSERT INTO TSE_Elecciones_DB.DEPARTAMENTOS_TEMPORALES 
                (id_departamento, nombre_departamento) 
                VALUES (?, ?)`, [id_departamento, nombre_departamento]);
        }
        console.log('FIN DE CARGA DE DATOS DEPARTAMENTOS EN LA TABLA TEMPORAL');

        const tempClientesData = await db.querywithoutclose(connection, `SELECT * FROM TSE_Elecciones_DB.DEPARTAMENTOS_TEMPORALES`, []);
        console.log(tempClientesData);

        // por ultimo pasamos los datos de la tabla temporal a la tabla clientes
        await db.querywithoutclose(connection, `INSERT INTO TSE_Elecciones_DB.DEPARTAMENTOS (id_departamento, nombre_departamento) SELECT id_departamento, nombre_departamento FROM TSE_Elecciones_DB.DEPARTAMENTOS_TEMPORALES`, []);

        // Cierra la conexión
        await connection.end();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            body: { res: false, message: 'OCURRIÓ UN PROBLEMA AL CREAR TABLA TEMPORAL DE DPARTAMENTOS', error },
        });
    }

    const scriptCrearTablaTempoalCiudadanos = `
    -- TABLA TEMPORAL DE CIUDADANOS
    CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.CIUDADANOS_TEMPORALES (
        dpi_ciudadano VARCHAR(13) NOT NULL,
        nombre_ciudadano VARCHAR(100) NOT NULL,
        apellido_ciudadano VARCHAR(100) NOT NULL,
        direccion_ciudadano VARCHAR(100) NOT NULL,
        telefono_ciudadano VARCHAR(12) NOT NULL,
        edad_ciudadano INT NOT NULL,
        genero_ciudadano VARCHAR(1) NOT NULL
    );
    `

    try {
        // Crear una conexión que se cerrará automáticamente al terminar
        const connection = await mysql.createConnection(config.db);
        // Eliminar los comentarios del script SQL
        const scriptWithoutComments = scriptCrearTablaTempoalCiudadanos.replace(/(--.*)/g, '');

        // Ejecutar el script SQL sin comentarios
        const sqlCommands = scriptWithoutComments.split(";").map(command => command.trim());

        for (let i = 0; i < sqlCommands.length; i++) {
            const sql = sqlCommands[i];
            if (sql.length === 0) {
                continue;
            }
            await db.querywithoutclose(connection, sql, []);
        }

        // carga de datos csv a tabla temporal
        const datosCiudadanos = fs.readFileSync(filePathCiudadanos, 'utf-8');

        console.log('INICIO DE CARGA DE DATOS CIUDADANOS');
        //console.log(datosCiudadanos);

        const lines = datosCiudadanos.split('\n');

        for (let i = 1; i < lines.length; i++) {
            const fields = lines[i].split(',');
            const dpi_ciudadano = fields[0];
            const nombre_ciudadano = fields[1];
            const apellido_ciudadano = fields[2];
            const direccion_ciudadano = fields[3];
            const telefono_ciudadano = fields[4];
            const edad_ciudadano = fields[5];
            const genero_ciudadano = fields[6];

            // Insertar los datos en la tabla temporal
            await db.querywithoutclose(connection, 
                `INSERT INTO TSE_Elecciones_DB.CIUDADANOS_TEMPORALES 
                (dpi_ciudadano, nombre_ciudadano, apellido_ciudadano, direccion_ciudadano, telefono_ciudadano, edad_ciudadano, genero_ciudadano) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`, [dpi_ciudadano, nombre_ciudadano, apellido_ciudadano, direccion_ciudadano, telefono_ciudadano, edad_ciudadano, genero_ciudadano]);
        }
        console.log('FIN DE CARGA DE DATOS CIUDADANOS EN LA TABLA TEMPORAL');

        const tempClientesData = await db.querywithoutclose(connection, `SELECT * FROM TSE_Elecciones_DB.CIUDADANOS_TEMPORALES`, []);
        //console.log(tempClientesData);

        // por ultimo pasamos los datos de la tabla temporal a la tabla clientes
        await db.querywithoutclose(connection, `INSERT INTO TSE_Elecciones_DB.CIUDADANOS (dpi_ciudadano, nombre_ciudadano, apellido_ciudadano, direccion_ciudadano, telefono_ciudadano, edad_ciudadano, genero_ciudadano) SELECT dpi_ciudadano, nombre_ciudadano, apellido_ciudadano, direccion_ciudadano, telefono_ciudadano, edad_ciudadano, genero_ciudadano FROM TSE_Elecciones_DB.CIUDADANOS_TEMPORALES`, []);

        // Cierra la conexión
        await connection.end();
        console.log('CIERRE DE CONEXION');

    } catch (error) {
        console.log(error);
        res.status(500).json({
            body: { res: false, message: 'OCURRIÓ UN PROBLEMA AL CREAR TABLA TEMPORAL DE CIUDADANOS', error },
        });
    }

    const scriptCrearTablaTemporalCargos = `
    CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.CARGOS_TEMPORALES (
        id_cargo INT NOT NULL,
        nombre_cargo VARCHAR(50) NOT NULL
    );
    `;

    try {
        // Crear una conexión que se cerrará automáticamente al terminar
        const connection = await mysql.createConnection(config.db);
        // Eliminar los comentarios del script SQL
        const scriptWithoutComments = scriptCrearTablaTemporalCargos.replace(/(--.*)/g, '');

        // Ejecutar el script SQL sin comentarios
        const sqlCommands = scriptWithoutComments.split(";").map(command => command.trim());

        for (let i = 0; i < sqlCommands.length; i++) {
            const sql = sqlCommands[i];
            if (sql.length === 0) {
                continue;
            }
            await db.querywithoutclose(connection, sql, []);
        }

        // carga de datos csv a tabla temporal
        const datosCargos = fs.readFileSync(filePathCargos, 'utf-8');

        console.log('INICIO DE CARGA DE DATOS CARGOS');
        console.log(datosCargos);

        const lines = datosCargos.split('\n');

        for (let i = 1; i < lines.length; i++) {
            const fields = lines[i].split(',');
            const id_cargo = fields[0];
            const nombre_cargo = fields[1];
         
            //console.log("vamos dentro: ",nombre, correo, direccion);
            // Insertar los datos en la tabla temporal
            await db.querywithoutclose(connection, 
                `INSERT INTO TSE_Elecciones_DB.CARGOS_TEMPORALES
                (id_cargo, nombre_cargo) 
                VALUES (?, ?)`, [id_cargo, nombre_cargo]);
        }
        console.log('FIN DE CARGA DE DATOS CARGOS EN LA TABLA TEMPORAL');

        const tempClientesData = await db.querywithoutclose(connection, `SELECT * FROM TSE_Elecciones_DB.CARGOS_TEMPORALES`, []);
        console.log(tempClientesData);

        // por ultimo pasamos los datos de la tabla temporal a la tabla clientes
        await db.querywithoutclose(connection, `INSERT INTO TSE_Elecciones_DB.CARGOS (id_cargo, nombre_cargo) SELECT id_cargo, nombre_cargo FROM TSE_Elecciones_DB.CARGOS_TEMPORALES`, []);

        // Cierra la conexión
        await connection.end();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            body: { res: false, message: 'OCURRIÓ UN PROBLEMA AL CREAR TABLA TEMPORAL DE DPARTAMENTOS', error },
        });
    }

    const scriptCrearTablaTemporalCandidatos = `
    -- TABLA TEMPORAL DE CANDIDATOS
    CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.CANDIDATOS_TEMPORALES (
        id_candidato INT NOT NULL,
        nombre_candidato VARCHAR(50) NOT NULL,
        fecha_nacimiento_candidato DATE,
        cargo_id INT NOT NULL,
        partido_id INT NOT NULL
    );
    `;

    try {
        // Crear una conexión que se cerrará automáticamente al terminar
        const connection = await mysql.createConnection(config.db);
        // Eliminar los comentarios del script SQL
        const scriptWithoutComments = scriptCrearTablaTemporalCandidatos.replace(/(--.*)/g, '');

        // Ejecutar el script SQL sin comentarios
        const sqlCommands = scriptWithoutComments.split(";").map(command => command.trim());

        for (let i = 0; i < sqlCommands.length; i++) {
            const sql = sqlCommands[i];
            if (sql.length === 0) {
                continue;
            }
            await db.querywithoutclose(connection, sql, []);
        }

        // carga de datos csv a tabla temporal
        const datosCandidatos = fs.readFileSync(filePathCandidatos, 'utf-8');

        console.log('INICIO DE CARGA DE DATOS CANDIDATOS');
        console.log(datosCandidatos);

        const lines = datosCandidatos.split('\n');

        for (let i = 1; i < lines.length; i++) {
            const fields = lines[i].split(',');
            const id_candidato = fields[0];
            const nombre_candidato = fields[1];
            const fecha_nacimiento_candidato_latam = fields[2];

            // Formato de fecha: %d-%m-%Y
            // separar con split
            const fecha_usa = fecha_nacimiento_candidato_latam.split('/');
            const year = fecha_usa[2];
            const month = fecha_usa[1];
            const day = fecha_usa[0];
         
            const fecha_nacimiento_candidato = `${year}-${month}-${day}`;
            const partido_id = fields[3];
            const cargo_id = fields[4];

            //console.log("vamos dentro: ",nombre, correo, direccion);
            // Insertar los datos en la tabla temporal
            await db.querywithoutclose(connection, 
                `INSERT INTO TSE_Elecciones_DB.CANDIDATOS_TEMPORALES
                (id_candidato, nombre_candidato, fecha_nacimiento_candidato, cargo_id, partido_id) 
                VALUES (?, ?, ?, ?, ?)`, [id_candidato, nombre_candidato, fecha_nacimiento_candidato, cargo_id, partido_id]);
        }
        console.log('FIN DE CARGA DE DATOS CANDIDATOS EN LA TABLA TEMPORAL');

        //const tempClientesData = await db.querywithoutclose(connection, `SELECT * FROM TSE_Elecciones_DB.CARGOS_TEMPORALES`, []);
        //console.log(tempClientesData);

        // por ultimo pasamos los datos de la tabla temporal a la tabla clientes
        await db.querywithoutclose(connection, `INSERT INTO TSE_Elecciones_DB.CANDIDATOS (id_candidato, nombre_candidato, fecha_nacimiento_candidato, cargo_id, partido_id)
         SELECT id_candidato, nombre_candidato, fecha_nacimiento_candidato, cargo_id, partido_id FROM TSE_Elecciones_DB.CANDIDATOS_TEMPORALES`, []);

        // Cierra la conexión
        await connection.end();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            body: { res: false, message: 'OCURRIÓ UN PROBLEMA AL CREAR TABLA TEMPORAL DE CANDIDATOS', error },
        });
    }

    const scriptCrearTablaTemporalMesas = `
    -- TABLA TEMPORAL DE MESAS
    CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.MESAS_TEMPORALES (
        id_mesa INT NOT NULL,
        id_departamento INT NOT NULL
    );
    `;

    try {
        // Crear una conexión que se cerrará automáticamente al terminar
        const connection = await mysql.createConnection(config.db);
        // Eliminar los comentarios del script SQL
        const scriptWithoutComments = scriptCrearTablaTemporalMesas.replace(/(--.*)/g, '');

        // Ejecutar el script SQL sin comentarios
        const sqlCommands = scriptWithoutComments.split(";").map(command => command.trim());

        for (let i = 0; i < sqlCommands.length; i++) {
            const sql = sqlCommands[i];
            if (sql.length === 0) {
                continue;
            }
            await db.querywithoutclose(connection, sql, []);
        }

        // carga de datos csv a tabla temporal
        const datosMesas = fs.readFileSync(filePathMesas, 'utf-8');

        console.log('INICIO DE CARGA DE DATOS MESAS');
        console.log(datosMesas);

        const lines = datosMesas.split('\n');

        for (let i = 1; i < lines.length; i++) {
            const fields = lines[i].split(',');
            const id_mesa = fields[0];
            const id_departamento = fields[1];

            //console.log("vamos dentro: ",nombre, correo, direccion);
            // Insertar los datos en la tabla temporal
            await db.querywithoutclose(connection, 
                `INSERT INTO TSE_Elecciones_DB.MESAS_TEMPORALES
                (id_mesa, id_departamento) 
                VALUES (?, ?)`, [id_mesa, id_departamento]);
        }
        console.log('FIN DE CARGA DE DATOS MESAS EN LA TABLA TEMPORAL');

        //const tempClientesData = await db.querywithoutclose(connection, `SELECT * FROM TSE_Elecciones_DB.CARGOS_TEMPORALES`, []);
        //console.log(tempClientesData);

        // por ultimo pasamos los datos de la tabla temporal a la tabla clientes
        await db.querywithoutclose(connection, `INSERT INTO TSE_Elecciones_DB.MESAS (id_mesa, id_departamento) 
        SELECT id_mesa, id_departamento FROM TSE_Elecciones_DB.MESAS_TEMPORALES`, []);

        // Cierra la conexión
        await connection.end();



    } catch (error) {
        console.log(error);
        res.status(500).json({
            body: { res: false, message: 'OCURRIÓ UN PROBLEMA AL CREAR TABLA TEMPORAL DE MESAS', error },
        });
    }

    const scriptCrearTablaTemporalVotos = `
    -- TABLA TEMPORAL DE VOTOS
    CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.VOTOS_TEMPORALES (
        fecha_hora_voto DATETIME NOT NULL,
        dpi_ciudadano VARCHAR(13) NOT NULL,
        id_voto INT NOT NULL,
        id_mesa INT NOT NULL,
        id_candidato INT NOT NULL
    );
    `;

    try {
        // Crear una conexión que se cerrará automáticamente al terminar
        const connection = await mysql.createConnection(config.db);
        // Eliminar los comentarios del script SQL
        const scriptWithoutComments = scriptCrearTablaTemporalVotos.replace(/(--.*)/g, '');

        // Ejecutar el script SQL sin comentarios
        const sqlCommands = scriptWithoutComments.split(";").map(command => command.trim());

        for (let i = 0; i < sqlCommands.length; i++) {
            const sql = sqlCommands[i];
            if (sql.length === 0) {
                continue;
            }
            await db.querywithoutclose(connection, sql, []);
        }

        // carga de datos csv a tabla temporal
        const datosVotos = fs.readFileSync(filePathVotaciones, 'utf-8');

        console.log('INICIO DE CARGA DE DATOS VOTOS');
        console.log(datosVotos);

        const lines = datosVotos.split('\n');

        for (let i = 1; i < lines.length; i++) {
            const fields = lines[i].split(',');
            const id_voto = fields[0];
            const id_candidato = fields[1];
            const dpi_ciudadano = fields[2];
            const id_mesa = fields[3];
            const fecha_hora_voto = fields[4];
            // Separar fecha y hora
            const fecha_hora = fecha_hora_voto.split(' ');
            const fecha = fecha_hora[0];
            const hora = fecha_hora[1];
            // Cambiar formato de fecha
            const fecha_latam = fecha.split('/');
            const year = fecha_latam[2];
            const month = fecha_latam[1];
            const day = fecha_latam[0];
            const fecha_voto = `${year}-${month}-${day}`;
            // Fecha y hora completas
            const fecha_hora_voto_final = `${fecha_voto} ${hora}`;

            //console.log("vamos dentro: ",nombre, correo, direccion);
            // Insertar los datos en la tabla temporal
            await db.querywithoutclose(connection, 
                `INSERT INTO TSE_Elecciones_DB.VOTOS_TEMPORALES
                (id_voto, id_mesa, id_candidato, dpi_ciudadano, fecha_hora_voto) 
                VALUES (?, ?, ?, ?, ?)`, [id_voto, id_mesa, id_candidato, dpi_ciudadano, fecha_hora_voto_final]);
        }
        console.log('FIN DE CARGA DE DATOS VOTOS EN LA TABLA TEMPORAL');

        //const tempClientesData = await db.querywithoutclose(connection, `SELECT * FROM TSE_Elecciones_DB.CARGOS_TEMPORALES`, []);
        //console.log(tempClientesData);

        // por ultimo pasamos los datos de la tabla temporal a la tabla clientes
        await db.querywithoutclose(connection, `INSERT INTO TSE_Elecciones_DB.VOTOS
        (fecha_hora_voto ,id_mesa, dpi_ciudadano)
        SELECT  DISTINCT  fecha_hora_voto ,id_mesa, dpi_ciudadano
        FROM  TSE_Elecciones_DB.VOTOS_TEMPORALES;`, []);

        await db.querywithoutclose(connection, `INSERT INTO TSE_Elecciones_DB.DETALLE_VOTOS
        (id_voto, id_candidato)
        SELECT id_voto, id_candidato FROM TSE_Elecciones_DB.VOTOS_TEMPORALES;`, []);

        // Cierra la conexión
        await connection.end();

        res.status(200).json({
            body: { res: true, message: 'TABLAS TEMPORAL DE PARTIDOS HAN SIDO CREADAS EXITOSAMENTE :D' },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            body: { res: false, message: 'OCURRIÓ UN PROBLEMA AL CREAR TABLA TEMPORAL DE MESAS', error },
        });
    }
}