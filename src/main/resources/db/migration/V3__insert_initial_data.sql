
INSERT INTO PRACTICAS14.ROL ( NOMBRE) VALUES('administrador');
INSERT INTO PRACTICAS14.ROL ( NOMBRE) VALUES('usuario');

INSERT INTO PRACTICAS14.USUARIO
( NOMBRE, NICK, PASS, CORREO, FK_ID_ROL)
VALUES( 'administrador', 'admin', 'i9QFmefVlp4JiYlsUmL2fCyQQwkg9rDrZxy/ZuMpVpQ=', '', 1);

INSERT INTO PRACTICAS14.USUARIO
( NOMBRE, NICK, PASS, CORREO, FK_ID_ROL)
VALUES( 'secretaria', 'secre', 'oO+6+Bfe++E6xUeoExKJng==', '', 2);
