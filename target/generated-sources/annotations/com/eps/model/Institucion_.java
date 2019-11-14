package com.eps.model;

import com.eps.model.DetalleInstitucion;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-11-14T10:27:54")
@StaticMetamodel(Institucion.class)
public class Institucion_ { 

    public static volatile SingularAttribute<Institucion, Long> idInstitucion;
    public static volatile ListAttribute<Institucion, DetalleInstitucion> detalleInstitucion;
    public static volatile SingularAttribute<Institucion, String> nombre;

}