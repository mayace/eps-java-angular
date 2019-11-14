/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eps.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.ws.rs.DefaultValue;

/**
 *
 * @author nikola
 */
@Entity
@Table(name = "ESTUDIANTE")
public class Estudiante implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "CARNET")
    private Long carnet;
    
    @Column(name = "CUI")
    private Long cui;
    
    @Size(max = 50)
    @Column(name = "NOMBRE")
    private String nombre;
    
    @Size(max = 10)
    @Column(name = "TELEFONO")
    @DefaultValue("")
    private String telefono;
    
    @Size(max = 50)
    @Column(name = "CORREO")
    @DefaultValue("")
    private String correo;
    
    @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "fkEstudianteCarnet", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "estudiante_carrera")
    private List<EstudianteCarrera> estudianteCarreraList;
    
    public Estudiante(){
        this.estudianteCarreraList = new ArrayList();
    }

    public Long getCarnet() {
        return carnet;
    }

    public void setCarnet(Long carnet) {
        this.carnet = carnet;
    }

    public Long getCui() {
        return cui;
    }

    public void setCui(Long cui) {
        this.cui = cui;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public List<EstudianteCarrera> getEstudianteCarreraList() {
        return estudianteCarreraList;
    }

    public void setEstudianteCarreraList(List<EstudianteCarrera> estudianteCarreraList) {
        this.estudianteCarreraList = estudianteCarreraList;
    }
}
