
CREATE TABLE estudiante(
    carnet numeric(10) not null,
    cui numeric(18),
    nombre varchar2(50),
    telefono varchar2(10),
    correo varchar2(50)
);
ALTER TABLE estudiante ADD CONSTRAINT carnet_pk PRIMARY KEY (carnet);


CREATE TABLE carrera(
    codigo_carrera numeric(3) not null,
    nombre varchar2(50)
);
ALTER TABLE carrera ADD CONSTRAINT carrera_pk PRIMARY KEY(codigo_carrera);


CREATE TABLE institucion(
    id_institucion numeric(10) not null,
    nombre varchar2(50)
);
ALTER TABLE institucion ADD CONSTRAINT institucion_pk PRIMARY KEY(id_institucion);


CREATE TABLE carta(
    id_carta numeric(10) not null,
    destinatario varchar(50)
    
);
ALTER TABLE carta ADD CONSTRAINT carta_pk PRIMARY KEY(id_carta);


CREATE TABLE detalle_institucion(
    id_detalle_institucion numeric(10) not null,
    telefono varchar2(10),
    ubicacion varchar2(50),
    fk_institucion numeric(10) not null
);
ALTER TABLE detalle_institucion ADD CONSTRAINT detalle_institucion_pk PRIMARY KEY (id_detalle_institucion);
ALTER TABLE detalle_institucion ADD CONSTRAINT institucion_fk FOREIGN KEY (fk_institucion) REFERENCES institucion(id_institucion);


CREATE TABLE detalle_carta(
    id_detalle_carta numeric(10) not null,
    dirigigo_a varchar2(20),
    cargo varchar(20),
    fk_carta numeric(10)
);
ALTER TABLE detalle_carta ADD CONSTRAINT detalle_carta_pk PRIMARY KEY(id_detalle_carta);
ALTER TABLE detalle_carta ADD CONSTRAINT carta_fk FOREIGN KEY (fk_carta) REFERENCES carta(id_carta);

CREATE TABLE estudiante_carrera(
    id_estudiante_carrera numeric(10) not null,
    fk_estudiante_carnet numeric(10),
    fk_carrera numeric(10)
);

ALTER TABLE estudiante_carrera ADD CONSTRAINT estudiante_carrera_pk PRIMARY KEY(id_estudiante_carrera);
ALTER TABLE estudiante_carrera ADD CONSTRAINT estudiante_carnet_fk FOREIGN KEY (fk_estudiante_carnet) REFERENCES estudiante(carnet);
ALTER TABLE estudiante_carrera ADD CONSTRAINT carreta_fk FOREIGN KEY (fk_carrera) REFERENCES carrera(codigo_carrera);


CREATE TABLE incorporacion(
    id_incorporacion numeric(10) not null,
    correlativo_doc numeric(10),
    fecha_incorporacion date,
    semestre varchar2(10),
    asesor varchar2(50),
    supervisor varchar2(50),
    asesor_supervisor varchar2(50),
    tiempo_eps varchar2(50),
    fecha_inicio date,
    fecha_final date,
    fecha_inicio_seguro date,
    fecha_final_seguro date,
    fk_estudiante_carnet numeric(10) not null,
    fk_institucion numeric(10) not null,
    fk_carta numeric(10) not null
);

ALTER TABLE incorporacion ADD CONSTRAINT id_incorporacion_pk PRIMARY KEY(id_incorporacion);
ALTER TABLE incorporacion ADD CONSTRAINT estudiante_fk FOREIGN KEY (fk_estudiante_carnet) REFERENCES estudiante(carnet);
ALTER TABLE incorporacion ADD CONSTRAINT institucion_incorporacion_fk FOREIGN KEY (fk_institucion) REFERENCES institucion(id_institucion);
ALTER TABLE incorporacion ADD CONSTRAINT institucion_carta_fk FOREIGN KEY (fk_carta) REFERENCES carta(id_carta);



CREATE SEQUENCE institucion_seq START WITH 1 NOCACHE ORDER;

CREATE OR REPLACE TRIGGER institucion_trg BEFORE
    INSERT ON institucion
    FOR EACH ROW
    WHEN ( new.id_institucion IS NULL )
BEGIN
    :new.id_institucion := institucion_seq.nextval;
END;
/


CREATE SEQUENCE carta_seq START WITH 1 NOCACHE ORDER;

CREATE OR REPLACE TRIGGER carta_trg BEFORE
    INSERT ON carta
    FOR EACH ROW
    WHEN ( new.id_carta IS NULL )
BEGIN
    :new.id_carta := carta_seq.nextval;
END;
/


CREATE SEQUENCE detalle_institucion_seq START WITH 1 NOCACHE ORDER;

CREATE OR REPLACE TRIGGER detalle_institucion_trg BEFORE
    INSERT ON detalle_institucion
    FOR EACH ROW
    WHEN ( new.id_detalle_institucion IS NULL )
BEGIN
    :new.id_detalle_institucion := detalle_institucion_seq.nextval;
END;
/


CREATE SEQUENCE detalle_carta_seq START WITH 1 NOCACHE ORDER;

CREATE OR REPLACE TRIGGER detalle_carta_trg BEFORE
    INSERT ON detalle_carta
    FOR EACH ROW
    WHEN ( new.id_detalle_carta IS NULL )
BEGIN
    :new.id_detalle_carta := detalle_carta_seq.nextval;
END;
/


CREATE SEQUENCE estudiante_carrera_seq START WITH 1 NOCACHE ORDER;

CREATE OR REPLACE TRIGGER estudiante_carrera_trg BEFORE
    INSERT ON estudiante_carrera
    FOR EACH ROW
    WHEN ( new.id_estudiante_carrera IS NULL )
BEGIN
    :new.id_estudiante_carrera := estudiante_carrera_seq.nextval;
END;
/


CREATE SEQUENCE incorporacion_seq START WITH 1 NOCACHE ORDER;

CREATE OR REPLACE TRIGGER incorporacion_trg BEFORE
    INSERT ON incorporacion
    FOR EACH ROW
    WHEN ( new.id_incorporacion IS NULL )
BEGIN
    :new.id_incorporacion := incorporacion_seq.nextval;
END;
/