package com.eps.model;

import com.eps.model.DetalleCarta;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-11-14T10:27:54")
@StaticMetamodel(Carta.class)
public class Carta_ { 

    public static volatile SingularAttribute<Carta, Long> idCarta;
    public static volatile ListAttribute<Carta, DetalleCarta> detalleCartaList;
    public static volatile SingularAttribute<Carta, String> destinatario;

}