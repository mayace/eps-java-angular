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
import javax.validation.constraints.Size;

/**
 *
 * @author nikola
 */

@Entity
@Table(name = "USUARIO")
public class Usuario implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(generator="usuarioSeq") 
    @SequenceGenerator(name="usuarioSeq",sequenceName="USUARIO_SEQ", allocationSize=1)
    @Column(name = "ID_USUARIO")
    private Long idUsuario;
    
    @Size(max = 50)
    private String nombre;
    
    @Size(max = 50)
    private String nick;
    
    @Size(max = 50)
    private String pass;
    
    @Size(max = 50)
    private String correo;
    
    @JoinColumn(name = "FK_ID_ROL", referencedColumnName = "ID_ROL")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference(value = "rol")
    private Rol fkIdRol;

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNick() {
        return nick;
    }

    public void setNick(String nick) {
        this.nick = nick;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public Rol getFkIdRol() {
        return fkIdRol;
    }

    public void setFkIdRol(Rol fkIdRol) {
        this.fkIdRol = fkIdRol;
    }
    
    
}