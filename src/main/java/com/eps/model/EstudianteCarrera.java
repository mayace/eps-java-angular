/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eps.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

/**
 *
 * @author nikola
 */
@Entity
@Table(name = "ESTUDIANTE_CARRERA")
public class EstudianteCarrera implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(generator="estudianteCarreraSeq") 
    @SequenceGenerator(name="estudianteCarreraSeq",sequenceName="ESTUDIANTE_CARRERA_SEQ", allocationSize=1)
    @Column(name = "ID_ESTUDIANTE_CARRERA")
    private Long idEstudianteCarrera;
    
    @JoinColumn(name = "FK_CARRERA", referencedColumnName = "CODIGO_CARRERA")
    @ManyToOne(fetch = FetchType.LAZY)
    private Carrera fkCarrera;
    
    @JoinColumn(name = "FK_ESTUDIANTE_CARNET", referencedColumnName = "CARNET")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference(value = "estudiante_carrera")
    private Estudiante fkEstudianteCarnet;

    public EstudianteCarrera() {
    }

    public EstudianteCarrera(Long idEstudianteCarrera) {
        this.idEstudianteCarrera = idEstudianteCarrera;
    }

    public Long getIdEstudianteCarrera() {
        return idEstudianteCarrera;
    }

    public void setIdEstudianteCarrera(Long idEstudianteCarrera) {
        this.idEstudianteCarrera = idEstudianteCarrera;
    }

    public Carrera getFkCarrera() {
        return fkCarrera;
    }

    public void setFkCarrera(Carrera fkCarrera) {
        this.fkCarrera = fkCarrera;
    }

    public Estudiante getFkEstudianteCarnet() {
        return fkEstudianteCarnet;
    }

    public void setFkEstudianteCarnet(Estudiante fkEstudianteCarnet) {
        this.fkEstudianteCarnet = fkEstudianteCarnet;
    }
}
