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
@Table(name = "CARTA")
public class Carta implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(generator="cartaSeq") 
    @SequenceGenerator(name="cartaSeq",sequenceName="CARTA_SEQ", allocationSize=1)
    @Column(name = "ID_CARTA")
    private Long idCarta;
    
    @Size(max = 50)
    @Column(name = "DESTINATARIO")
    private String destinatario;
    
    @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "fkCarta", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "detalle_carta")
    private List<DetalleCarta> detalleCartaList;
    
    /*@OneToMany(cascade = CascadeType.ALL, mappedBy = "fkCarta")
    private List<Incorporacion> incorporacionList;*/

    public Carta() {
        this.detalleCartaList = new ArrayList();
    }

    public Carta(Long idCarta) {
        this.idCarta = idCarta;
    }

    public Long getIdCarta() {
        return idCarta;
    }

    public void setIdCarta(Long idCarta) {
        this.idCarta = idCarta;
    }

    public String getDestinatario() {
        return destinatario;
    }

    public void setDestinatario(String destinatario) {
        this.destinatario = destinatario;
    }

    public List<DetalleCarta> getDetalleCartaList() {
        return detalleCartaList;
    }

    public void setDetalleCartaList(List<DetalleCarta> detalleCartaList) {
        this.detalleCartaList = detalleCartaList;
    }

    /*public List<Incorporacion> getIncorporacionList() {
        return incorporacionList;
    }

    public void setIncorporacionList(List<Incorporacion> incorporacionList) {
        this.incorporacionList = incorporacionList;
    }*/
}
