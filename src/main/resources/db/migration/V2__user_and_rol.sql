
CREATE TABLE rol(
    id_rol numeric(10) not null,
    nombre varchar2(50) not null
);
ALTER TABLE rol ADD CONSTRAINT rol_pk PRIMARY KEY (id_rol);

CREATE TABLE usuario(
    id_usuario numeric(10) not null,
    nombre varchar2(50) not null,
    nick varchar2(50) not null,
    pass varchar2(50) not null,
    correo varchar2(50),
    fk_id_rol numeric(10) not null
);
ALTER TABLE usuario ADD CONSTRAINT usuario_pk PRIMARY KEY (id_usuario);
ALTER TABLE usuario ADD CONSTRAINT usuario_rol_fk FOREIGN KEY (fk_id_rol) REFERENCES rol(id_rol);

CREATE SEQUENCE rol_seq START WITH 1 NOCACHE ORDER;
CREATE OR REPLACE TRIGGER rol_trg BEFORE
    INSERT ON rol
    FOR EACH ROW
    WHEN ( new.id_rol IS NULL )
BEGIN
    :new.id_rol := rol_seq.nextval;
END;
/

CREATE SEQUENCE usuario_seq START WITH 1 NOCACHE ORDER;
CREATE OR REPLACE TRIGGER usuario_trg BEFORE
    INSERT ON usuario
    FOR EACH ROW
    WHEN ( new.id_usuario IS NULL )
BEGIN
    :new.id_usuario := usuario_seq.nextval;
END;
/
