# README

# Proyecto 1 Sistemas de bases de datos

## Herramientas

- Excalidraw para el modelo conceptual
- Data modeler para la realización del modelo lógico y físico (utilizando la notación de Barker)
- MySQL como DBMS
- API realizada en Node JS

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

Los datos nulos seran representado por un -1.

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
Para este proyecto usaremos las convenciones de oracle para la sintaxis de SQL.

**Tabla DEPARTAMENTOS**:

```sql
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.DEPARTAMENTOS (
    id_departamento INT NOT NULL AUTO_INCREMENT,
    nombre_departamento VARCHAR(100) NOT NULL,
    CONSTRAINT PK_departamento PRIMARY KEY (id_departamento)
);

```

- Esta tabla almacena información sobre los departamentos en el contexto de las elecciones. Se utiliza un campo "id_departamento" como clave primaria y un campo "nombre_departamento" para almacenar el nombre del departamento. El tipo de datos "VARCHAR(100)" se eligió para el nombre del departamento porque es una cadena de caracteres de longitud variable.

**Tabla CIUDADANOS**:

```sql
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.CIUDADANOS (
    dpi_ciudadano VARCHAR(13) NOT NULL,
    nombre_ciudadano VARCHAR(100) NOT NULL,
    apellido_ciudadano VARCHAR(100) NOT NULL,
    edad_ciudadano INT NOT NULL,
    genero_ciudadano VARCHAR(1) NOT NULL,
    direccion_ciudadano VARCHAR(100) NOT NULL,
    telefono_ciudadano VARCHAR(12) NOT NULL,
    CONSTRAINT PK_ciudadano PRIMARY KEY (dpi_ciudadano)
);

```

- Esta tabla almacena información sobre los ciudadanos que participan en las elecciones. Se utiliza el campo "dpi_ciudadano" como clave primaria, ya que representa un identificador único (DPI). Los otros campos, como "nombre_ciudadano" y "apellido_ciudadano," se utilizan para almacenar información personal. Los tipos de datos elegidos reflejan el tipo de información que se almacenará en cada campo.

**Tabla PARTIDOS**:

```sql
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.PARTIDOS (
    id_partido INT NOT NULL AUTO_INCREMENT,
    nombre_partido VARCHAR(50) NOT NULL,
    siglas_partido VARCHAR(15) NOT NULL,
    fundacion_partido DATE,
    CONSTRAINT PK_partido PRIMARY KEY (id_partido)
);

```

- Esta tabla almacena información sobre los partidos políticos que participan en las elecciones. Los campos incluyen un identificador único ("id_partido"), el nombre del partido y sus siglas. La fecha de fundación del partido también se almacena como tipo de datos "DATE."

**Tabla CARGOS**:

```sql
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.CARGOS (
    id_cargo INT NOT NULL AUTO_INCREMENT,
    nombre_cargo VARCHAR(50) NOT NULL,
    CONSTRAINT PK_cargo PRIMARY KEY (id_cargo)
);

```

- Esta tabla almacena información sobre los cargos políticos disponibles en las elecciones. Se utiliza un campo "id_cargo" como clave primaria y un campo "nombre_cargo" para almacenar el nombre del cargo.

**Tabla CANDIDATOS**:

```sql
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.CANDIDATOS (
    id_candidato INT NOT NULL AUTO_INCREMENT,
    nombre_candidato VARCHAR(50) NOT NULL,
    fecha_nacimiento_candidato DATE,
    cargo_id INT NOT NULL,
    partido_id INT NOT NULL,
    CONSTRAINT PK_candidato PRIMARY KEY (id_candidato),
    FOREIGN KEY (cargo_id) REFERENCES CARGOS(id_cargo),
    FOREIGN KEY (partido_id) REFERENCES PARTIDOS(id_partido)
);

```

- Esta tabla almacena información sobre los candidatos a cargos políticos. Los campos incluyen un identificador único ("id_candidato"), el nombre del candidato y la fecha de nacimiento. Los campos "cargo_id" y "partido_id" se utilizan para establecer relaciones con las tablas CARGOS y PARTIDOS mediante claves foráneas.

**Tabla MESAS**:

```sql
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.MESAS (
    id_mesa INT NOT NULL AUTO_INCREMENT,
    id_departamento INT NOT NULL,
    CONSTRAINT PK_mesa PRIMARY KEY (id_mesa),
    FOREIGN KEY (id_departamento) REFERENCES DEPARTAMENTOS(id_departamento)
);

```

- Esta tabla almacena información sobre las mesas de votación. Cada mesa se identifica con un "id_mesa" único y está asociada a un departamento mediante una clave foránea ("id_departamento").

**Tabla VOTOS**:

```sql
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.VOTOS (
    id_voto INT NOT NULL AUTO_INCREMENT,
    fecha_hora_voto DATETIME NOT NULL,
    dpi_ciudadano VARCHAR(13) NOT NULL,
    id_mesa INT NOT NULL,
    CONSTRAINT PK_voto PRIMARY KEY (id_voto),
    FOREIGN KEY (dpi_ciudadano) REFERENCES CIUDADANOS(dpi_ciudadano),
    FOREIGN KEY (id_mesa) REFERENCES MESAS(id_mesa)
);

```

- Esta tabla almacena información sobre los votos emitidos en las elecciones. Cada voto se registra con un "id_voto" único, la fecha y hora en que se emitió, el DPI del ciudadano que votó y la mesa de votación en la que se emitió el voto. Las claves foráneas se utilizan para vincular los votos a los ciudadanos y las mesas correspondientes.

**Tabla DETALLE VOTOS**:

```sql
CREATE TABLE IF NOT EXISTS TSE_Elecciones_DB.DETALLE_VOTOS (
    id_detalle_voto INT NOT NULL AUTO_INCREMENT,
    id_voto INT NOT NULL,
    id_candidato INT NOT NULL,
    CONSTRAINT PK_detalle_voto PRIMARY KEY (id_detalle_voto),
    FOREIGN KEY (id_voto) REFERENCES VOTOS(id_voto),
    FOREIGN KEY (id_candidato) REFERENCES CANDIDATOS(id_candidato)
);

```

- Esta tabla almacena detalles específicos de cada voto emitido, relacionando un voto ("id_voto") con un candidato ("id_candidato"). Cada registro en esta tabla representa un voto emitido por un ciudadano a un candidato específico.

## Pruebas
## 

Para la prueba se recomienda el uso de postman

| Nombre | Ruta en la API | Descripcion |
| --- | --- | --- |
| Consulta 1 | http://localhost:5000/consulta1 | Mostrar el nombre de los candidatos a presidentes y vicepresidentes por partido (en este reporte/consulta se espera ver tres columnas: "nombre presidente", "nombre vicepresidente", "partido"). |
| Consulta 2  | http://localhost:5000/consulta1 | Mostrar el número de candidatos a diputados (esto incluye lista nacional, distrito electoral, parlamento) por cada partido. |
| Consulta 3  | http://localhost:5000/consulta3 | Mostrar el nombre de los candidatos a alcalde por partido. |
| Consulta 4  | http://localhost:5000/consulta4 | Cantidad de candidatos por partido (presidentes, vicepresidentes, diputados, alcaldes). |
| Consulta 5  | http://localhost:5000/consulta5 | Cantidad de votaciones por departamentos. |
| Consulta 6  | http://localhost:5000/consulta6 | Cantidad de votos nulos. |
| Consulta 7  | http://localhost:5000/consulta7 | Top 10 de edad de ciudadanos que realizaron su voto. |
| Consulta 8  | http://localhost:5000/consulta8 | Top 10 de candidatos más votados para presidente y vicepresidente (el voto por presidente incluye el vicepresidente). |
| Consulta 9 | http://localhost:5000/consulta9 | Top 5 de mesas más frecuentadas (mostrar no. Mesa y departamento al que pertenece). |
| Consulta 10 | http://localhost:5000/consulta10 | Mostrar el top 5 de la hora más concurrida en que los ciudadanos fueron a votar. |
| Consulta 11  | http://localhost:5000/consulta11 | Cantidad de votos por género (Masculino, Femenino). |

## Iniciar servidor con NODEJS
Debe tomar encuenta que debe tener una base de datos MySQL previamente creada y cambiar los datos en el archivo .env.

``` Bash
npm install
node index.js
```

