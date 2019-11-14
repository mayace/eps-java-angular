package com.eps.model;

import com.eps.model.EstudianteCarrera;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-11-14T10:27:54")
@StaticMetamodel(Estudiante.class)
public class Estudiante_ { 

    public static volatile SingularAttribute<Estudiante, Long> carnet;
    public static volatile ListAttribute<Estudiante, EstudianteCarrera> estudianteCarreraList;
    public static volatile SingularAttribute<Estudiante, Long> cui;
    public static volatile SingularAttribute<Estudiante, String> correo;
    public static volatile SingularAttribute<Estudiante, String> telefono;
    public static volatile SingularAttribute<Estudiante, String> nombre;

}