/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eps.model;

import com.eps.rest.View;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Size;

/**
 *
 * @author nikola
 */
@Entity
@Table(name = "INSTITUCION")
@JsonIdentityInfo(generator = ObjectIdGenerators.None.class, property = "id")
public class Institucion implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(generator="institucionSeq") 
    @SequenceGenerator(name="institucionSeq",sequenceName="INSTITUCION_SEQ", allocationSize=1)
    @Column(name = "ID_INSTITUCION")
    @JsonView(View.Search.class)
    private Long idInstitucion;
    
    @Size(max = 50)
    @Column(name = "NOMBRE")
    @JsonView(View.Search.class)
    private String nombre;
    
    @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "fkInstitucion", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "detalle_institucion")
    private List<DetalleInstitucion> detalleInstitucion;

    public Institucion() {
        detalleInstitucion = new ArrayList();
    }

    public Long getIdInstitucion() {
        return idInstitucion;
    }

    public void setIdInstitucion(Long idInstitucion) {
        this.idInstitucion = idInstitucion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<DetalleInstitucion> getDetalleInstitucion() {
        return detalleInstitucion;
    }

    public void setDetalleInstitucion(List<DetalleInstitucion> detalleInstitucion) {
        this.detalleInstitucion = detalleInstitucion;
    }
    
}
