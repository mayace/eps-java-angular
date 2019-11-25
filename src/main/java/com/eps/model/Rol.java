/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eps.model;

import com.eps.rest.View;
import com.fasterxml.jackson.annotation.JsonView;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Size;

/**
 *
 * @author nikola
 */

@Entity
@Table(name = "ROL")
public class Rol implements Serializable{
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(generator="rolSeq") 
    @SequenceGenerator(name="rolSeq",sequenceName="ROL_SEQ", allocationSize=1)
    @Column(name = "ID_ROL")
    @JsonView(View.Search.class)
    private Long idRol;
    
    @Size(max = 50)
    @Column(name = "NOMBRE")
    @JsonView(View.Search.class)
    private String nombre;

    public Long getIdRol() {
        return idRol;
    }

    public void setIdRol(Long idRol) {
        this.idRol = idRol;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
