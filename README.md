# README

# Proyecto 1 Sistemas de bases de datos

## Herramientas

- Excalidraw para el modelo conceptual
- Data modeler para la realización del modelo lógico y físico (utilizando la notación de Barker)
- MySQL como DBMS

## Requisitos

En este proyecto nos dan los datos en diversos archivos en formato csv, los cuales debemos de ingresar a una base de datos relacional en el cual el DBMS elegido es MySQL.

### Identificación de entidades y a tributos

Se nos dan los archivos csv, candidatos, cargos, ciudadanos, departamentos, mesas,  partidos y votaciones.

1. Archivo departamentos (entidad: Departamento)
    1. id: numero unico de identificación del departamento
    2. nombre: nombre del departamento
2. Archivo de ciudadanos (entidad: Ciudadano)
    1. DPI: documento personal de identificación 
    2. nombre: nombre del ciudadano
    3. apellido: apellido del ciudadano
    4. direccion: dirección del residencia del ciudadano
    5. telefono: numero de teléfono de ciudadano
    6. edad: numero de años del ciudadano
    7. genero: masculino o femenino  denotado por M o F
3.  Archivo partidos (entidad: partido)
    1. id_partido: numero único de identificación del partido
    2. nombre: nombre del partido
    3. sigla
    4. fundacion: fecha de fundacion del partido
4. Archivo cargos (entidad: Cargo)
    1. id: numero único de identificación del cargo
    2. cargo: nombre del car 
5. Archivo candidatos (entidad: Candidato)
    1. id: identificador del candidato el id -1 significa nulo
    2. nombre: nombre del candidato participante
    3. fecha_nacimiento
    4. cargo_id: cargo al que se postula identificado por un numero relacionado con el archivo cargos

## Análisis de Datos

**Identificación de restricciones y reglas**:

En este caso todos los atributos son obligatorios. 

En el caso de la edad del votante debe ser mayor a dieciocho años.

Un candidato puede estar afiliado a un solo partido, o de otra forma un partido puede tener muchos candidatos pero un candidato solo puede tener un cargo.

## Modelo Conceptual

![Modelo_conceptual.png](README%2043b1224bc56d42298844b712fdccdb74/Modelo_conceptual.png)

## Modelo Lógico

![Modelo_logico.png](README%2043b1224bc56d42298844b712fdccdb74/Modelo_logico.png)

### Detalles del modelo

****************Cargo Candidato****************

Cada elemento de la entidad CARGO puede estar asociado con uno o muchos elementos  de la entidad CANDIDATO.

Cada elemento de la entidad CANDIDATO  debe estar asociado con uno y solamente un elemento de la entidad CARGO.

**********************************Partido Candidato**********************************

Cada elemento de entidad PARTIDO puede estar asociado con uno o muchos elementos de la Entidad CANDIDATO

Cada elemento de la entidad CANDIDATO debe estar asociado con uno y solamente un elemento de la entidad PARTIDO

**Candidato Detalle Voto**

Cada elemento de la entidad CANDIDATO puede estar asociado a uno o muchos elementos de la entidad DETALLEVOTO

Cada elemento de la entidad DETALLE_VOTO debe estar asociado a uno y solamente un elemento de la entidad CANDIDATO.

**********************************Voto Detalle Voto**********************************

Cada elemento de la entidad VOTO puede estar asociado con uno o muchos elementos de la entidad DETALLE_VOTO.

Cada elemento de la entidad DETALLE_VOTO debe estar asociado con uno y solamente un elemento de la entidad VOTO. 

********************Ciudadano Voto********************

Cada elemento de la entidad ciudadano puede estar asociado con  uno o muchos elementos de la entidad voto.

Cada elemento de la entidad voto debe estar asociado con un y solamente un elemento de entidad Ciudadano.

******************Voto Mesa******************

Cada elemento de la entidad MESA puede estar asociado con uno o muchos elementos de la entidad voto.

Cada elemento de la entidad VOTO debe estar asociado con un y solamente un elemento de la entidad MESA.

**************************Mesa Departamento**************************

Cada elemento de la entidad MESA debe estar asociado con uno y solo un elemento de la entidad DEPARTAMENTO

Cada elemento de la entidad DEPARTAMENTO puede estar asociado con una o muchos elemento de la entidad MESA.

## Modelo Físico

![Modelo_fisico.png](README%2043b1224bc56d42298844b712fdccdb74/Modelo_fisico.png)

## Implementación

## Pruebas

## Iniciar servidor con NODEJS
1. npm init -y
2. npm install express
3. npm install nodemon -D
4. npm install dotenv
5. npm install mysql2
6. npm install cors
7. crear achivo .gitignore
Porque usaron tal atributo y su tipo
Eliminar tablas 
Consulta foro