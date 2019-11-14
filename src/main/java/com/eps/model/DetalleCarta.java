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
@Table(name = "DETALLE_CARTA")
public class DetalleCarta implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(generator="detalleCartaSeq")
    @SequenceGenerator(name="detalleCartaSeq",sequenceName="DETALLE_CARTA_SEQ", allocationSize=1)
    @Column(name = "ID_DETALLE_CARTA")
    private Long idDetalleCarta;
    
    @Size(max = 20)
    @Column(name = "DIRIGIGO_A")
    private String dirigidoA;
    
    @Size(max = 20)
    @Column(name = "CARGO")
    private String cargo;
    
    @JoinColumn(name = "FK_CARTA", referencedColumnName = "ID_CARTA")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference(value = "detalle_carta")
    private Carta fkCarta;

    public DetalleCarta() {
    }

    public DetalleCarta(Long idDetalleCarta) {
        this.idDetalleCarta = idDetalleCarta;
    }

    public Long getIdDetalleCarta() {
        return idDetalleCarta;
    }

    public void setIdDetalleCarta(Long idDetalleCarta) {
        this.idDetalleCarta = idDetalleCarta;
    }

    public String getDirigidoA() {
        return dirigidoA;
    }

    public void setDirigidoA(String dirigidoA) {
        this.dirigidoA = dirigidoA;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public Carta getFkCarta() {
        return fkCarta;
    }

    public void setFkCarta(Carta fkCarta) {
        this.fkCarta = fkCarta;
    }
}
