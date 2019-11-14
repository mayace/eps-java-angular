/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eps.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Size;

/**
 *
 * @author nikola
 */
@Entity
@Table(name = "DETALLE_INSTITUCION")
@JsonIdentityInfo(generator = ObjectIdGenerators.None.class, property = "id")
public class DetalleInstitucion implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(generator="detalleInstitucionSeq") 
    @SequenceGenerator(name="detalleInstitucionSeq",sequenceName="DETALLE_INSTITUCION_SEQ", allocationSize=1)
    @Column(name = "ID_DETALLE_INSTITUCION")
    private Long idDetalleInstitucion;
    
    @Size(max = 10)
    @Column(name = "TELEFONO")
    private String telefono;
    
    @Size(max = 50)
    @Column(name = "UBICACION")
    private String ubicacion;
    
    @JoinColumn(name = "FK_INSTITUCION", referencedColumnName = "ID_INSTITUCION")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference(value = "detalle_institucion")
    private Institucion fkInstitucion;

    public Long getIdDetalleInstitucion() {
        return idDetalleInstitucion;
    }

    public void setIdDetalleInstitucion(Long idDetalleInstitucion) {
        this.idDetalleInstitucion = idDetalleInstitucion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }
    
    public Institucion getFkInstitucion() {
        return fkInstitucion;
    }

    public void setFkInstitucion(Institucion fkInstitucion) {
        this.fkInstitucion = fkInstitucion;
    }
    
}
